import { useContext, useEffect, useState } from "react";
import { ArrowUp, Languages, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LanguageContext } from "../App";

const navClass = ({ isActive }) => `nav-link${isActive ? " is-active" : ""}`;

export default function Layout({ children }) {
  const { language, setLanguage, text } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="wordmark" to="/" aria-label="Daniel Faour">
            <span>Daniel</span> Faour
          </Link>

          <nav className={`site-nav${open ? " is-open" : ""}`} aria-label="Primary navigation">
            <NavLink className={navClass} to="/" end>{text.nav.home}</NavLink>
            <NavLink className={navClass} to="/work">{text.nav.work}</NavLink>
            <NavLink className={navClass} to="/cv">{text.nav.cv}</NavLink>
            <button
              className="language-button"
              type="button"
              onClick={() => setLanguage(language === "no" ? "en" : "no")}
              aria-label={language === "no" ? "Switch to English" : "Bytt til norsk"}
            >
              <Languages size={17} aria-hidden="true" />
              <span>{language === "no" ? "EN" : "NO"}</span>
            </button>
          </nav>

          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-label={text.nav.menu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p>© {new Date().getFullYear()} {text.footer.text}</p>
          <button type="button" className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {text.footer.top}<ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  );
}
