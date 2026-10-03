import { personal } from "../data/content";
import { socialLinks } from "../data/socials";
import SocialIcon from "./SocialIcon";
import { Arrow, SectionLabel } from "./ui";

export default function Connect() {
  return (
    <section className="connect-section" aria-labelledby="connect-heading">
      <div className="connect-heading">
        <div>
          <SectionLabel>Connect</SectionLabel>
          <h2 id="connect-heading">Let’s connect.</h2>
          <p>Find me here, sharing what I make and what I’m learning.</p>
        </div>
        <a
          className="button connect-whatsapp"
          href={personal.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="Say hi to Matheesha on WhatsApp (opens in a new tab)"
        >
          <SocialIcon id="whatsapp" />
          Say hi on WhatsApp
          <Arrow diagonal />
        </a>
      </div>
      <div className="social-grid">
        {socialLinks.map(({ id, name, url, icon }) => (
          <a
            className="social-card"
            data-platform={id}
            key={id}
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Matheesha on ${name} (opens in a new tab)`}
          >
            <SocialIcon id={id} icon={icon} />
            <span>{name}</span>
            <Arrow diagonal />
          </a>
        ))}
      </div>
    </section>
  );
}
