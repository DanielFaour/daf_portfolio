import { createContext, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { copy } from "./data/content";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import ProjectPage from "./pages/ProjectPage";
import CvPage from "./pages/CvPage";

export const LanguageContext = createContext(null);

function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  const [language, setLanguage] = useState(() => {
    const query = new URLSearchParams(window.location.search).get("lang");
    return query === "en" ? "en" : localStorage.getItem("portfolio-language") === "en" ? "en" : "no";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
    document.title = language === "no"
      ? "Daniel Faour | Utvikler og UX-designer"
      : "Daniel Faour | Developer and UX designer";
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, text: copy[language] }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      <ScrollManager />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
          <Route path="/cv" element={<CvPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </LanguageContext.Provider>
  );
}
