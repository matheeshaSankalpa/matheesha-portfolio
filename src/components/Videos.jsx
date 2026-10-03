import { useState } from "react";
import { videos } from "../data/portfolio";
import { Arrow, ContactCTA, Illustration, PageHeading } from "./ui";
function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="video-card">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={video.url + "?autoplay=1"}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            className="video-poster"
            aria-label={`Play ${video.title}`}
            onClick={() => setPlaying(true)}
          >
            <img
              src={video.poster}
              alt=""
              loading="lazy"
              width="720"
              height="1280"
            />
            <span className="video-play" aria-hidden="true">
              ▶
            </span>
          </button>
        )}
      </div>
      <div className="video-meta">
        <a
          href={video.url.replace("/embed/", "/watch?v=")}
          target="_blank"
          rel="noreferrer"
          aria-label={`Watch ${video.title} on YouTube`}
        >
          Watch on YouTube <Arrow diagonal />
        </a>
      </div>
    </article>
  );
}
export default function Videos() {
  return (
    <>
      <section className="page-section container" id="videos">
        <div className="video-hero">
          <div className="video-hero-art">
            <Illustration
              name="matheesha-video"
              alt="Matheesha filming content with a phone and editing at his laptop"
            />
          </div>
          <div className="video-hero-copy">
            <PageHeading
              label="In motion"
              description="My short videos about marketing, creativity, technology and the things I’m learning along the way."
            >
              Less scrolling.
              <br />
              <span className="blue-text">More storytelling.</span>
            </PageHeading>
            <a
              className="button button-dark youtube-link"
              href="https://www.youtube.com/@Matheesha_Sankalpa"
              target="_blank"
              rel="noreferrer"
            >
              Find me on YouTube <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video.url} video={video} />
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
