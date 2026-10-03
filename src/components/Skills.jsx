import { skillGroups, supportingTools } from "../data/portfolio";
import { skills } from "../data/content";
import { BrowserVisual } from "./CreativeBento";
import ToolComposition from "./ToolComposition";
import {
  ContactCTA,
  Illustration,
  PageHeading,
  SectionHeading,
  ToolTags,
} from "./ui";
const config = {
  "Creative Tools": {
    id: "design",
    label: "01 / DESIGN",
    title: "A blank canvas is a good start.",
    description:
      "Flyers, social posts and visuals for businesses and university projects.",
    art: "matheesha-design",
  },
  "Web / Tech": {
    id: "development",
    label: "02 / DEVELOPMENT",
    title: "From an idea to a browser.",
    description: "Building for the web, and learning more with every project.",
    art: "matheesha-dev",
  },
  "Digital Marketing": {
    id: "marketing",
    label: "03 / MARKETING",
    title: "Thinking about the audience.",
    description:
      "The planning, content and everyday details behind a campaign.",
    art: "matheesha-marketing",
  },
  "Data & Analytics": {
    id: "data",
    label: "04 / DATA & ANALYTICS",
    title: "A closer look at the numbers.",
    description:
      "Working with spreadsheets and exploring tools for analysis and visualization.",
    art: "matheesha-data-detective",
  },
};
export default function Skills() {
  const ordered = [
    "Creative Tools",
    "Web / Tech",
    "Digital Marketing",
    "Data & Analytics",
  ].map((name) => skillGroups.find((group) => group.category === name));
  const extra = skills.filter(
    (skill) =>
      !skillGroups.some((group) =>
        group.skills.some(
          (item) =>
            item.name.replace(".js", "").replace("React.js", "React") ===
            skill.name.replace(".js", ""),
        ),
      ),
  );
  return (
    <>
      <section className="page-section container" id="skills">
        <PageHeading
          label="The toolbox"
          description="Some tools I use regularly. Others I’m still getting to know. Here’s an honest look at what’s in my toolkit."
        >
          A bit of design.
          <br />A bit of code.
          <br />
          <span className="blue-text">A lot of curiosity.</span>
        </PageHeading>
        <div className="skills-composition">
          {ordered.map((group) => {
            const area = config[group.category];
            return (
              <article
                className={`skill-area skill-${area.id}`}
                id={area.id}
                key={area.id}
              >
                <div className="skill-art">
                  <Illustration
                    name={area.art}
                    alt={
                      area.id === "data"
                        ? "Matheesha investigating a dashboard with a magnifying glass"
                        : `An illustrated Matheesha working on ${area.id}`
                    }
                  />
                  {area.id === "development" && (
                    <div className="skill-browser-badge" aria-hidden="true">
                      &lt; / &gt;
                    </div>
                  )}
                </div>
                <div className="skill-copy">
                  <p className="section-label">{area.label}</p>
                  <h2>{area.title}</h2>
                  <p>{area.description}</p>
                  <ToolComposition
                    discipline={area.id}
                    className="skill-tools"
                  />
                  <div className="skill-list">
                    {group.skills.map((skill) => (
                      <div className="skill-row" key={skill.name}>
                        <span>{skill.name}</span>
                        <span
                          className={`skill-level ${skill.level === "Good" ? "regular" : ""}`}
                        >
                          {skill.level === "Good" ? "Good" : "Learning"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <section className="section other-tools">
          <SectionHeading
            label="Also in the toolkit"
            title="The supporting cast."
            description="The other languages, libraries and tools already part of my web toolkit."
          />
          <div className="tools-layout">
            <ToolTags items={[...extra, ...supportingTools]} />
            <BrowserVisual />
          </div>
        </section>
      </section>
      <ContactCTA />
    </>
  );
}
