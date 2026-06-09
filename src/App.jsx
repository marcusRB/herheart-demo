import { useState, useEffect, useRef } from "react";
import herheartEhrFullDemoHtml from "./herheart_ehr_full_demo.html?raw";

// ─── Design tokens — Healthcare B2B palette ───────────────────────────────────
// Navy authority + clinical teal + rose/mauve for women's health
// Neutral warm-white surfaces. NOT consumer. NOT dark-mode startup.
const T = {
  // Backgrounds — clean clinical whites and near-whites
  bg:        "#F7F8FA",      // page background — cool off-white
  surface:   "#FFFFFF",      // card surfaces
  surfaceAlt:"#EEF2F7",      // alternate panels, sidebars
  navBg:     "#0D1F3C",      // deep navy — authority, institutional trust

  // Primary — deep clinical navy
  navy:      "#0D1F3C",
  navyMid:   "#1A3560",
  navyLight: "#2B5192",

  // Accent — clinical teal (cardiovascular monitoring, clean, medical)
  teal:      "#0E7C86",
  tealLight: "#1BA3B0",
  tealFaint: "#E0F4F6",

  // Women's health rose — warm but clinical, not consumer pink
  rose:      "#B5446E",
  roseMid:   "#C9567F",
  roseFaint: "#FAEEF3",

  // Amber — intermediate risk, warning
  amber:     "#B06E00",
  amberFaint:"#FFF4E0",

  // Status
  danger:    "#C0392B",
  dangerFaint:"#FDEDEC",
  success:   "#1A7A4A",
  successFaint:"#E8F6EE",

  // Text
  text:      "#0D1F3C",      // primary text — deep navy
  textMid:   "#3D5475",      // secondary text
  textMuted: "#7A8FA8",      // muted / labels
  textFaint: "#B0BEC8",      // placeholders

  // Borders
  border:    "#D8E3EE",
  border2:   "#C2D1E0",

  // EHR chrome
  ehrBg:     "#102040",
  ehrBorder: "#1E3A5F",
  ehrText:   "#C8D8F0",
};

// ─── Global CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  html, body, #root { width: 100%; min-height: 100%; }
  body { background: ${T.bg}; color: ${T.text}; font-family: 'Inter', sans-serif;
    font-size: 15px; line-height: 1.65; -webkit-font-smoothing: antialiased;
    min-width: 320px; overflow-x: hidden; }
  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; font-family: inherit; }
  input, textarea, select { font-family: inherit; }
  img, svg, video, canvas { max-width: 100%; height: auto; }

  @keyframes marquee { from { transform:translateX(0) } to { transform:translateX(-50%) } }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
  @keyframes pulse   { 0%,100% { opacity:.5 } 50% { opacity:1 } }
  @keyframes spin    { to { transform:rotate(360deg) } }
  @keyframes fillBar { from { width:0 } to { width:var(--w) } }

  .fade-up   { animation: fadeUp .6s ease both; }
  .d1 { animation-delay:.08s } .d2 { animation-delay:.18s }
  .d3 { animation-delay:.28s } .d4 { animation-delay:.38s }

  .btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    background:${T.teal}; color:#fff; font-weight:600; font-size:14px;
    padding:11px 26px; border-radius:7px; border:none;
    transition: background .2s, box-shadow .2s, transform .15s;
    letter-spacing:.01em;
  }
  .btn-primary:hover { background:${T.navyMid}; box-shadow:0 4px 16px rgba(14,124,134,.25); transform:translateY(-1px); }

  .btn-secondary {
    display:inline-flex; align-items:center; gap:8px;
    background:${T.surface}; color:${T.navy}; font-weight:500; font-size:14px;
    padding:10px 24px; border-radius:7px; border:1.5px solid ${T.border2};
    transition: border-color .2s, box-shadow .2s, transform .15s;
  }
  .btn-secondary:hover { border-color:${T.teal}; color:${T.teal}; transform:translateY(-1px); }

  .btn-navy {
    display:inline-flex; align-items:center; gap:8px;
    background:${T.navy}; color:#fff; font-weight:600; font-size:14px;
    padding:11px 26px; border-radius:7px; border:none;
    transition: background .2s, transform .15s;
  }
  .btn-navy:hover { background:${T.navyMid}; transform:translateY(-1px); }

  .label-tag {
    display:inline-flex; align-items:center; gap:7px;
    font-size:11px; font-weight:600; letter-spacing:.1em; text-transform:uppercase;
    color:${T.teal}; border:1.5px solid ${T.tealFaint}; border-radius:20px;
    padding:5px 14px; margin-bottom:20px; background:${T.tealFaint};
  }
  .label-tag .dot { width:6px; height:6px; border-radius:50%; background:${T.teal};
    animation: pulse 2s ease infinite; flex-shrink:0; }

  .section-title {
    font-family:'Lora', serif; font-size:clamp(28px,3.5vw,48px);
    line-height:1.18; font-weight:500; color:${T.navy};
    letter-spacing:-.02em;
  }
  .section-title em { font-style:italic; color:${T.teal}; }
  .section-title .rose { color:${T.rose}; font-style:normal; }

  .card {
    background:${T.surface}; border:1px solid ${T.border};
    border-radius:12px; padding:28px;
    transition: border-color .2s, box-shadow .2s;
    overflow-wrap:anywhere;
  }
  .card:hover { border-color:${T.border2}; box-shadow:0 4px 20px rgba(13,31,60,.06); }
  .card-sm { padding:20px; border-radius:10px; }

  .app-shell { width:100%; min-height:100vh; overflow-x:hidden; }

  .nav-inner {
    max-width:1120px; margin:0 auto; padding:0 clamp(16px,3vw,48px);
    height:58px; display:grid; grid-template-columns:auto minmax(0,1fr);
    align-items:center; gap:16px;
  }
  .nav-links { min-width:0; display:flex; justify-content:flex-end; }
  .nav-scroll {
    min-width:0; display:flex; gap:2px; align-items:center; overflow-x:auto;
    white-space:nowrap; scrollbar-width:none; -ms-overflow-style:none;
  }
  .nav-scroll::-webkit-scrollbar { display:none; }
  .nav-link-btn, .nav-cta { flex:0 0 auto; }
  .nav-divider { width:1px; height:16px; background:rgba(255,255,255,.15); margin:0 8px; flex:0 0 auto; }

  .layout-two {
    display:grid; grid-template-columns:repeat(2, minmax(0,1fr));
    gap:clamp(28px,4vw,56px); align-items:center;
  }
  .layout-two-start { align-items:start; }

  .compact-grid { display:grid; }
  .compact-grid-2 { grid-template-columns:repeat(2, minmax(0,1fr)); gap:16px; }
  .compact-grid-3 { grid-template-columns:repeat(3, minmax(0,1fr)); gap:10px; }
  .result-meta-grid { grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; }

  .grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .grid-2 { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
  @media(max-width:920px) {
    .layout-two,
    .compact-grid-2,
    .compact-grid-3,
    .grid-3,
    .grid-2 { grid-template-columns:1fr; }
  }
  @media(max-width:700px) {
    .nav-inner { gap:12px; padding:0 14px; }
    .nav-link-btn { font-size:11px !important; padding:5px 9px !important; }
    .nav-cta { padding:7px 14px !important; }
  }
  @media(max-width:520px) {
    .nav-inner { grid-template-columns:minmax(0,1fr); height:auto; padding-top:10px; padding-bottom:10px; }
    .nav-links { width:100%; }
    .result-meta-grid { grid-template-columns:1fr; }
  }

  .divider { height:1px; background:${T.border}; }

  /* EHR demo styles */
  .ehr-input {
    font-size:12px; padding:5px 9px; border-radius:5px;
    border:1px solid ${T.border2}; background:${T.bg};
    color:${T.text}; height:30px; width:100%; outline:none;
    transition: border-color .15s;
  }
  .ehr-input:focus { border-color:${T.teal}; }
  .ehr-select {
    font-size:12px; padding:5px 9px; border-radius:5px;
    border:1px solid ${T.border2}; background:${T.bg};
    color:${T.text}; height:30px; width:100%; outline:none;
  }
  .ehr-toggle {
    padding:4px 11px; border-radius:5px;
    border:1px solid ${T.border}; font-size:11px; font-weight:500;
    color:${T.textMuted}; cursor:pointer; background:${T.bg};
    transition:all .15s;
  }
  .ehr-toggle.on {
    border-color:${T.teal}; background:${T.tealFaint}; color:${T.teal};
  }
  .ehr-score-btn {
    width:100%; padding:10px; border-radius:7px; border:none;
    background:${T.navy}; color:#fff; font-size:13px; font-weight:600;
    cursor:pointer; transition:background .2s;
    display:flex; align-items:center; justify-content:center; gap:8px;
  }
  .ehr-score-btn:hover { background:${T.navyMid}; }
  .ehr-score-btn:disabled { opacity:.5; cursor:not-allowed; }
  .spin { width:16px; height:16px; border:2px solid rgba(255,255,255,.3);
    border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; }
  .shap-fill { animation: fillBar .8s ease both; }

  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:${T.bg}; }
  ::-webkit-scrollbar-thumb { background:${T.border2}; border-radius:3px; }
