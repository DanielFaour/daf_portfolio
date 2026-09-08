import { useContext } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../App";
import { localise } from "../data/content";

export default function ProjectCard({ project, featured = false }) {
  const { language, text } = useContext(LanguageContext);

  return (
    <article className={`project-card accent-${project.accent}${featured ? " is-featured" : ""}`}>
      <Link className="project-media" to={`/project/${project.slug}`} aria-label={localise(project.title, language)}>
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" />
        ) : (
          <span className="project-placeholder" aria-hidden="true">
            <span>{project.title.no.split(" ").slice(0, 2).map((word) => word[0]).join("")}</span>
            <small>{project.year}</small>
          </span>
        )}
      </Link>
      <div className="project-card-body">
        <div className="project-meta">
          <span>{localise(project.category, language)}</span>
          <time>{project.year}</time>
        </div>
        <h3><Link to={`/project/${project.slug}`}>{localise(project.title, language)}</Link></h3>
        <p>{localise(project.summary, language)}</p>
        <Link className="text-link" to={`/project/${project.slug}`}>
          {text.project.overview}<ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
