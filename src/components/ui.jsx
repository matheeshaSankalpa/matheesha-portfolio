import { Link } from "react-router-dom";
import { illustrationImages } from "virtual:portfolio-assets";
export function Arrow({ diagonal = false }) {
  return (
    <svg
      className="arrow"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M5 19 19 5M5 5h14v14" />
      ) : (
        <path d="M4 12h16m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
export function SectionLabel({ children, number }) {
  return (
    <p className="section-label">
      {number && <span>{number} /</span>}
      {children}
    </p>
  );
}
export function SectionHeading({
  label,
  title,
  description,
  to,
  linkText,
  number,
}) {
  return (
    <div className="section-heading">
      <div>
        <SectionLabel number={number}>{label}</SectionLabel>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {to && (
        <Link className="text-link" to={to}>
          {linkText}
          <Arrow />
        </Link>
      )}
    </div>
  );
}
export function PageHeading({ label, children, description }) {
  return (
    <div className="page-heading">
      <SectionLabel>{label}</SectionLabel>
      <h1>{children}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
export function BentoCard({ children, className = "", ...props }) {
  return (
    <div className={`bento-card ${className}`} {...props}>
      {children}
    </div>
  );
}
export function Illustration({ name, alt, className = "" }) {
  const path = [...illustrationImages]
    .sort((a, b) => Number(b.endsWith(".webp")) - Number(a.endsWith(".webp")))
    .find((path) => path.split("/").pop().split(".")[0] === name);
  return path ? (
    <img
      className={`illustration ${className}`}
      src={path}
      alt={alt}
      loading="lazy"
    />
  ) : (
    <div className={`art-placeholder ${className}`}>
      <span className="art-placeholder-mark">✳</span>
      <span>From the sketchbook</span>
      <small>{alt}</small>
    </div>
  );
}
export function ToolTags({ items }) {
  return (
    <div className="tool-tags">
      {items.map((item) => (
        <span key={typeof item === "string" ? item : item.name}>
          {typeof item === "string" ? item : item.name}
        </span>
      ))}
    </div>
  );
}
export function ContactCTA() {
  return (
    <section className="contact-cta container">
      <div className="cta-inner">
        <SectionLabel>Got an idea?</SectionLabel>
        <div className="cta-heading">
          <h2>
            Have something
            <br />
            in mind? <span>Let’s talk.</span>
          </h2>
          <Link className="cta-arrow" to="/contact" aria-label="Get in touch">
            <Arrow diagonal />
          </Link>
        </div>
        <div className="cta-bottom">
          <p>
            A campaign, a design, a website.
            <br />
            I’d love to hear what you’re thinking.
          </p>
          <Link className="text-link" to="/contact">
            Say hello <Arrow />
          </Link>
        </div>
        <div className="cta-character">
          <Illustration
            name="matheesha-contact"
            alt="Matheesha listening on the phone with a friendly smile"
          />
        </div>
      </div>
    </section>
  );
}
