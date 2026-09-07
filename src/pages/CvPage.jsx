import { useContext, useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, Download, ExternalLink, GraduationCap, Mail, MapPin, Phone, Wrench, X } from "lucide-react";
import { LanguageContext } from "../App";
import Reveal from "../components/Reveal";
import { cvData, localise } from "../data/content";

function Timeline({ items, language }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article className="timeline-item" key={`${item.period}-${item.place}`}>
          <time>{item.period}</time>
          <div>
            <h3>{localise(item.title, language)}</h3>
            <p className="timeline-place">{item.place}</p>
            <p>{localise(item.body, language)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function CvPage() {
  const { language, text } = useContext(LanguageContext);
  const [active, setActive] = useState("overview");
  const [preview, setPreview] = useState(false);
  const closeButton = useRef(null);
  const pdf = language === "no" ? "/res/Daniel CV - Norsk.pdf" : "/res/Daniel CV - Engelsk.pdf";

  useEffect(() => {
    if (!preview) return undefined;
    closeButton.current?.focus();
    document.body.classList.add("modal-open");
    const closeOnEscape = (event) => event.key === "Escape" && setPreview(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [preview]);

  const tabs = ["overview", "experience", "education", "tools"];

  return (
    <>
      <section className="page-hero cv-hero">
        <div className="page-width cv-hero-grid">
          <div>
            <p className="eyebrow">{text.cv.eyebrow}</p>
            <h1>{text.cv.title}</h1>
            <p>{text.cv.intro}</p>
            <div className="button-row">
              <button className="button button-primary" type="button" onClick={() => setPreview(true)}>{text.cv.preview}<ExternalLink size={17} /></button>
              <a className="button button-secondary" href={pdf} download><Download size={17} />{text.cv.download}</a>
            </div>
          </div>
          <aside className="cv-contact">
            <span className="cv-monogram">DF</span>
            <div><strong>Daniel Faour</strong><span>{text.hero.eyebrow}</span></div>
            <ul>
              <li><MapPin size={17} /><span>Oslo, Norge</span></li>
              <li><Mail size={17} /><a href={`mailto:${cvData.contact.email}`}>{cvData.contact.email}</a></li>
              <li><Phone size={17} /><a href={`tel:${cvData.contact.phone.replaceAll(" ", "")}`}>{cvData.contact.phone}</a></li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="cv-section section">
        <div className="page-width">
          <div className="cv-tabs" role="tablist" aria-label={text.cv.eyebrow}>
            {tabs.map((tab) => (
              <button key={tab} type="button" role="tab" aria-selected={active === tab} className={active === tab ? "is-active" : ""} onClick={() => setActive(tab)}>
                {text.cv.tabs[tab]}
              </button>
            ))}
          </div>

          <div className="cv-panel" role="tabpanel">
            {active === "overview" && (
              <div className="cv-overview">
                <Reveal className="cv-profile-block">
                  <p className="eyebrow">{text.cv.profile}</p>
                  <h2>{localise(cvData.profile, language)}</h2>
                </Reveal>
                <Reveal className="cv-overview-column">
                  <div className="cv-section-title"><BriefcaseBusiness size={20} /><h2>{text.cv.experience}</h2></div>
                  <Timeline items={cvData.experience.slice(0, 2)} language={language} />
                </Reveal>
                <Reveal className="cv-overview-column">
                  <div className="cv-section-title"><GraduationCap size={21} /><h2>{text.cv.education}</h2></div>
                  <Timeline items={cvData.education.slice(0, 2)} language={language} />
                </Reveal>
              </div>
            )}

            {active === "experience" && <div className="cv-detailed"><div className="cv-section-title"><BriefcaseBusiness size={21} /><h2>{text.cv.experience}</h2></div><Timeline items={cvData.experience} language={language} /></div>}
            {active === "education" && <div className="cv-detailed"><div className="cv-section-title"><GraduationCap size={22} /><h2>{text.cv.education}</h2></div><Timeline items={cvData.education} language={language} /></div>}
            {active === "tools" && (
              <div className="cv-tools">
                <div>
                  <div className="cv-section-title"><Wrench size={20} /><h2>{text.cv.tools}</h2></div>
                  <ul className="tool-cloud">{cvData.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
                </div>
                <div className="language-list">
                  {cvData.languages.map((item) => <p key={item.no}>{localise(item, language)}</p>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {preview && (
        <div className="pdf-modal" role="dialog" aria-modal="true" aria-label={text.cv.preview} onMouseDown={(event) => event.target === event.currentTarget && setPreview(false)}>
          <div className="pdf-dialog">
            <div className="pdf-toolbar">
              <strong>{text.cv.preview}</strong>
              <div>
                <a href={pdf} target="_blank" rel="noreferrer" title={text.cv.openPdf}><ExternalLink size={19} /></a>
                <a href={pdf} download title={text.cv.download}><Download size={19} /></a>
                <button ref={closeButton} type="button" onClick={() => setPreview(false)} title={text.cv.close}><X size={21} /></button>
              </div>
            </div>
            <object data={pdf} type="application/pdf">
              <p>{text.cv.pdfFallback} <a href={pdf}>{text.cv.openPdf}</a></p>
            </object>
          </div>
        </div>
      )}
    </>
  );
}
