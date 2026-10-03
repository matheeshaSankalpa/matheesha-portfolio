import { Link } from "react-router-dom";
import { Arrow, BentoCard, Illustration, SectionHeading, ToolTags } from "./ui";
import ToolComposition from "./ToolComposition";
export function BrowserVisual() {
  return (
    <div className="browser-visual" aria-hidden="true">
      <div className="browser-bar">
        <i />
        <i />
        <i />
        <span>an idea, brought to life</span>
      </div>
      <div className="browser-content">
        <div className="browser-title">
          hello,
          <br />
          <span>world.</span>
        </div>
        <div className="browser-layout">
          <div />
          <div />
          <div />
        </div>
        <span className="code-tag">&lt;make something /&gt;</span>
      </div>
      <span className="cursor-shape">↖</span>
    </div>
  );
}
export default function CreativeBento() {
  return (
    <section className="section container">
      <SectionHeading
        number="02"
        label="A few things I do"
        title={
          <>
            Different interests.
            <br />
            <span className="blue-text">Same curious mind.</span>
          </>
        }
        to="/skills"
        linkText="Explore my skills"
      />
      <div className="creative-grid">
        <BentoCard className="design-bento">
          <div className="bento-topline">
            <span>01 / DESIGN</span>
            <span>✳</span>
          </div>
          <h3>
            From a blank canvas
            <br />
            to something worth seeing.
          </h3>
          <Illustration
            name="matheesha-design"
            alt="Matheesha drawing on a tablet with graphic design panels"
          />
          <div className="bento-foot">
            <ToolTags items={["Photoshop", "Illustrator", "Canva"]} />
            <Link to="/skills#design" aria-label="Explore design skills">
              <Arrow diagonal />
            </Link>
          </div>
        </BentoCard>
        <BentoCard className="web-bento">
          <div className="bento-topline">
            <span>02 / WEB DEVELOPMENT</span>
            <span>↗</span>
          </div>
          <BrowserVisual />
          <div className="bento-foot">
            <h3>Ideas you can click.</h3>
            <Link
              to="/skills#development"
              aria-label="Explore web development skills"
            >
              <Arrow diagonal />
            </Link>
          </div>
        </BentoCard>
        <BentoCard className="marketing-bento">
          <div className="bento-topline">
            <span>03 / DIGITAL MARKETING</span>
            <span>↗</span>
          </div>
          <h3>
            A good idea.
            <br />
            The right audience.
          </h3>
          <p>Campaigns, content and the creative work behind them.</p>
          <ToolComposition discipline="marketing" />
          <ToolTags items={["Meta Ads", "Content", "SEO"]} />
        </BentoCard>
        <BentoCard className="data-bento">
          <div className="bento-topline">
            <span>04 / DATA & TOOLS</span>
            <span>↗</span>
          </div>
          <h3>
            Making sense
            <br />
            of the numbers.
          </h3>
          <ToolComposition discipline="data" />
          <ToolTags items={["Excel", "Python", "Power BI"]} />
        </BentoCard>
        <BentoCard className="curiosity-bento">
          <span className="curiosity-spark" aria-hidden="true">
            ✳
          </span>
          <p>
            There’s always
            <br />
            something new
            <br />
            to <i>figure out.</i>
          </p>
          <Link to="/timeline">
            Still learning. Always.
            <Arrow diagonal />
          </Link>
        </BentoCard>
      </div>
    </section>
  );
}
