import { academicItems, certificateItems } from "../data/portfolio";
import { certificates } from "../data/content";
import { Arrow, ContactCTA, PageHeading, SectionHeading } from "./ui";
const logos = [
  "/logos/ananda.png",
  "/logos/sitc.png",
  "/logos/cardiff.png",
  "/logos/ruhuna.png",
  "/logos/cardiff.png",
];
export default function Timeline() {
  return (
    <>
      <section className="page-section container" id="timeline">
        <PageHeading
          label="Education & learning"
          description="Business, software and data. Different subjects that keep giving me new ways to think about the same ideas."
        >
          Still learning.
          <br />
          <span className="blue-text">Connecting the dots.</span>
        </PageHeading>
        <div className="education-layout">
          <aside className="education-note">
            <span className="education-spark" aria-hidden="true">
              ✳
            </span>
            <p>
              Marketing.
              <br />
              Technology.
              <br />
              <span>
                Everything
                <br />
                in between.
              </span>
            </p>
            <small>MY ACADEMIC JOURNEY</small>
          </aside>
          <div className="education-timeline">
            {academicItems.map((item, index) => (
              <article className="education-item" key={item.subtitle}>
                <span className="timeline-dot" />
                <p className="education-period">{item.period}</p>
                <div className="education-title">
                  <img src={logos[index]} alt="" loading="lazy" />
                  <h2>{item.title}</h2>
                </div>
                <h3>{item.subtitle}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
        <section className="section credentials">
          <SectionHeading
            label="Along the way"
            title={
              <>
                Short courses.
                <br />
                New perspectives.
              </>
            }
            description="Credentials in marketing, AI, operations and development."
          />
          <div className="credential-grid">
            {certificateItems.map((item, i) => (
              <a
                className="credential-card"
                href={item.link}
                target="_blank"
                rel="noreferrer"
                key={item.link}
              >
                <div className="credential-top">
                  <span>{item.category}</span>
                  <Arrow diagonal />
                </div>
                <span className="credential-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="credential-bottom">
                  <span>{item.platform}</span>
                  <span>View credential ↗</span>
                </div>
              </a>
            ))}
          </div>
          <div className="additional-credentials">
            <h3>Development certificates</h3>
            {certificates.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                <span>{item.title}</span>
                <span>
                  {item.issuer}
                  <Arrow diagonal />
                </span>
              </a>
            ))}
          </div>
        </section>
      </section>
      <ContactCTA />
    </>
  );
}