`;

const buildHerheartFullDemoSrcDoc = (templateSource) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.1/dist/tabler-icons.min.css" />
    <style>
      :root {
        --font-sans: 'Inter', sans-serif;
        --font-serif: 'Lora', serif;
        --font-mono: 'SFMono-Regular', 'SF Mono', 'Cascadia Code', Consolas, 'Liberation Mono', Menlo, monospace;
        --border-radius-md: 10px;
        --border-radius-lg: 14px;
        --color-background-primary: ${T.surface};
        --color-background-secondary: ${T.surfaceAlt};
        --color-background-tertiary: ${T.bg};
        --color-background-info: ${T.tealFaint};
        --color-background-success: ${T.successFaint};
        --color-background-warning: ${T.amberFaint};
        --color-background-danger: ${T.dangerFaint};
        --color-text-primary: ${T.text};
        --color-text-secondary: ${T.textMid};
        --color-text-tertiary: ${T.textMuted};
        --color-text-info: ${T.teal};
        --color-text-success: ${T.success};
        --color-text-warning: ${T.amber};
        --color-text-danger: ${T.danger};
        --color-border-primary: ${T.border2};
        --color-border-secondary: ${T.border2};
        --color-border-tertiary: ${T.border};
        --color-border-info: ${T.teal};
      }

      html, body {
        margin: 0;
        padding: 0;
        background: ${T.bg};
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    </style>
  </head>
  <body>
    ${templateSource}
  </body>
</html>`;
};
const HERHEART_EHR_FULL_DEMO_SRCDOC = buildHerheartFullDemoSrcDoc(herheartEhrFullDemoHtml);

// ─── Shared components ────────────────────────────────────────────────────────
const Dot = () => <span className="dot" />;
const LabelTag = ({ children }) => <div className="label-tag"><Dot />{children}</div>;
const Section = ({ id, style, children }) => (
  <section id={id} style={{ padding:"80px clamp(20px,5vw,72px)", maxWidth:1120, margin:"0 auto", ...style }}>
    {children}
  </section>
);
const Divider = () => <div className="divider" />;

const StatCard = ({ num, label, sub }) => (
  <div className="card card-sm" style={{ textAlign:"center" }}>
    <div style={{ fontFamily:"'Lora',serif", fontSize:38, color:T.teal, lineHeight:1, fontWeight:500 }}>{num}</div>
    <div style={{ fontSize:14, fontWeight:600, color:T.navy, marginTop:8 }}>{label}</div>
    {sub && <div style={{ fontSize:12, color:T.textMuted, marginTop:3 }}>{sub}</div>}
  </div>
);

