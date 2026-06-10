import { useEffect, useState } from "react";
import { Footer, Nav } from "./components/common";
import {
  BusinessPage,
  ContactPage,
  DemoPage,
  EvidencePage,
  FundingPage,
  HomePage,
  SolutionPage,
  StressTestPage,
  TeamPage,
} from "./pages";
import { GLOBAL_CSS, T } from "./site/tokens";

const PAGE_COMPONENTS = {
  Home: HomePage,
  Solution: SolutionPage,
  Demo: DemoPage,
  Business: BusinessPage,
  "Stress Test": StressTestPage,
  Evidence: EvidencePage,
  Funding: FundingPage,
  Team: TeamPage,
  Contact: ContactPage,
};

export default function App() {
  const [page, setPage] = useState("Home");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);

  useEffect(() => {
    const handleEmbeddedPrompt = (event) => {
      if (event.data?.type !== "embedded-prompt") return;
      setPage("Stress Test");
    };

    window.addEventListener("message", handleEmbeddedPrompt);
    return () => window.removeEventListener("message", handleEmbeddedPrompt);
  }, []);

  const ActivePage = PAGE_COMPONENTS[page] ?? HomePage;

  return (
    <div className="app-shell" style={{ background:T.bg, minHeight:"100vh" }}>
      <Nav page={page} setPage={setPage} />
      <main><ActivePage setPage={setPage} /></main>
      <Footer setPage={setPage} />
    </div>
  );
}
