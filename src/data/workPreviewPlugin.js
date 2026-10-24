// Keep /work sharing metadata in the HTML response, before React runs.
// The generated page uses the same app, styles and existing SEO tags as index.html.
const metadata = `    <meta property="og:title" content="Selected Work | Matheesha Sankalpa" />
    <meta property="og:description" content="Explore Matheesha Sankalpa's selected work in graphic design, social creatives and digital marketing." />
    <meta property="og:url" content="https://matheesha.dev/work" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://matheesha.dev/illustrations/matheesha-design.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1536" />
    <meta property="og:image:height" content="1024" />
    <meta property="og:image:alt" content="Matheesha Sankalpa creating graphic designs at his desk" />`;

function addMetadata(html) {
  // Keep the tags early for crawlers fetching only an initial byte range.
  return html.replace(/(<meta\s+charset=[^>]+>)/i, `$1\n${metadata}`);
}

function isWorkUrl(url = "") {
  return /^\/work\/?(?:\?|$)/.test(url);
}

export default function workPreviewPlugin() {
  return {
    name: "portfolio-work-preview",
    transformIndexHtml(html, context) {
      if (context.server && isWorkUrl(context.originalUrl || context.path))
        return addMetadata(html);
    },
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const index = bundle["index.html"];
        if (!index || index.type !== "asset")
          this.error("Missing index.html for the /work preview.");
        this.emitFile({
          type: "asset",
          fileName: "work.html",
          source: addMetadata(String(index.source)),
        });
      },
    },
    configurePreviewServer(server) {
      // Mirror Vercel's internal rewrite when validating the production build.
      server.middlewares.use((request, _response, next) => {
        if (isWorkUrl(request.url))
          request.url = request.url.replace(/^\/work\/?/, "/work.html");
        next();
      });
    },
  };
}
