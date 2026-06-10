import { useEffect, useRef, useState } from "react";
import { LOGOS, PAGES, T } from "../site/tokens";

export const Dot = () => <span className="dot" />;

export const LabelTag = ({ children }) => <div className="label-tag"><Dot />{children}</div>;

export const Section = ({ id, style, children }) => (
  <section id={id} style={{ padding: "80px clamp(20px,5vw,72px)", maxWidth: 1120, margin: "0 auto", ...style }}>
    {children}
  </section>
);

export const Divider = () => <div className="divider" />;

export const EmbeddedHtmlFrame = ({ title, srcDoc, minHeight = 1200 }) => {
  const iframeRef = useRef(null);
  const iframeCleanupRef = useRef(() => {});

  const syncIframeHeight = () => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;

    if (!iframe || !doc) return;

    const nextHeight = Math.max(
      doc.documentElement?.scrollHeight ?? 0,
      doc.body?.scrollHeight ?? 0,
    );

    if (nextHeight > 0) {
      iframe.style.height = `${nextHeight}px`;
    }
  };

  const handleIframeLoad = () => {
    iframeCleanupRef.current();

    const iframe = iframeRef.current;
    const frameWindow = iframe?.contentWindow;
    const doc = iframe?.contentDocument;

    if (!iframe || !frameWindow || !doc) return;

    syncIframeHeight();

    let resizeObserver = null;
    if (typeof frameWindow.ResizeObserver === "function") {
      resizeObserver = new frameWindow.ResizeObserver(syncIframeHeight);
      resizeObserver.observe(doc.documentElement);
      if (doc.body) resizeObserver.observe(doc.body);
    }

    frameWindow.addEventListener("resize", syncIframeHeight);
    iframeCleanupRef.current = () => {
      resizeObserver?.disconnect();
      frameWindow.removeEventListener("resize", syncIframeHeight);
    };
  };

  useEffect(() => () => iframeCleanupRef.current(), []);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-same-origin"
      loading="eager"
      onLoad={handleIframeLoad}
      style={{ width: "100%", minHeight, border: "none", display: "block", background: T.bg }}
    />
  );
};

export const StatCard = ({ num, label, sub }) => (
  <div className="card card-sm" style={{ textAlign: "center" }}>
    <div style={{ fontFamily: "'Lora',serif", fontSize: 38, color: T.teal, lineHeight: 1, fontWeight: 500 }}>{num}</div>
    <div style={{ fontSize: 14, fontWeight: 600, color: T.navy, marginTop: 8 }}>{label}</div>
    {sub && <div style={{ fontSize: 12, color: T.textMuted, marginTop: 3 }}>{sub}</div>}
  </div>
);

export const Marquee = () => {
  const items = [...LOGOS, ...LOGOS];

  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "16px 0", background: T.surfaceAlt }}>
      <div style={{ display: "flex", gap: 56, whiteSpace: "nowrap", animation: "marquee 28s linear infinite", width: "max-content", alignItems: "center" }}>
        {items.map((label, index) => (
          <span key={index} style={{ fontSize: 11, color: T.textMuted, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600 }}>{label}</span>
        ))}
      </div>
    </div>
  );
};

export const Nav = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: T.navBg, borderBottom: `1px solid ${T.ehrBorder}`, boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.18)" : "none", transition: "box-shadow .3s" }}>
      <div className="nav-inner">
        <button onClick={() => setPage("Home")} style={{ background: "none", border: "none", fontFamily: "'Lora',serif", fontSize: 28, color: "#fff", display: "flex", alignItems: "center", gap: 3, letterSpacing: "-.01em" }}>
          Her<span style={{ color: "#F0A0C0" }}>NextBeat</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)", fontFamily: "'Inter',sans-serif", fontWeight: 600, marginLeft: 7, letterSpacing: ".12em", textTransform: "uppercase" }}>AI</span>
        </button>
        <div className="nav-links">
          <div className="nav-scroll">
            {PAGES.slice(0, -1).map((targetPage) => (
              <button
                key={targetPage}
                onClick={() => setPage(targetPage)}
                className="nav-link-btn"
                style={{
                  background: targetPage === "Demo" ? (page === "Demo" ? T.teal : `${T.teal}33`) : "none",
                  border: targetPage === "Demo" ? `1px solid ${page === targetPage ? T.teal : T.tealLight}` : "none",
                  fontSize: 12,
                  fontWeight: page === targetPage ? 600 : 400,
                  color: page === targetPage ? "#fff" : targetPage === "Demo" ? T.tealLight : "rgba(255,255,255,.6)",
                  padding: targetPage === "Demo" ? "5px 12px" : "5px 10px",
                  borderRadius: 6,
                  transition: "all .2s",
                  letterSpacing: ".01em",
                }}
              >
                {targetPage === "Demo" ? "▶ Live Demo" : targetPage}
              </button>
            ))}
            <div className="nav-divider" />
            <button className="btn-primary nav-cta" style={{ padding: "7px 18px", fontSize: 12 }} onClick={() => setPage("Contact")}>
              Request pilot →
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Footer = ({ setPage }) => (
  <footer style={{ background: T.navBg, marginTop: 0 }}>
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "52px clamp(20px,5vw,72px) 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: "'Lora',serif", fontSize: 28, color: "#fff", marginBottom: 10 }}>
            Her<span style={{ color: "#F0A0C0" }}>NextBeat</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.35)", fontFamily: "'Inter',sans-serif", fontWeight: 600, marginLeft: 7, letterSpacing: ".12em" }}>AI</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.45)", maxWidth: 240, lineHeight: 1.75 }}>
            AI-powered cardiovascular decision support for women. FHIR-native, explainable, clinician-first. B2B platform for hospitals and health systems.
          </div>
        </div>
        <div style={{ display: "flex", gap: 52, flexWrap: "wrap" }}>
          {[["Platform", ["Solution", "Demo", "Evidence"]], ["Company", ["Business", "Stress Test", "Team", "Funding"]], ["Contact", ["Contact", "hello@hernextbeat.tech", "Press kit"]]].map(([group, links]) => (
            <div key={group}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14, fontWeight: 600 }}>{group}</div>
              {links.map((link) => (
                <div key={link} style={{ marginBottom: 10 }}>
                  <span
                    onClick={() => setPage(link === "hello@hernextbeat.tech" || link === "Press kit" ? "Contact" : link)}
                    style={{ fontSize: 13, color: "rgba(255,255,255,.45)", cursor: "pointer", transition: "color .15s" }}
                    onMouseEnter={(event) => { event.target.style.color = "#fff"; }}
                    onMouseLeave={(event) => { event.target.style.color = "rgba(255,255,255,.45)"; }}
                  >
                    {link}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.25)" }}>© 2026 HerNextBeat AI SL · Madrid, Spain</span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.25)" }}>GDPR · HIPAA BAA · CE SaMD · FDA 510(k) pathway</span>
      </div>
    </div>
  </footer>
);