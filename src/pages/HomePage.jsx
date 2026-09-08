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
  const featuredProjects = projects.slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="page-width hero-inner">
          <div className="hero-content">
            <p className="hero-greeting">{text.hero.greeting}</p>
            <h1>{text.hero.title}.</h1>
            <p className="hero-role">{text.hero.role}</p>
            <a className="button button-primary hero-contact" href="mailto:daniea1602@gmail.com">
              <Mail size={18} aria-hidden="true" />{text.hero.primary}
            </a>
            <div className="social-links" aria-label="Social links">
              <a href="https://www.linkedin.com/in/daniel-faour/" target="_blank" rel="noreferrer" title="LinkedIn"><img src="/res/linkedin.png" alt="LinkedIn" /></a>
              <a href="https://www.instagram.com/daniel_faour/" target="_blank" rel="noreferrer" title="Instagram"><img src="/res/instagram.png" alt="Instagram" /></a>
              <Link to="/cv/" title="CV"><img src="/res/resume.png" alt="CV" /></Link>
              <a href="https://github.com/DanielFaour/" target="_blank" rel="noreferrer" title="GitHub"><img src="/res/github-sign.png" alt="GitHub" /></a>
            </div>
          </div>
          <img className="hero-portrait" src="/res/defi-portis.jpg" alt="Daniel Faour" />
        </div>
      </section>

      <section className="profile-section">
        <div className="page-width profile-card">
          <Reveal className="profile-about">
            <h2>{text.home.aboutTitle}</h2>
            <div className="about-copy">
              {text.home.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </Reveal>
          <Reveal className="profile-skills">
            <h2>{text.home.skillsTitle}</h2>
            <p className="skills-intro">{text.home.skillsIntro}</p>
            <div className="skills-list">
            {skills.map((group) => {
              const Icon = skillIcons[group.icon];
              return (
                <div className="skill-group" key={group.title.no}>
                  <div className="skill-group-title"><Icon size={19} aria-hidden="true" /><h3>{group.title[language]}</h3></div>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              );
            })}
            </div>
          </Reveal>
          </div>
      </section>

      <section className="section featured-section">
        <div className="page-width">
          <Reveal className="section-heading heading-with-action">
            <div><h2>{text.home.featuredTitle}</h2></div>
            <Link className="text-link" to="/work">{text.home.allProjects}<ArrowRight size={17} aria-hidden="true" /></Link>
          </Reveal>
          <div className="featured-grid">
            {featuredProjects.map((project) => <Reveal key={project.slug}><ProjectCard project={project} featured /></Reveal>)}
          </div>
        </div>
      </section>

    </>
  );
}
