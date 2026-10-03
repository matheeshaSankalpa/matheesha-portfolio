import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CreativeBento from "../components/CreativeBento";
import { BlogCard } from "../components/Blogs";
import {
  Arrow,
  ContactCTA,
  Illustration,
  SectionHeading,
  SectionLabel,
  ToolTags,
} from "../components/ui";
import { blogs } from "../data/portfolio";
export default function Home() {
  return (
    <main id="main-content" className="home-page" tabIndex="-1">
      <Hero />
      <div
        className="discipline-strip"
        aria-label="Digital Marketing, Graphic Design, Web Development and Data"
      >
        <div className="discipline-track">
          {[0, 1].map((copy) => (
            <div className="discipline-set" key={copy} aria-hidden={copy === 1}>
              {[
                "Digital Marketing",
                "Graphic Design",
                "Web Development",
                "Data & Technology",
              ].map((name) => (
                <span key={name}>
                  {name}
                  <b aria-hidden="true">✳</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section className="about-section section container" id="about">
        <div>
          <SectionLabel number="01">A little about me</SectionLabel>
          <div className="about-portrait">
            <Illustration
              name="matheesha-about"
              alt="An illustrated portrait of Matheesha in his blue hoodie"
            />
          </div>
        </div>
        <div className="about-copy">
          <h2>
            I work in marketing.
            <br />I design things.
            <br />I <span className="blue-text">build for the web.</span>
          </h2>
          <div className="about-bottom">
            <p>
              I’m a Marketing & Data Science student who ended up spending a lot
              of time designing, building websites and figuring out why some
              ideas work better than others.
            </p>
            <p>
              I like turning messy ideas into something people can actually see
              and use. Most days, that means moving between a campaign, a design
              file and a browser tab.
            </p>
          </div>
          <Link className="text-link" to="/timeline">
            More about my journey <Arrow />
          </Link>
        </div>
      </section>
      <CreativeBento />
      <section className="experience-section section container">
        <div className="experience-stat">
          <SectionLabel number="03">Learning by doing</SectionLabel>
          <p className="big-stat">
            01<span>+</span>
          </p>
          <h2>
            year of hands-on
            <br />
            digital marketing.
          </h2>
          <p>
            Real work, real deadlines,
            <br />
            and plenty to learn along the way.
          </p>
        </div>
        <div className="experience-detail">
          <div className="experience-brand">
            <img src="/logos/lagops.png" alt="Lagops Digital" />
            <span>SEP 2025 TO CURRENT</span>
          </div>
          <h3>
            Digital Marketing
            <br />
            Intern
          </h3>
          <h4>Lagops Digital</h4>
          <p>
            I handle Facebook page management, create customer flyers and
            support digital marketing content for different businesses.
          </p>
          <ToolTags
            items={["Page management", "Flyer design", "Digital content"]}
          />
          <Link className="text-link" to="/work#lagops">
            Take a look at the work <Arrow diagonal />
          </Link>
        </div>
      </section>
      <section className="sketchbook-section section container">
        <div className="sketchbook-art">
          <Illustration
            name="matheesha-marketing"
            alt="Matheesha planning campaign creatives at his desk"
          />
          <span className="sketchbook-sticker">
            in my
            <br />
            <i>element.</i>
          </span>
        </div>
        <div className="sketchbook-copy">
          <SectionLabel number="04">Behind the work</SectionLabel>
          <h2>
            One more idea.
            <br />
            One more <span className="blue-text">browser tab.</span>
          </h2>
          <p>
            Design gives me a way to show an idea. Marketing makes me think
            about who it’s for. The web lets me turn it into something useful.
          </p>
          <p>I like having a little of all three in my day.</p>
          <Link className="text-link" to="/skills">
            What’s in my toolkit <Arrow />
          </Link>
        </div>
      </section>
      <section className="section container latest-blogs">
        <SectionHeading
          number="05"
          label="Latest on the blog"
          title={
            <>
              Notes from
              <br />
              <span className="blue-text">a curious mind.</span>
            </>
          }
          to="/blogs"
          linkText="All the stories"
        />
        <div className="blog-grid">
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog.url} blog={blog} />
          ))}
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
