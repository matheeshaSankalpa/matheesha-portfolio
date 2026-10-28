import { useId, useRef, useState } from "react";
import { certificateItems } from "../data/portfolio";
import { Arrow } from "./ui";
import "../styles/certificate-carousel.css";

const completionDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function CertificateCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const carousel = useRef(null);
  const gesture = useRef(null);
  const swiped = useRef(false);
  const id = useId();
  const total = certificateItems.length;

  function select(index) {
    if (
      carousel.current.querySelector(".certificate-carousel__card:focus-within")
    )
      carousel.current.focus({ preventScroll: true });
    setActiveIndex((index + total) % total);
  }

  function handleKeyDown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const index = {
      ArrowLeft: activeIndex - 1,
      ArrowRight: activeIndex + 1,
      Home: 0,
      End: total - 1,
    }[event.key];
    if (index === undefined) return;
    event.preventDefault();
    swiped.current = false;
    select(index);
  }

  function handlePointerUp(event) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.id !== event.pointerId) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.4)
      return;
    swiped.current = true;
    select(activeIndex + (deltaX < 0 ? 1 : -1));
  }

  return (
    <div
      className="certificate-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Certificates"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={carousel}
    >
      <div
        className="certificate-carousel__stage"
        id={`${id}-slides`}
        onPointerDown={(event) => {
          swiped.current = false;
          if (!event.isPrimary || event.pointerType === "mouse") return;
          gesture.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
          };
        }}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          gesture.current = null;
        }}
        onClickCapture={(event) => {
          if (!swiped.current) return;
          event.preventDefault();
          event.stopPropagation();
          swiped.current = false;
        }}
      >
        {certificateItems.map((item, index) => {
          const offset =
            ((index - activeIndex + total + Math.floor(total / 2)) % total) -
            Math.floor(total / 2);
          const distance = Math.abs(offset);
          const active = offset === 0;

          return (
            <div
              className="certificate-carousel__card"
              key={item.link}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}: ${item.title}`}
              aria-hidden={!active}
              inert={!active}
              data-active={active}
              data-visible={distance <= 2}
              style={{ "--offset": offset, "--distance": distance }}
            >
              <div className="certificate-carousel__image">
                {distance <= 2 && (
                  <img
                    src={item.image}
                    alt={`${item.title} certificate awarded to Matheesha Sankalpa by ${item.platform}`}
                    width="1772"
                    height="928"
                    loading={active ? "eager" : "lazy"}
                    decoding="async"
                    draggable="false"
                  />
                )}
              </div>
              <div className="certificate-carousel__details">
                <p className="certificate-carousel__category">
                  {item.category}
                </p>
                <h3>{item.title}</h3>
                <div className="certificate-carousel__issuer">
                  <span className="certificate-carousel__logo">
                    <img
                      src={item.logo}
                      alt={`${item.platform} logo`}
                      width="32"
                      height="32"
                      loading="lazy"
                    />
                  </span>
                  <div>
                    <p>{item.platform}</p>
                    {item.completedOn && (
                      <p className="certificate-carousel__date">
                        Completed{" "}
                        <time dateTime={item.completedOn}>
                          {completionDate.format(new Date(item.completedOn))}
                        </time>
                      </p>
                    )}
                  </div>
                </div>
                <p className="certificate-carousel__description">
                  {item.description}
                </p>
                <ul
                  className="certificate-carousel__skills"
                  aria-label="Learning areas"
                >
                  {item.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
                <a
                  className="certificate-carousel__link"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View Certificate: ${item.title} (opens in a new tab)`}
                >
                  View Certificate <Arrow diagonal />
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className="certificate-carousel__controls">
        <button
          className="certificate-carousel__nav certificate-carousel__nav--previous"
          type="button"
          aria-label="Previous certificate"
          aria-controls={`${id}-slides`}
          onClick={() => select(activeIndex - 1)}
        >
          <Arrow />
        </button>
        <p className="certificate-carousel__position" aria-hidden="true">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <span>/</span>
          {String(total).padStart(2, "0")}
        </p>
        <button
          className="certificate-carousel__nav certificate-carousel__nav--next"
          type="button"
          aria-label="Next certificate"
          aria-controls={`${id}-slides`}
          onClick={() => select(activeIndex + 1)}
        >
          <Arrow />
        </button>
      </div>
      <div
        className="certificate-carousel__pagination"
        role="group"
        aria-label="Choose a certificate"
      >
        {certificateItems.map((item, index) => (
          <button
            type="button"
            key={item.link}
            aria-label={`Show certificate ${index + 1}: ${item.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            aria-controls={`${id}-slides`}
            onClick={() => select(index)}
          >
            <span />
          </button>
        ))}
      </div>
      <p
        className="certificate-carousel__sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Certificate {activeIndex + 1} of {total}:{" "}
        {certificateItems[activeIndex].title}
      </p>
    </div>
  );
}
