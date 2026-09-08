import { useContext } from "react";
import { ArrowRight, Code2, Cpu, Mail, PenTool, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../App";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import { projects, skills } from "../data/content";

const skillIcons = { code: Code2, pen: PenTool, cpu: Cpu, users: Users };

export default function HomePage() {
  const { language, text } = useContext(LanguageContext);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-shape" aria-hidden="true" />
        <img className="hero-portrait" src="/res/portrait_me.png" alt="Daniel Faour" />
        <div className="page-width hero-content">
          <p className="eyebrow hero-eyebrow"><span className="status-dot" />{text.hero.availability}</p>
          <p className="hero-role">{text.hero.eyebrow}</p>
          <h1>{text.hero.title}</h1>
          <p className="hero-intro">{text.hero.intro}</p>
          <div className="button-row">
            <Link className="button button-primary" to="/work">
              {text.hero.primary}<ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="button button-secondary" to="/cv">{text.hero.secondary}</Link>
          </div>
        </div>
        <div className="hero-index page-width" aria-hidden="true">
          <span>01</span><span>Design</span><span>Development</span><span>Research</span>
        </div>
      </section>

      <section className="section about-section">
        <div className="page-width">
          <Reveal className="section-heading narrow-heading">
            <p className="eyebrow">{text.home.aboutLabel}</p>
            <h2>{text.home.aboutTitle}</h2>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-copy">
              {text.home.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </Reveal>
            <div className="principle-list">
              {text.home.principles.map(([title, body], index) => (
                <Reveal className="principle" key={title}>
                  <span>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section skills-section">
        <div className="page-width">
          <Reveal className="skills-heading">
            <div>
              <p className="eyebrow">{text.home.skillsLabel}</p>
              <h2>{text.home.skillsTitle}</h2>
            </div>
            <p>{text.home.skillsIntro}</p>
          </Reveal>
          <div className="skills-grid">
            {skills.map((group) => {
              const Icon = skillIcons[group.icon];
              return (
                <Reveal className="skill-group" key={group.title.no}>
                  <div className="skill-group-title"><Icon size={19} aria-hidden="true" /><h3>{group.title[language]}</h3></div>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="page-width">
          <Reveal className="section-heading heading-with-action">
            <div><p className="eyebrow">{text.home.featuredLabel}</p><h2>{text.home.featuredTitle}</h2></div>
            <Link className="text-link" to="/work">{text.home.allProjects}<ArrowRight size={17} aria-hidden="true" /></Link>
          </Reveal>
          <div className="featured-grid">
            {featuredProjects.map((project) => <Reveal key={project.slug}><ProjectCard project={project} featured /></Reveal>)}
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="page-width contact-inner">
          <Reveal>
            <p className="eyebrow">{text.home.contactLabel}</p>
            <h2>{text.home.contactTitle}</h2>
            <p>{text.home.contactText}</p>
          </Reveal>
          <a className="button button-light" href="mailto:daniea1602@gmail.com">
            <Mail size={18} aria-hidden="true" />daniea1602@gmail.com
          </a>
        </div>
      </section>
    </>
  );
}
