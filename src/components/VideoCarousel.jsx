import { Children, useRef, useState } from "react";
import { Arrow } from "./ui";
import "../styles/video-carousel.css";

// Presentation only: the original video elements remain mounted and unchanged.
export default function VideoCarousel({ children }) {
  const cards = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const active = Math.min(index, cards.length - 1);

  function goTo(next) {
    setIndex(Math.max(0, Math.min(cards.length - 1, next)));
  }

  function startDrag(event) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    if (cards.length < 2) return;
    // Leave the native player's timeline, volume and fullscreen controls alone.
    const player = event.target.closest("video");
    if (player && event.clientY > player.getBoundingClientRect().bottom - 64)
      return;
    gesture.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      dragging: false,
    };
  }

  function moveDrag(event) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.dragging) {
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
        gesture.current = null;
        return;
      }
      if (Math.abs(dx) < 12 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      start.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      suppressClick.current = true;
    }
    event.preventDefault();
    const atEdge =
      (active === 0 && dx > 0) || (active === cards.length - 1 && dx < 0);
    setDragX(Math.max(-100, Math.min(100, dx * (atEdge ? 0.15 : 0.65))));
  }

  function endDrag(event) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    gesture.current = null;
    setDragX(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    const dx = event.clientX - start.x;
    if (event.type === "pointerup" && start.dragging && Math.abs(dx) >= 42)
      goTo(active + (dx < 0 ? 1 : -1));
  }

  return (
    <div
      className="work-video-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Video showcase"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target.closest("video")) return;
        const next = {
          ArrowLeft: active - 1,
          ArrowRight: active + 1,
          Home: 0,
          End: cards.length - 1,
        }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        goTo(next);
      }}
    >
      <div className="work-video-viewport">
        <div
          className={`work-video-stage${dragX ? " is-dragging" : ""}`}
          style={{ "--drag-shift": `${dragX}px` }}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={(event) => {
            // Touch starts with implicit capture on the video. Its release
            // bubbles here when the stage takes over a horizontal gesture.
            if (event.target === event.currentTarget) endDrag(event);
          }}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            if (suppressClick.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClick.current = false;
            }
          }}
        >
          {cards.map((card, i) => {
            const offset = i - active;
            const distance = Math.abs(offset);
            const hidden = distance > 2;
            return (
              <div
                className="work-video-slide"
                key={card.key}
                role="group"
                aria-roledescription="slide"
                aria-label={`Video ${i + 1} of ${cards.length}`}
                aria-hidden={hidden || undefined}
                inert={hidden}
                data-active={offset === 0}
                data-hidden={hidden}
                style={{
                  "--offset": Math.max(-3, Math.min(3, offset)),
                  "--distance": Math.min(3, distance),
                  "--turn": `${-Math.sign(offset) * Math.min(50, distance * 34)}deg`,
                  "--scale": 1 - Math.min(3, distance) * 0.09,
                  zIndex: cards.length - distance,
                }}
              >
                <div className="work-video-content" inert={offset !== 0}>
                  {card}
                </div>
                {offset !== 0 && (
                  <button
                    type="button"
                    className="work-video-select"
                    aria-label={`Focus video ${i + 1}`}
                    onClick={(event) => {
                      goTo(i);
                      if (event.detail === 0)
                        event.currentTarget
                          .closest(".work-video-carousel")
                          .focus({ preventScroll: true });
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="work-video-navigation" aria-label="Video navigation">
        <button
          type="button"
          className="work-video-previous"
          aria-label="Previous video"
          disabled={active === 0}
          onClick={() => goTo(active - 1)}
        >
          <Arrow />
        </button>
        <div
          className="work-video-position"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span>{String(active + 1).padStart(2, "0")}</span>
          <span className="work-video-progress" aria-hidden="true">
            <span
              style={{ width: `${((active + 1) / cards.length) * 100}%` }}
            />
          </span>
          <span className="work-video-total">
            <span className="work-video-sr-only">of </span>
            {String(cards.length).padStart(2, "0")}
          </span>
        </div>
        <button
          type="button"
          aria-label="Next video"
          disabled={active === cards.length - 1}
          onClick={() => goTo(active + 1)}
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
}
