import { useState } from "react";
import { blogs } from "../data/portfolio";
import { personal } from "../data/content";
import { Arrow, ContactCTA, PageHeading } from "./ui";
export function BlogCard({ blog }) {
  return (
    <article className="blog-card">
      <a href={blog.url} target="_blank" rel="noreferrer">
        <div className="blog-image">
          <img src={blog.image} alt="" loading="lazy" />
          <span className="blog-read">
            <Arrow diagonal />
          </span>
        </div>
        <div className="blog-content">
          <span className="blog-category">
            {blog.category} <span>↗ MEDIUM</span>
          </span>
          <h3>{blog.title}</h3>
          <p>{blog.subtitle}</p>
          <span className="text-link">
            Read the story <Arrow />
          </span>
        </div>
      </a>
    </article>
  );
}
export default function Blogs() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? blogs : blogs.filter((blog) => blog.category === active);
  return (
    <>
      <section className="page-section container" id="blogs">
        <PageHeading
          label="The reading corner"
          description="Things I’ve been thinking about, reading about and learning. Written in English and Sinhala, over on Medium."
        >
          A few thoughts.
          <br />
          <span className="blue-text">Put into words.</span>
        </PageHeading>
        <div className="blog-toolbar">
          <div className="filter-row" aria-label="Filter articles">
            {["All", "Marketing", "Books", "Coding"].map((category) => (
              <button
                key={category}
                className={active === category ? "active" : ""}
                onClick={() => setActive(category)}
                aria-pressed={active === category}
              >
                {category}
              </button>
            ))}
          </div>
          <a
            className="text-link"
            href={personal.medium}
            target="_blank"
            rel="noreferrer"
          >
            My Medium profile <Arrow diagonal />
          </a>
        </div>
        <div className="blog-grid">
          {filtered.map((blog) => (
            <BlogCard key={blog.url} blog={blog} />
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
