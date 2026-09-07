import { useContext, useDeferredValue, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { LanguageContext } from "../App";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import { localise, projects } from "../data/content";

export default function WorkPage() {
  const { language, text } = useContext(LanguageContext);
  const [year, setYear] = useState("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const years = [...new Set(projects.map((project) => project.year))];

  const filtered = useMemo(() => {
    const needle = deferredQuery.trim().toLocaleLowerCase(language === "no" ? "nb-NO" : "en");
    return projects.filter((project) => {
      if (year !== "all" && project.year !== Number(year)) return false;
      if (!needle) return true;
      const haystack = [
        localise(project.title, language),
        localise(project.category, language),
        localise(project.summary, language),
        ...project.stack
      ].join(" ").toLocaleLowerCase(language === "no" ? "nb-NO" : "en");
      return haystack.includes(needle);
    });
  }, [deferredQuery, language, year]);

  const reset = () => { setYear("all"); setQuery(""); };

  return (
    <>
      <section className="page-hero work-hero">
        <div className="page-width">
          <p className="eyebrow">{text.work.eyebrow}</p>
          <h1>{text.work.title}</h1>
          <p>{text.work.intro}</p>
        </div>
      </section>

      <section className="work-section section">
        <div className="page-width">
          <div className="filter-bar">
            <div className="filter-search">
              <Search size={18} aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.work.search} aria-label={text.work.search} />
              {query && <button type="button" onClick={() => setQuery("")} aria-label={text.work.clear}><X size={17} /></button>}
            </div>
            <div className="filter-compact">
              <label className="year-select">
                <SlidersHorizontal size={17} aria-hidden="true" />
                <select value={year} onChange={(event) => setYear(event.target.value)} aria-label={text.work.allYears}>
                  <option value="all">{text.work.allYears}</option>
                  {years.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <span className="result-count"><strong>{filtered.length}</strong> {filtered.length === 1 ? text.work.countOne : text.work.countMany}</span>
            </div>
          </div>

          {filtered.length ? (
            <div className="project-grid">
              {filtered.map((project) => <Reveal key={project.slug}><ProjectCard project={project} /></Reveal>)}
            </div>
          ) : (
            <div className="empty-state">
              <p>{text.work.noResults}</p>
              <button className="button button-secondary" type="button" onClick={reset}>{text.work.clear}</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
