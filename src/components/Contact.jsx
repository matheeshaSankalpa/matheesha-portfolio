import { useState } from "react";
import { personal } from "../data/content";
import { Arrow, PageHeading, SectionLabel } from "./ui";
export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  return (
    <section className="page-section container contact-page" id="contact">
      <PageHeading
        label="Say hello"
        description="A project, a collaboration or just a good conversation. Tell me what you have in mind."
      >
        Let’s make
        <br />
        <span className="blue-text">something happen.</span>
      </PageHeading>
      <div className="contact-layout">
        <div className="contact-info">
          <a className="contact-email" href={`mailto:${personal.email}`}>
            <SectionLabel>Email me</SectionLabel>
            <span>{personal.email}</span>
            <Arrow diagonal />
          </a>
          <a
            className="contact-whatsapp"
            href={personal.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <SectionLabel>A quick conversation</SectionLabel>
            <h2>
              Say hi on
              <br />
              WhatsApp.
            </h2>
            <div>
              <span>{personal.phone}</span>
              <Arrow diagonal />
            </div>
            <span className="whatsapp-spark" aria-hidden="true">
              ✳
            </span>
          </a>
          <div className="contact-socials">
            {[
              ["LinkedIn", personal.linkedin],
              ["GitHub", personal.github],
              ["Medium", personal.medium],
              ["HackerRank", personal.hackerrank],
            ].map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noreferrer">
                {name}
                <Arrow diagonal />
              </a>
            ))}
          </div>
        </div>
        <form
          className="contact-form"
          action={`https://formsubmit.co/${personal.email}`}
          method="POST"
          onSubmit={() => setSubmitting(true)}
        >
          <SectionLabel>Or leave a note</SectionLabel>
          <h2>What are you thinking?</h2>
          <input
            type="hidden"
            name="_subject"
            value="New message from portfolio website"
          />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <div className="form-row">
            <label>
              Your name
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                placeholder="Your name"
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label>
            What’s it about?
            <input
              type="text"
              name="subject"
              required
              placeholder="A project, collaboration or opportunity"
            />
          </label>
          <label>
            Your message
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Tell me a little about it..."
            />
          </label>
          <button
            className="button button-dark"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send message"}
            <Arrow diagonal />
          </button>
          <p className="form-note" role="status">
            {submitting
              ? "Opening the message service..."
              : "Your message goes straight to my inbox."}
          </p>
        </form>
      </div>
    </section>
  );
}
