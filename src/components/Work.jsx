import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { workProjects, workCategories } from "../data/work";
import { Arrow, ContactCTA, PageHeading, SectionLabel, ToolTags } from "./ui";
function imagesFor(folder) {
  return (
    workProjects.find((project) => project.folder === folder)?.images || []
  );
}
export function ProjectCard({ item, index = 0 }) {
  const images = imagesFor(item.folder);
  return (
    <Link
      className={`project-card project-${item.folder}`}
      to={`/work#${item.folder}`}
    >
      <div className="project-preview">
        <img
          className="preview-primary"
          src={images[0]}
          alt={`Design work for ${item.title}`}
          loading="lazy"
        />
        <img
          className="preview-secondary"
          src={images[1]}
          alt=""
          loading="lazy"
        />
        <span className="project-open">
          <Arrow diagonal />
        </span>
        <span className="project-number">0{index + 1}</span>
      </div>
      <div className="project-meta">
        <div>
          <span>{item.category}</span>
          <h3>{item.title}</h3>
        </div>
        <p>{item.role}</p>
      </div>
    </Link>
  );
}
function GalleryDialog({ selection, close }) {
  const dialog = useRef(null);
  useEffect(() => {
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="gallery-dialog"
      aria-label={selection.alt}
      onCancel={close}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <button
        className="dialog-close"
        onClick={close}
        aria-label="Close image preview"
      >
        ×
      </button>
      <img src={selection.src} alt={selection.alt} />
      <p>{selection.alt}</p>
    </dialog>
  );
}
export default function Work() {
  const [filter, setFilter] = useState("All");
  const [selection, setSelection] = useState(null);
  const [lagopsMedia, setLagopsMedia] = useState("flyers");
  const { hash } = useLocation();
  const navigate = useNavigate();
  const activeFilter = workProjects.some((item) => hash === "#" + item.folder)
    ? "All"
    : filter;
  const opener = useRef(null);
  const filtered = workProjects.filter(
    (item) => activeFilter === "All" || item.category === activeFilter,
  );
  function changeFilter(category) {
    setFilter(category);
    if (hash) navigate("/work", { replace: true });
  }
  function close() {
    setSelection(null);
    requestAnimationFrame(() => opener.current?.focus());
  }
  return (
    <>
      <section className="page-section container" id="work">
        <PageHeading
          label="Selected work"
          description="Social creatives, campus projects and the day-to-day work of digital marketing. Here’s a look at what I’ve been making."
        >
          A little strategy.
          <br />A lot of <span className="blue-text">making.</span>
        </PageHeading>
        <div className="filter-row" aria-label="Filter work">
          {workCategories.map((category) => (
            <button
              key={category}
              className={activeFilter === category ? "active" : ""}
              onClick={() => changeFilter(category)}
              aria-pressed={activeFilter === category}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="work-collections">
          {filtered.map((item, index) => (
            <article
              className={`work-collection collection-${item.folder}`}
              id={item.folder}
              key={item.folder}
            >
              <div className="work-collection-header">
                <div>
                  <SectionLabel number={String(index + 1).padStart(2, "0")}>
                    {item.category}
                  </SectionLabel>
                  <div className="work-brand">
                    <img src={item.logo} alt={`${item.title} logo`} />
                    <h2>{item.title}</h2>
                  </div>
                  <p className="work-role">{item.role}</p>
                  <p className="muted">{item.period}</p>
                  <ToolTags items={item.tags} />
                </div>
                <p className="work-description">{item.description}</p>
                {item.folder === "lagops" && (
                  <button
                    type="button"
                    className="work-media-toggle"
                    aria-controls="lagops-gallery"
                    aria-label={`Show Lagops Digital ${lagopsMedia === "flyers" ? "videos" : "flyers"}`}
                    onClick={() =>
                      setLagopsMedia((media) =>
                        media === "flyers" ? "videos" : "flyers",
                      )
                    }
                  >
                    {lagopsMedia === "flyers" ? "Video" : "Flyers"}
                    <Arrow />
                  </button>
                )}
              </div>
              {item.folder === "lagops" && lagopsMedia === "videos" ? (
                <div
                  id="lagops-gallery"
                  className="work-video-gallery"
                  aria-label="Lagops Digital videos"
                >
                  {item.videos.length ? (
                    item.videos.map((src, i) => (
                      <figure className="work-video-tile" key={src}>
                        <video
                          src={src}
                          controls
                          playsInline
                          preload="metadata"
                          aria-label={`${item.title}, video ${i + 1}`}
                          onLoadedMetadata={(event) => {
                            const video = event.currentTarget;
                            if (video.videoWidth && video.videoHeight) {
                              video.parentElement.style.setProperty(
                                "--video-aspect",
                                video.videoWidth / video.videoHeight,
                              );
                            }
                          }}
                          onPlay={(event) => {
                            event.currentTarget
                              .closest(".work-video-gallery")
                              .querySelectorAll("video")
                              .forEach((video) => {
                                if (video !== event.currentTarget)
                                  video.pause();
                              });
                          }}
                        >
                          Your browser does not support video playback.
                          <a href={src}>Download video {i + 1}</a>
                        </video>
                        <figcaption>
                          Video {String(i + 1).padStart(2, "0")}
                        </figcaption>
                      </figure>
                    ))
                  ) : (
                    <p className="muted">Videos coming soon.</p>
                  )}
                </div>
              ) : (
                <div
                  id={item.folder === "lagops" ? "lagops-gallery" : undefined}
                  className="work-gallery"
                  style={{
                    "--gallery-columns": Math.max(
                      1,
                      Math.min(5, item.images.length),
                    ),
                  }}
                >
                  {item.images.map((src, i) => (
                    <button
                      key={src}
                      className="gallery-tile"
                      onClick={(event) => {
                        opener.current = event.currentTarget;
                        setSelection({
                          src,
                          alt: `${item.title}, design ${i + 1}`,
                        });
                      }}
                      aria-label={`Enlarge ${item.title} design ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${item.title}, design ${i + 1}`}
                        loading="lazy"
                      />
                      <span>
                        <Arrow diagonal />
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
      <ContactCTA />
      {selection && <GalleryDialog selection={selection} close={close} />}
    </>
  );
}
