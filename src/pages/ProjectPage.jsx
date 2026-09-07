import { useContext } from "react";
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { LanguageContext } from "../App";
import Reveal from "../components/Reveal";
import { localise, projects } from "../data/content";

export default function ProjectPage() {
  const { slug } = useParams();
  const { language, text } = useContext(LanguageContext);
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];

  if (!project) {
    return <section className="page-hero"><div className="page-width"><h1>{text.project.missing}</h1><Link className="text-link" to="/work"><ArrowLeft size={17} />{text.project.back}</Link></div></section>;
  }

  const nextProject = projects[(index + 1) % projects.length];

  return (
    <article className="case-page">
      <header className={`case-hero accent-${project.accent}`}>
        <div className="page-width">
          <Link className="back-link" to="/work"><ArrowLeft size={17} aria-hidden="true" />{text.project.back}</Link>
          <div className="case-heading">
            <div>
              <p className="eyebrow">{localise(project.category, language)} · {project.year}</p>
              <h1>{localise(project.title, language)}</h1>
              <p>{localise(project.summary, language)}</p>
            </div>
            <div className="case-actions">
              {project.links.live && <a className="button button-primary" href={project.links.live} target="_blank" rel="noreferrer">{text.project.visit}<ExternalLink size={17} /></a>}
              {project.links.source && <a className="button button-secondary" href={project.links.source} target="_blank" rel="noreferrer"><Code2 size={17} />{text.project.source}</a>}
            </div>
          </div>
        </div>
      </header>

      <div className="page-width case-body">
        <Reveal className="case-visual">
          {project.image ? <img src={project.image} alt={`${localise(project.title, language)} project`} /> : <div className={`case-placeholder accent-${project.accent}`}><span>{project.title.no.split(" ").slice(0, 2).map((word) => word[0]).join("")}</span><small>{project.year}</small></div>}
        </Reveal>

        <div className="case-layout">
          <aside className="case-facts">
            <div><span>{text.project.role}</span><p>{localise(project.role, language)}</p></div>
            <div><span>{text.project.type}</span><p>{localise(project.type, language)}</p></div>
            <div><span>{text.project.stack}</span><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </aside>
          <div className="case-story">
            <Reveal><section><span>01</span><h2>{text.project.challenge}</h2><p>{localise(project.challenge, language)}</p></section></Reveal>
            <Reveal><section><span>02</span><h2>{text.project.process}</h2><p>{localise(project.process, language)}</p></section></Reveal>
            <Reveal><section><span>03</span><h2>{text.project.result}</h2><p>{localise(project.result, language)}</p></section></Reveal>
          </div>
        </div>
      </div>

      <Link className="next-project" to={`/project/${nextProject.slug}`}>
        <span>{text.project.next}</span>
        <strong>{localise(nextProject.title, language)}</strong>
        <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  );
}
