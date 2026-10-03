import { Link } from "react-router-dom";
import { Arrow } from "./ui";
import { personal } from "../data/content";
export default function Hero() {
  return (
    <section className="hero container" id="home">
      <div className="hero-copy">
        <p className="hero-eyebrow">
          <span className="small-spark">✳</span> HELLO, I’M MATHEESHA
        </p>
        <h1>
          Marketing &<br />
          Data Science
          <br />
          student who <br />
          <span className="hero-blue">designs</span> and <br />
          <span className="build-word">builds</span> things
          <span className="blue-dot">.</span>
        </h1>
        <p className="hero-description">
          I work across digital marketing, design and web, turning ideas into
          campaigns, visuals and useful digital experiences.
        </p>
        <div className="hero-buttons">
          <Link to="/work" className="button button-dark">
            View my work <Arrow diagonal />
          </Link>
          <a href="#about" className="button button-plain">
            A little about me <Arrow />
          </a>
        </div>
      </div>
      <div className="hero-art">
        <div className="portrait-panel">
          <span className="portrait-outline" aria-hidden="true" />
          <span className="portrait-word" aria-hidden="true">
            a little
            <br />
            <i>curious.</i>
          </span>
          <div className="profile-images">
            <img
              className="profile-light"
              src="/profile2.png"
              alt={`${personal.name} wearing a blue hoodie`}
              fetchPriority="high"
            />
            <img
              className="profile-dark"
              src="/profile.png"
              alt={`${personal.name} wearing a black hoodie`}
              fetchPriority="high"
            />
          </div>
          <div className="portrait-caption">
            <span>MATHEESHA SANKALPA</span>
            <span>MARKETING + DESIGN + WEB</span>
          </div>
        </div>
        <div className="floating-label designer-label">
          <span className="label-icon">✳</span>
          <div>
            Always making<small>something new</small>
          </div>
        </div>
        <div className="floating-label experience-label">
          <b>
            01<span>+</span>
          </b>
          <div>
            YEAR OF HANDS-ON<small>digital marketing</small>
          </div>
        </div>
        <span className="hero-star" aria-hidden="true">
          ✳
        </span>
        <div className="hero-note">
          <span className="note-line" aria-hidden="true" />A few interests.
          <br />
          One curious mind.
        </div>
      </div>
      <div className="hero-bottom">
        <span>CREATIVE WORK. PRACTICAL THINKING.</span>
        <a href="#about">
          Keep exploring <span>↓</span>
        </a>
      </div>
    </section>
  );
}