// ─── Marquee ──────────────────────────────────────────────────────────────────
const LOGOS = ["Epic","Cerner","FHIR R4","HL7 v2","MIMIC-IV","NHS","NHANES","HIPAA","CE Mark","ISO 27001","FDA SaMD","IHE XDS"];
const Marquee = () => {
  const items = [...LOGOS,...LOGOS];
  return (
    <div style={{ overflow:"hidden", borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`,
      padding:"16px 0", background:T.surfaceAlt }}>
      <div style={{ display:"flex", gap:56, whiteSpace:"nowrap",
        animation:"marquee 28s linear infinite", width:"max-content", alignItems:"center" }}>
        {items.map((l,i) => (
          <span key={i} style={{ fontSize:11, color:T.textMuted, letterSpacing:".1em",
            textTransform:"uppercase", fontWeight:600 }}>{l}</span>
        ))}
      </div>
    </div>
  );
};

// ─── Nav ──────────────────────────────────────────────────────────────────────
const PAGES = ["Home","Solution","Demo","Business","Evidence","Funding","Team","Contact"];

const Nav = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: T.navBg,
      borderBottom:`1px solid ${T.ehrBorder}`,
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.18)" : "none",
      transition:"box-shadow .3s" }}>
      <div className="nav-inner">
        <button onClick={() => setPage("Home")} style={{ background:"none", border:"none",
          fontFamily:"'Lora',serif", fontSize:28, color:"#fff",
          display:"flex", alignItems:"center", gap:3, letterSpacing:"-.01em" }}>
          Her<span style={{ color:"#F0A0C0" }}>NextBeat</span>
          <span style={{ fontSize:12, color:"rgba(255,255,255,.45)", fontFamily:"'Inter',sans-serif",
            fontWeight:600, marginLeft:7, letterSpacing:".12em", textTransform:"uppercase" }}>AI</span>
        </button>
        <div className="nav-links">
          <div className="nav-scroll">
          {PAGES.slice(0,-1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className="nav-link-btn"
              style={{ background: p==="Demo" ? (page==="Demo" ? T.teal : `${T.teal}33`) : "none",
                border: p==="Demo" ? `1px solid ${p===page ? T.teal : T.tealLight}` : "none",
                fontSize:12, fontWeight: p===page ? 600 : 400,
                color: page===p ? "#fff" : p==="Demo" ? T.tealLight : "rgba(255,255,255,.6)",
                padding: p==="Demo" ? "5px 12px" : "5px 10px", borderRadius:6,
                transition:"all .2s", letterSpacing:".01em" }}>
              {p === "Demo" ? "▶ Live Demo" : p}
            </button>
          ))}
          <div className="nav-divider" />
          <button className="btn-primary nav-cta" style={{ padding:"7px 18px", fontSize:12 }}
            onClick={() => setPage("Contact")}>
            Request pilot →
          </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: HOME
// ═══════════════════════════════════════════════════════════════════════════════
const HomePage = ({ setPage }) => (
  <div>
    <div style={{ paddingTop:58 }}>
      <div style={{ background:`linear-gradient(135deg, ${T.navBg} 0%, ${T.navyMid} 100%)`,
        padding:"80px clamp(20px,5vw,72px) 72px", textAlign:"center" }}>
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(14,124,134,.25)", border:"1px solid rgba(14,124,134,.5)",
            borderRadius:20, padding:"5px 16px", marginBottom:24,
            fontSize:11, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"#7FD8E0" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#7FD8E0",
              animation:"pulse 2s ease infinite", display:"inline-block" }} />
            B2B Clinical AI · Hospital &amp; Health System Platform · SaMD
          </div>
          <h1 className="fade-up d1" style={{ fontFamily:"'Lora',serif", fontSize:"clamp(32px,4.5vw,58px)",
            lineHeight:1.18, color:"#fff", fontWeight:500, marginBottom:20, letterSpacing:"-.02em" }}>
            Closing the gender gap<br />in cardiovascular <span style={{ color:"#F0A0C0", fontStyle:"italic" }}>triage</span>
          </h1>
          <p className="fade-up d2" style={{ fontSize:16, color:"rgba(255,255,255,.65)",
            lineHeight:1.75, marginBottom:36, maxWidth:560, margin:"0 auto 36px" }}>
            HerNextBeat is an AI-powered Clinical Decision Support System for hospitals and emergency departments —
            integrating female-specific cardiovascular biomarkers that standard protocols miss.
          </p>
          <div className="fade-up d3" style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", marginBottom:36 }}>
            <button className="btn-primary" onClick={() => setPage("Contact")} style={{ fontSize:14, padding:"12px 28px" }}>
              Request a pilot →
            </button>
            <button onClick={() => setPage("Demo")}
              style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.08)",
                color:"#fff", fontWeight:500, fontSize:14, padding:"11px 24px", borderRadius:7,
                border:"1px solid rgba(255,255,255,.2)", cursor:"pointer", transition:"all .2s" }}>
              ▶ See live demo
            </button>
          </div>
          <div className="fade-up d4" style={{ display:"flex", gap:28, justifyContent:"center",
            flexWrap:"wrap", fontSize:11, color:"rgba(255,255,255,.4)",
            letterSpacing:".07em", textTransform:"uppercase" }}>
            {["HIPAA compliant","FHIR R4 API","FDA 510(k) pathway","CE SaMD pathway","GDPR ready"].map(t => (
              <span key={t} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ color:"#7FD8E0", fontSize:12 }}>✓</span>{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <Marquee />

    <Section>
      <div className="layout-two">
        <div>
          <LabelTag>For hospitals &amp; health systems</LabelTag>
          <h2 className="section-title" style={{ marginBottom:16 }}>
            A decision-support layer,<br />not a replacement
          </h2>
          <p style={{ color:T.textMid, fontSize:15, lineHeight:1.8, marginBottom:24 }}>
            HerNextBeat plugs into your existing EHR and triage workflow via FHIR R4 API.
            Your clinicians see a risk score — low, intermediate, or high — directly
            inside Epic or Cerner. No new software to learn. No workflow disruption.
          </p>
          <p style={{ color:T.textMid, fontSize:15, lineHeight:1.8, marginBottom:32 }}>
            The system is designed for hospital procurement, not individual subscriptions.
            One integration, institution-wide deployment.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <button className="btn-primary" onClick={() => setPage("Solution")}>Technical overview</button>
            <button className="btn-secondary" onClick={() => setPage("Demo")}>▶ Try the demo</button>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            ["🏥","Hospital deployment","Single FHIR integration. Deployed institution-wide. Works across all EDs and primary care units on the same contract."],
            ["⚕️","Clinician-first design","Risk score and SHAP explanations appear inside the clinician's existing triage screen. Zero learning curve."],
            ["📋","Regulatory ready","FDA 510(k) pathway active. CE SaMD class IIa. Full HIPAA BAA. GDPR Art.9 compliant. Audit trail on every inference."],
          ].map(([icon,title,body]) => (
            <div key={title} className="card card-sm" style={{ display:"flex", gap:14 }}>
              <div style={{ fontSize:22, flexShrink:0, paddingTop:2 }}>{icon}</div>
              <div>
                <div style={{ fontWeight:600, fontSize:14, color:T.navy, marginBottom:4 }}>{title}</div>
                <div style={{ fontSize:12, color:T.textMuted, lineHeight:1.7 }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>

    <Divider />

    <Section style={{ background:T.surfaceAlt, maxWidth:"100%", padding:"72px clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <LabelTag>The clinical gap we close</LabelTag>
          <h2 className="section-title">
            Women are systematically <span className="rose">underdiagnosed</span>
          </h2>
          <p style={{ color:T.textMid, fontSize:15, maxWidth:520, margin:"12px auto 0", lineHeight:1.8 }}>
            Standard cardiovascular risk models were trained predominantly on male cohorts.
            This is a patient safety issue — and a liability issue for your institution.
          </p>
        </div>
        <div className="grid-3" style={{ marginBottom:48 }}>
          <StatCard num="50%" label="Misdiagnosed at first ED visit" sub="Women presenting with NSTEMI" />
          <StatCard num="3×" label="Higher in-hospital mortality" sub="vs men with equivalent severity" />
          <StatCard num="7 yrs" label="Later first diagnosis" sub="Average gap vs male patients" />
        </div>
        <div className="grid-3">
          {[
            ["Preeclampsia history","Doubles lifetime CVD risk. Absent from TIMI, HEART, and Grace scores.","rose"],
            ["Early menopause","Menopause before 45 = significant independent CVD risk factor. Ignored in triage.","rose"],
            ["Gestational diabetes","10× higher risk of type 2 DM and CVD. Never captured in acute risk tools.","rose"],
          ].map(([t,b]) => (
            <div key={t} className="card" style={{ borderTop:`3px solid ${T.rose}` }}>
              <div style={{ fontSize:11, fontWeight:600, textTransform:"uppercase",
                letterSpacing:".08em", color:T.rose, marginBottom:8 }}>{t}</div>
              <div style={{ fontSize:13, color:T.textMid, lineHeight:1.75 }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>

    <Divider />

    <Section style={{ textAlign:"center" }}>
      <LabelTag>Pilot programme — Q4 2026</LabelTag>
      <h2 className="section-title" style={{ marginBottom:16 }}>
        3 pilot hospital slots available
      </h2>
      <p style={{ color:T.textMid, fontSize:15, maxWidth:480, margin:"0 auto 32px", lineHeight:1.8 }}>
        Free integration for 3 months. Shared authorship on the outcomes paper.
        Dedicated clinical implementation support.
      </p>
      <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
        <button className="btn-primary" onClick={() => setPage("Contact")}>Apply for a pilot slot →</button>
        <button className="btn-secondary" onClick={() => setPage("Business")}>View business case</button>
      </div>
    </Section>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: DEMO — Integrated EHR triage simulation
// ═══════════════════════════════════════════════════════════════════════════════
const DemoPage = ({ setPage }) => {
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
    <div style={{ paddingTop:58 }}>
      <div style={{ background:T.navBg, padding:"32px clamp(20px,5vw,72px) 28px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto", display:"flex", alignItems:"center",
          justifyContent:"space-between", gap:20, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.45)", textTransform:"uppercase",
              letterSpacing:".1em", fontWeight:600, marginBottom:6 }}>Interactive clinical demo</div>
            <h1 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(22px,2.5vw,32px)",
              color:"#fff", fontWeight:500, letterSpacing:"-.01em", marginBottom:6 }}>
              HerNextBeat — Full EHR Workflow Simulation
            </h1>
            <p style={{ fontSize:13, color:"rgba(255,255,255,.5)", maxWidth:640, lineHeight:1.8 }}>
              The existing live demo has been replaced with the full multi-tab EHR prototype,
              including triage, patient history, orders, notes, and imaging inside a single embedded workflow.
            </p>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button className="btn-secondary" style={{ fontSize:12, padding:"8px 16px" }}
              onClick={() => setPage("Solution")}>Technical docs</button>
            <button className="btn-primary" style={{ fontSize:12, padding:"8px 16px" }}
              onClick={() => setPage("Contact")}>Request integration →</button>
          </div>
        </div>
      </div>

      <Section style={{ maxWidth:1200, paddingTop:32 }}>
        <div className="card" style={{ padding:16, overflow:"hidden" }}>
          <iframe
            ref={iframeRef}
            title="HerNextBeat full EHR clinical demo"
            srcDoc={HERHEART_EHR_FULL_DEMO_SRCDOC}
            sandbox="allow-scripts allow-same-origin"
            loading="eager"
            onLoad={handleIframeLoad}
            style={{ width:"100%", minHeight:1400, border:"none", display:"block", background:T.bg }}
          />
        </div>
      </Section>

      <div style={{ background:T.surfaceAlt, borderTop:`1px solid ${T.border}`,
        padding:"48px clamp(20px,5vw,72px)", textAlign:"center" }}>
        <h2 className="section-title" style={{ fontSize:26, marginBottom:12 }}>
          Ready to integrate HerNextBeat into your ED?
        </h2>
        <p style={{ color:T.textMid, fontSize:14, maxWidth:520, margin:"0 auto 24px", lineHeight:1.8 }}>
          This embedded prototype mirrors a fuller clinical workflow. The production integration still connects via FHIR R4
          and returns results inside your clinicians&apos; existing environment.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-primary" onClick={() => setPage("Contact")}>Request a pilot →</button>
          <button className="btn-secondary" onClick={() => setPage("Solution")}>Technical architecture</button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: SOLUTION
// ═══════════════════════════════════════════════════════════════════════════════
const SolutionPage = () => (
  <div style={{ paddingTop:58 }}>
    <div style={{ background:T.navBg, padding:"52px clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <LabelTag>Technical solution</LabelTag>
        <h1 className="section-title" style={{ color:"#fff", marginBottom:16 }}>
          An API that plugs into any<br /><em>hospital EHR workflow</em>
        </h1>
        <p style={{ color:"rgba(255,255,255,.6)", fontSize:15, maxWidth:520, lineHeight:1.8 }}>
          HerNextBeat is not a standalone app. It is a stateless clinical intelligence endpoint
          that hospitals call from inside Epic, Cerner, or any HL7-compliant system.
        </p>
      </div>
    </div>
    <Section>
      <div className="card" style={{ marginBottom:40, padding:0, overflow:"hidden" }}>
        <div style={{ padding:"16px 24px", borderBottom:`1px solid ${T.border}`,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11, fontWeight:600, color:T.textMuted,
            textTransform:"uppercase", letterSpacing:".08em" }}>Integration architecture</span>
          <span style={{ fontSize:11, color:T.teal }}>FHIR R4 · HL7 v2 · CDS Hooks</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr auto 1fr" }}>
          {[
            { label:"EHR / triage system", sub:"Epic · Cerner · local HIS", color:T.textMid },
            { arrow:true },
            { label:"FHIR gateway", sub:"HL7 R4 · PHI de-id · audit log", color:T.teal },
            { arrow:true },
            { label:"HerNextBeat API", sub:"XGBoost · SHAP · drift monitor", color:T.rose },
          ].map((item,i) => item.arrow
            ? <div key={i} style={{ display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:18, color:T.border2, padding:"0 8px" }}>→</div>
            : <div key={i} style={{ padding:"24px 20px",
                borderRight: i<4 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ fontSize:13, fontWeight:600, color:item.color, marginBottom:5 }}>{item.label}</div>
                <div style={{ fontSize:12, color:T.textMuted }}>{item.sub}</div>
              </div>
          )}
        </div>
        <div style={{ borderTop:`1px solid ${T.border}`, padding:"14px 24px",
          background:T.navBg, fontFamily:"monospace", fontSize:11, color:"#5dcaa5" }}>
          POST /v1/score → {"{ risk_tier: 'high', confidence: 0.91, shap: [{feature:'preeclampsia_hx', value:0.34}] }"}
        </div>
      </div>
      <div className="layout-two layout-two-start" style={{ gap:48 }}>
        <div>
          <h2 className="section-title" style={{ fontSize:28, marginBottom:28 }}>How it works in the ED</h2>
          {[
            ["01","Patient arrives at ED or primary care","Triage staff input current symptoms. HerNextBeat auto-pulls historical obstetric and cardiac data via FHIR from the hospital EHR — no manual data entry required."],
            ["02","Model scores in real time","XGBoost ensemble ingests 41 female-specific features. SHAP values explain each prediction. Drift monitoring flags when data distributions shift — essential for long-term accuracy."],
            ["03","Risk tier appears in the triage screen","Low / intermediate / high + top contributing factors appear inside Epic or Cerner. The clinician decides — HerNextBeat supports, never replaces clinical judgement."],
          ].map(([n,t,b]) => (
            <div key={n} style={{ display:"flex", gap:16, paddingBottom:24,
              borderBottom:`1px solid ${T.border}`, marginBottom:24 }}>
              <div style={{ minWidth:32, height:32, borderRadius:"50%",
                border:`1.5px solid ${T.border2}`, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:12, color:T.textMuted, flexShrink:0 }}>{n}</div>
              <div>
                <div style={{ fontWeight:600, fontSize:14, color:T.navy, marginBottom:4 }}>{t}</div>
                <div style={{ fontSize:13, color:T.textMid, lineHeight:1.75 }}>{b}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            ["Female-specific features","Preeclampsia hx, gestational DM, menopause age, HRT status, parity — 12 sex-specific inputs","teal"],
            ["Standard cardiac features","BP, cholesterol, troponin, ECG findings, smoking, diabetes, age, family history","teal"],
            ["Model output","Risk tier (3-class) + calibrated probability + ranked SHAP feature weights","teal"],
            ["Latency","< 200ms synchronous · async webhook mode available for batch scoring","teal"],
            ["Compliance","HIPAA BAA ready · GDPR Art.9 · CE SaMD class IIa · FDA 510(k) pathway","rose"],
            ["EHR support","Epic SMART on FHIR · Cerner CDS Hooks · HL7 v2 ADT · IHE XDS","rose"],
          ].map(([k,v,ac]) => (
            <div key={k} className="card card-sm">
              <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase",
                letterSpacing:".08em", color: ac==="rose" ? T.rose : T.teal, marginBottom:4 }}>{k}</div>
              <div style={{ fontSize:12, color:T.textMid }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: BUSINESS
// ═══════════════════════════════════════════════════════════════════════════════
const BusinessPage = () => {
  const years = ["Y1","Y2","Y3","Y4","Y5"];
  const revenue = [0, 120, 500, 1800, 4500];
  const costs   = [380, 400, 600, 1600, 3300];
  const maxVal  = 4500;
  return (
    <div style={{ paddingTop:58 }}>
      <div style={{ background:T.navBg, padding:"52px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <LabelTag>Business plan · 2026–2030</LabelTag>
          <h1 className="section-title" style={{ color:"#fff", marginBottom:16 }}>
            A hospital SaaS model<br />built for <em>institutional procurement</em>
          </h1>
          <p style={{ color:"rgba(255,255,255,.6)", fontSize:15, maxWidth:500, lineHeight:1.8 }}>
            HerNextBeat targets hospital procurement departments, not individual clinicians.
            One contract, institution-wide deployment, subscription pricing per site.
          </p>
        </div>
      </div>
      <Section>
        <div className="grid-3" style={{ marginBottom:40 }}>
          {[
            ["Per-site subscription","€10k–15k/month per hospital site, tiered by annual ED patient volume. Annual billing."],
            ["Channel partnerships","20–35% rev-share with Philips, Siemens, Epic App Orchard from year 3 onward."],
            ["Value-based pilot","Free 3-month pilot → paid contract contingent on measurable triage improvement."],
          ].map(([t,b]) => (
            <div key={t} className="card">
              <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase",
                letterSpacing:".08em", color:T.teal, marginBottom:8 }}>{t}</div>
              <div style={{ fontSize:13, color:T.textMid, lineHeight:1.75 }}>{b}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginBottom:40 }}>
          <div style={{ paddingBottom:16, marginBottom:20, borderBottom:`1px solid ${T.border}`,
            display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:13, fontWeight:600, color:T.navy }}>5-year P&L projection (€k)</span>
            <div style={{ display:"flex", gap:16, fontSize:11, color:T.textMuted }}>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:12, height:3, background:T.teal, display:"inline-block", borderRadius:2 }} />Revenue
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:12, height:3, background:T.rose, display:"inline-block", borderRadius:2 }} />Costs
              </span>
            </div>
          </div>
          <div style={{ display:"flex", gap:16, alignItems:"flex-end", height:180 }}>
            {years.map((y,i) => (
              <div key={y} style={{ flex:1, display:"flex", flexDirection:"column",
                alignItems:"center", gap:6, height:"100%" }}>
                <div style={{ flex:1, display:"flex", flexDirection:"column",
                  justifyContent:"flex-end", gap:3, width:"100%" }}>
                  <div style={{ background:T.rose, borderRadius:"4px 4px 0 0", opacity:.6,
                    height:`${Math.round((costs[i]/maxVal)*160)}px` }} />
                  <div style={{ background:T.teal, borderRadius:"4px 4px 0 0",
                    height:`${Math.round((revenue[i]/maxVal)*160)}px` }} />
                </div>
                <div style={{ fontSize:11, color:T.textMuted }}>{y}</div>
                <div style={{ fontSize:11, color:T.teal, fontWeight:600 }}>
                  {revenue[i] > 0 ? `€${revenue[i]}k` : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
        <h2 className="section-title" style={{ fontSize:26, marginBottom:20 }}>Growth phases</h2>
        {[
          ["2026","Pre-revenue — validation","FDA 510(k) filing · IRB retrospective study · 1st pilot hospital signed · €380k burn · seed round raise"],
          ["2027","Pilot revenue — €120k ARR","2–3 paying pilot hospitals · validation paper submitted to JAMA / EHJ · CE mark pathway started"],
          ["2028","Early scale — €500k ARR","10 hospitals · first reseller MOU signed · Series A preparation · break-even on horizon"],
          ["2029–30","Scale — €1.8M–4.5M ARR","30+ hospitals · Epic App Orchard listing · U.S. + EU markets active · EBITDA positive"],
        ].map(([yr,t,b]) => (
          <div key={yr} style={{ display:"grid", gridTemplateColumns:"90px 1fr",
            gap:20, padding:"18px 0", borderBottom:`1px solid ${T.border}` }}>
            <div style={{ fontSize:13, color:T.teal, fontWeight:600, paddingTop:2 }}>{yr}</div>
            <div>
              <div style={{ fontWeight:600, fontSize:14, color:T.navy, marginBottom:3 }}>{t}</div>
              <div style={{ fontSize:13, color:T.textMid }}>{b}</div>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: EVIDENCE
// ═══════════════════════════════════════════════════════════════════════════════
const EvidencePage = () => (
  <div style={{ paddingTop:58 }}>
    <div style={{ background:T.navBg, padding:"52px clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <LabelTag>Clinical evidence &amp; validation</LabelTag>
        <h1 className="section-title" style={{ color:"#fff", marginBottom:16 }}>
          Built on peer-reviewed<br /><em>cardiovascular science</em>
        </h1>
      </div>
    </div>
    <Section>
      <div className="grid-2" style={{ marginBottom:40 }}>
        {[
          ["Training datasets","MIMIC-IV · NHANES · Women's Health Initiative (WHI) · Nurses' Health Study — validated outcomes labels on a diverse female cohort."],
          ["Validation plan","Phase 1: retrospective AUC-ROC, sensitivity, specificity, NPV, calibration. Phase 2: prospective pilot comparing HerNextBeat vs standard clinical triage."],
          ["Explainability (XAI)","SHAP values per inference. Feature importance ranked for clinicians. Full audit trail per prediction — required for FDA 510(k) and malpractice defense."],
          ["Drift monitoring","Continuous data and concept drift detection. Alerts when demographic shifts or new treatment protocols alter model input distributions."],
        ].map(([t,b]) => (
          <div key={t} className="card">
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase",
              letterSpacing:".08em", color:T.teal, marginBottom:8 }}>{t}</div>
            <div style={{ fontSize:13, color:T.textMid, lineHeight:1.75 }}>{b}</div>
          </div>
        ))}
      </div>
      <h2 className="section-title" style={{ fontSize:26, marginBottom:20 }}>Target performance metrics</h2>
      <div className="grid-3">
        {[
          ["AUC-ROC","> 0.82","Discrimination — 3 risk tiers"],
          ["Sensitivity","> 90%","High-risk class — acute care"],
          ["NPV","> 96%","Low-risk — safe discharge"],
          ["Calibration","H-L test p > 0.05","Probability reliability"],
          ["Latency","< 200 ms","Synchronous triage response"],
          ["Drift alert","< 2% / month","Performance degradation threshold"],
        ].map(([m,v,d]) => (
          <div key={m} className="card card-sm">
            <div style={{ fontSize:10, color:T.textMuted, textTransform:"uppercase",
              letterSpacing:".06em", marginBottom:6 }}>{m}</div>
            <div style={{ fontFamily:"'Lora',serif", fontSize:28,
              color:T.teal, marginBottom:3, fontWeight:500 }}>{v}</div>
            <div style={{ fontSize:11, color:T.textFaint }}>{d}</div>
          </div>
        ))}
      </div>
    </Section>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: FUNDING
// ═══════════════════════════════════════════════════════════════════════════════
const FundingPage = () => (
  <div style={{ paddingTop:58 }}>
    <div style={{ background:T.navBg, padding:"52px clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <LabelTag>Investment opportunity</LabelTag>
        <h1 className="section-title" style={{ color:"#fff", marginBottom:16 }}>
          Seeking <em>€800k</em> seed round<br />· Q3 2026
        </h1>
        <p style={{ color:"rgba(255,255,255,.6)", fontSize:15, maxWidth:500, lineHeight:1.8 }}>
          Funding FDA 510(k) filing, two senior ML engineering hires, our first clinical pilot,
          and the EHR integration layer. Non-dilutive grant applications running in parallel.
        </p>
      </div>
    </div>
    <Section>
      <div className="grid-2" style={{ marginBottom:40 }}>
        <div className="card">
          <div style={{ fontSize:13, fontWeight:600, color:T.navy, marginBottom:18 }}>Use of funds</div>
          {[["FDA 510(k) + regulatory","€180k","22%"],["ML engineering ×2","€280k","35%"],
            ["EHR integration layer","€120k","15%"],["Clinical pilot costs","€80k","10%"],
            ["Legal / IP / patents","€80k","10%"],["Operations / runway","€60k","8%"]
          ].map(([l,a,p]) => (
            <div key={l} style={{ display:"flex", justifyContent:"space-between",
              padding:"9px 0", borderBottom:`1px solid ${T.border}`, fontSize:13 }}>
              <span style={{ color:T.textMid }}>{l}</span>
              <span style={{ display:"flex", gap:14 }}>
                <span style={{ color:T.navy, fontWeight:500 }}>{a}</span>
                <span style={{ color:T.textFaint, minWidth:28, textAlign:"right" }}>{p}</span>
              </span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div className="card" style={{ borderLeft:`3px solid ${T.teal}`, borderRadius:"0 10px 10px 0" }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase",
              letterSpacing:".08em", color:T.teal, marginBottom:6 }}>Non-dilutive (in progress)</div>
            <div style={{ fontSize:13, color:T.textMid, lineHeight:1.75 }}>
              CDTI R&D loan (Spain) · EIC Accelerator Phase 1 · NIH SBIR Phase I · Horizon Europe Health Cluster
            </div>
          </div>
          <div className="card">
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase",
              letterSpacing:".08em", color:T.teal, marginBottom:6 }}>Target investors</div>
            <div style={{ fontSize:13, color:T.textMid, lineHeight:1.75 }}>
              HealthTech VCs (Asabys Partners, Forbion, Sofinnova) ·
              Hospital corporate venture arms · Angels with cardiology background
            </div>
          </div>
          <div className="card" style={{ borderLeft:`3px solid ${T.rose}`, borderRadius:"0 10px 10px 0" }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase",
              letterSpacing:".08em", color:T.rose, marginBottom:6 }}>What investors receive</div>
            <div style={{ fontSize:13, color:T.textMid, lineHeight:1.75 }}>
              Equity stake · Board observer seat · Co-investment rights on Series A ·
              First-mover in a $12B gender-health AI segment
            </div>
          </div>
          <div className="card">
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase",
              letterSpacing:".08em", color:T.textMuted, marginBottom:6 }}>IP &amp; moat</div>
            <div style={{ fontSize:13, color:T.textMid, lineHeight:1.75 }}>
              Provisional U.S. patent filed · Female-feature pipeline proprietary ·
              Data flywheel via hospital BAAs · FDA clearance as 2-year competitive barrier
            </div>
          </div>
        </div>
      </div>
      <h2 className="section-title" style={{ fontSize:26, marginBottom:20 }}>Post-funding milestones</h2>
      <div className="grid-3">
        {[["Month 3","First pilot hospital signed. Retrospective validation dataset secured under IRB approval."],
          ["Month 6","Validation results submitted to peer-reviewed journal. FDA 510(k) pre-sub meeting complete."],
          ["Month 12","Prospective pilot live. €120k ARR achieved. CE mark technical file complete. Series A deck ready."],
        ].map(([m,b]) => (
          <div key={m} className="card card-sm">
            <div style={{ fontFamily:"'Lora',serif", fontSize:22, color:T.teal,
              marginBottom:8, fontWeight:500 }}>{m}</div>
            <div style={{ fontSize:13, color:T.textMid, lineHeight:1.75 }}>{b}</div>
          </div>
        ))}
      </div>
    </Section>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: TEAM
// ═══════════════════════════════════════════════════════════════════════════════
const TeamPage = () => (
  <div style={{ paddingTop:58 }}>
    <div style={{ background:T.navBg, padding:"52px clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <LabelTag>The team - NextBeat</LabelTag>
        <h1 className="section-title" style={{ color:"#fff", marginBottom:16 }}>
          Clinical depth meets<br /><em>engineering precision</em>
        </h1>
      </div>
    </div>
    <Section>
      <div className="grid-3" style={{ marginBottom:40 }}>
        {[
          ["Rajae El Gaouzi • Founder / CEO","Leads the strategic vision, partnerships, and overall growth of HerNextBeat, driving innovation in women’s cardiovascular healthcare.","CEO · Strategy · Fundraising"],
          ["Clara Gonzalez • Chief Medical Officer (CMO)","Oversees clinical strategy, medical validation, and collaboration with healthcare professionals to ensure patient-centered and evidence-based solutions.","CMO · Clinical validation · KOL"],
          ["Marco Russo • Chief Financial Officer (CFO)","Manages financial strategy, investment planning, budgeting, and long-term business sustainability.","CFO · Finance · Strategy"],
          ["Iván Peréz López • Chief Technology Officer (CTO)","Leads the development of HerNextBeat’s AI infrastructure, software architecture, and integration with healthcare systems.","CTO · Model · Infrastructure"],
          ["Victor Gutierrez Gonzalez • Regulatory Affairs and Quality Assurance (QA) Manager","Ensures compliance with FDA, HIPAA, and healthcare quality standards while overseeing regulatory strategy and product safety.","Regulatory · Compliance · Legal"],
          ["Marta Meroño Rafel • Operation and Marketing Officer (OMO)","Coordinates business operations, marketing strategy, brand development, and communication to support market adoption and company growth.","OMO · Business development"],
        ].map(([role,bio,tags]) => (
          <div key={role} className="card">
            <div style={{ width:42, height:42, borderRadius:"50%",
              background:T.tealFaint, border:`1.5px solid ${T.teal}44`,
              marginBottom:14 }} />
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase",
              letterSpacing:".08em", color:T.teal, marginBottom:6 }}>{role}</div>
            <div style={{ fontSize:13, color:T.textMid, lineHeight:1.75, marginBottom:10 }}>{bio}</div>
            <div style={{ fontSize:11, color:T.textFaint }}>{tags}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ background:T.tealFaint, borderColor:`${T.teal}33`,
        textAlign:"center", padding:"40px 28px" }}>
        <h2 className="section-title" style={{ fontSize:24, marginBottom:10 }}>We are hiring</h2>
        <p style={{ color:T.textMid, fontSize:14, maxWidth:400, margin:"0 auto 24px", lineHeight:1.8 }}>
          Open roles: Senior ML Engineer (FHIR/healthcare AI), Clinical Data Scientist,
          Hospital Partnerships Manager (DACH region).
        </p>
        <button className="btn-secondary">View open roles →</button>
      </div>
    </Section>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: CONTACT
// ═══════════════════════════════════════════════════════════════════════════════
const ContactPage = () => {
  const [type, setType] = useState("Hospital / Health System");
  const [sent, setSent] = useState(false);
  const types = ["Hospital / Health System","VC / Investor","Clinical advisor","Strategic partner","Press / Media"];
  return (
    <div style={{ paddingTop:58 }}>
      <div style={{ background:T.navBg, padding:"52px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <LabelTag>Get in touch</LabelTag>
          <h1 className="section-title" style={{ color:"#fff", marginBottom:16 }}>
            Let's discuss your<br /><em>pilot programme</em>
          </h1>
          <p style={{ color:"rgba(255,255,255,.6)", fontSize:15, maxWidth:500, lineHeight:1.8 }}>
            We work with hospital procurement, ED clinical leads, and health system CIOs.
            Tell us your context and we will tailor the proposal accordingly.
          </p>
        </div>
      </div>
      <Section style={{ maxWidth:780 }}>
        {sent ? (
          <div className="card" style={{ textAlign:"center", padding:"56px 32px",
            borderColor:`${T.teal}44`, background:T.tealFaint }}>
            <div style={{ fontSize:32, marginBottom:12, color:T.teal }}>✓</div>
            <h2 style={{ fontFamily:"'Lora',serif", fontSize:26, color:T.teal, marginBottom:10 }}>
              Message received
            </h2>
            <p style={{ color:T.textMid, fontSize:14 }}>
              We respond within 48 hours. You'll hear from us at the email you provided.
            </p>
          </div>
        ) : (
          <div className="card">
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div className="compact-grid compact-grid-2">
                {[["Name","Full name"],["Organisation","Hospital / Health system / Fund"]].map(([l,ph]) => (
                  <div key={l}>
                    <div style={{ fontSize:11, fontWeight:600, color:T.textMuted,
                      textTransform:"uppercase", letterSpacing:".06em", marginBottom:6 }}>{l}</div>
                    <input placeholder={ph}
                      style={{ width:"100%", background:T.bg, border:`1px solid ${T.border2}`,
                        borderRadius:7, padding:"9px 12px", color:T.text, fontSize:13, outline:"none" }} />
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize:11, fontWeight:600, color:T.textMuted,
                  textTransform:"uppercase", letterSpacing:".06em", marginBottom:6 }}>Work email</div>
                <input type="email" placeholder="you@hospital.org"
                  style={{ width:"100%", background:T.bg, border:`1px solid ${T.border2}`,
                    borderRadius:7, padding:"9px 12px", color:T.text, fontSize:13, outline:"none" }} />
              </div>
              <div>
                <div style={{ fontSize:11, fontWeight:600, color:T.textMuted,
                  textTransform:"uppercase", letterSpacing:".06em", marginBottom:10 }}>I represent…</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {types.map(t => (
                    <button key={t} onClick={() => setType(t)}
                      style={{ padding:"7px 14px", borderRadius:20, fontSize:12, fontWeight:500,
                        border:`1.5px solid ${type===t ? T.teal : T.border}`,
                        background: type===t ? T.tealFaint : "transparent",
                        color: type===t ? T.teal : T.textMuted, transition:"all .15s" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize:11, fontWeight:600, color:T.textMuted,
                  textTransform:"uppercase", letterSpacing:".06em", marginBottom:6 }}>Message</div>
                <textarea rows={4}
                  placeholder="Describe your ED setup, patient volume, current EHR, and what you're looking for…"
                  style={{ width:"100%", background:T.bg, border:`1px solid ${T.border2}`,
                    borderRadius:7, padding:"9px 12px", color:T.text, fontSize:13,
                    outline:"none", resize:"vertical", lineHeight:1.7 }} />
              </div>
              <button className="btn-primary" style={{ alignSelf:"flex-start" }}
                onClick={() => setSent(true)}>
                Send message →
              </button>
            </div>
          </div>
        )}
        <div className="grid-3" style={{ marginTop:32 }}>
          {[["Email","hello@hernextbeat.ai"],["Based in","London, England · UK"],["Response time","Within 48 h"]].map(([k,v]) => (
            <div key={k} style={{ textAlign:"center", padding:16,
              borderRight: k !== "Response time" ? `1px solid ${T.border}` : "none" }}>
              <div style={{ fontSize:10, fontWeight:600, color:T.textMuted,
                textTransform:"uppercase", letterSpacing:".07em", marginBottom:4 }}>{k}</div>
              <div style={{ fontSize:13, color:T.navy, fontWeight:500 }}>{v}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════════
const Footer = ({ setPage }) => (
  <footer style={{ background:T.navBg, marginTop:0 }}>
    <div style={{ maxWidth:1120, margin:"0 auto", padding:"52px clamp(20px,5vw,72px) 32px" }}>
      <div style={{ display:"flex", justifyContent:"space-between",
        alignItems:"flex-start", flexWrap:"wrap", gap:32, marginBottom:40 }}>
        <div>
          <div style={{ fontFamily:"'Lora',serif", fontSize:28, color:"#fff", marginBottom:10 }}>
            Her<span style={{ color:"#F0A0C0" }}>NextBeat</span>
            <span style={{ fontSize:12, color:"rgba(255,255,255,.35)", fontFamily:"'Inter',sans-serif",
              fontWeight:600, marginLeft:7, letterSpacing:".12em" }}>AI</span>
          </div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,.45)", maxWidth:240, lineHeight:1.75 }}>
            AI-powered cardiovascular decision support for women. FHIR-native, explainable, clinician-first. B2B platform for hospitals and health systems.
          </div>
        </div>
        <div style={{ display:"flex", gap:52, flexWrap:"wrap" }}>
          {[["Platform",["Solution","Demo","Evidence"]],
            ["Company",["Business","Team","Funding"]],
            ["Contact",["Contact","hello@hernextbeat.ai","Press kit"]],
          ].map(([group, links]) => (
            <div key={group}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,.35)", textTransform:"uppercase",
                letterSpacing:".1em", marginBottom:14, fontWeight:600 }}>{group}</div>
              {links.map(l => (
                <div key={l} style={{ marginBottom:10 }}>
                  <span onClick={() => setPage(l === "hello@hernextbeat.ai" || l === "Press kit" ? "Contact" : l)}
                    style={{ fontSize:13, color:"rgba(255,255,255,.45)", cursor:"pointer",
                      transition:"color .15s" }}
                    onMouseEnter={e => e.target.style.color="#fff"}
                    onMouseLeave={e => e.target.style.color="rgba(255,255,255,.45)"}>{l}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop:"1px solid rgba(255,255,255,.08)", paddingTop:24,
        display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <span style={{ fontSize:11, color:"rgba(255,255,255,.25)" }}>© 2026 HerNextBeat AI SL · Madrid, Spain</span>
        <span style={{ fontSize:11, color:"rgba(255,255,255,.25)" }}>GDPR · HIPAA BAA · CE SaMD · FDA 510(k) pathway</span>
      </div>
    </div>
  </footer>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("Home");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);

  const renderPage = () => {
    switch(page) {
      case "Home":     return <HomePage setPage={setPage} />;
      case "Solution": return <SolutionPage />;
      case "Demo":     return <DemoPage setPage={setPage} />;
      case "Business": return <BusinessPage />;
      case "Evidence": return <EvidencePage />;
      case "Funding":  return <FundingPage />;
      case "Team":     return <TeamPage />;
      case "Contact":  return <ContactPage />;
      default:         return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="app-shell" style={{ background:T.bg, minHeight:"100vh" }}>
      <Nav page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
