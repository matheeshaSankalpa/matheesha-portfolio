import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";

const commit = execFileSync("git", ["rev-parse", "HEAD"], {
  encoding: "utf8",
}).trim();
const domain = process.env.QA_URL || "https://matheesha.dev";
const repo =
  "https://api.github.com/repos/matheeshaSankalpa/matheesha-portfolio";
async function get(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "portfolio-deployment-qa",
      "Cache-Control": "no-cache",
    },
    signal: AbortSignal.timeout(20000),
  });
  const type = response.headers.get("content-type");
  return {
    status: response.status,
    type,
    body: type?.includes("application/json")
      ? await response.json()
      : await response.text(),
  };
}
const [build, status, checks, deployments, analytics, home] = await Promise.all(
  [
    get(`${domain}/build-info.json?verify=${commit}`),
    get(`${repo}/commits/${commit}/status`),
    get(`${repo}/commits/${commit}/check-runs`),
    get(`${repo}/deployments?sha=${commit}&per_page=5`),
    get(`${domain}/_vercel/insights/script.js`),
    get(domain),
  ],
);
const liveCommit = build.type?.includes("application/json")
  ? build.body.commit
  : null;
const report = {
  checkedAt: new Date().toISOString(),
  commit,
  domain,
  liveCommit,
  synchronized: liveCommit === commit,
  buildInfo: { status: build.status, type: build.type },
  homeBundle:
    typeof home.body === "string"
      ? home.body.match(/src="([^"]+\.js)"/)?.[1]
      : null,
  analytics: {
    status: analytics.status,
    type: analytics.type,
    servesJavaScript:
      analytics.status === 200 && /javascript/.test(analytics.type),
  },
  githubStatus: status.body.state,
  statuses: status.body.statuses?.map(({ state, description, target_url }) => ({
    state,
    description,
    url: target_url,
  })),
  checks: checks.body.check_runs?.map(
    ({ name, status, conclusion, html_url }) => ({
      name,
      status,
      conclusion,
      url: html_url,
    }),
  ),
  deployments: await Promise.all(
    (Array.isArray(deployments.body) ? deployments.body : []).map(
      async (deployment) => ({
        sha: deployment.sha,
        environment: deployment.environment,
        statuses: (await get(deployment.statuses_url)).body.map(
          ({ state, description, environment_url }) => ({
            state,
            description,
            url: environment_url,
          }),
        ),
      }),
    ),
  ),
};
await writeFile(
  "qa/deployment-verification.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (!report.synchronized || !report.analytics.servesJavaScript)
  process.exitCode = 1;
