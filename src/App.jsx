import { useState, useEffect, useRef } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg:      "#080808",
  surface: "#111111",
  border:  "#1e1e1e",
  border2: "#2a2a2a",
  text:    "#f0ede8",
  muted:   "#888880",
  faint:   "#444440",
  accent:  "#1bbd8a",   // teal-green — HerHeart brand
  accentD: "#0f9e72",
  pink:    "#e05a8a",   // female health accent
  pinkD:   "#c44a76",
};

// ─── Global styles injected once ─────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${T.bg}; color: ${T.text}; font-family: 'DM Sans', sans-serif;
    font-size: 16px; line-height: 1.6; -webkit-font-smoothing: antialiased; }
  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; font-family: inherit; }
  input, textarea { font-family: inherit; }

  @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
  @keyframes pulse   { 0%,100% { opacity:.4 } 50% { opacity:.9 } }
  @keyframes spin    { to { transform: rotate(360deg) } }

  .fade-up { animation: fadeUp .7s ease both; }
  .fade-up-1 { animation-delay:.1s }
  .fade-up-2 { animation-delay:.22s }
  .fade-up-3 { animation-delay:.34s }
  .fade-up-4 { animation-delay:.46s }

  .btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    background:${T.accent}; color:#000; font-weight:600; font-size:14px;
    padding:11px 24px; border-radius:8px; border:none;
    transition: background .2s, transform .15s;
  }
  .btn-primary:hover { background:${T.accentD}; transform:translateY(-1px); }

  .btn-ghost {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent; color:${T.text}; font-weight:500; font-size:14px;
    padding:10px 22px; border-radius:8px; border:1px solid ${T.border2};
    transition: border-color .2s, transform .15s;
  }
  .btn-ghost:hover { border-color:${T.faint}; transform:translateY(-1px); }

  .label-tag {
    display:inline-flex; align-items:center; gap:6px;
    font-size:11px; font-weight:500; letter-spacing:.08em; text-transform:uppercase;
    color:${T.muted}; border:1px solid ${T.border2}; border-radius:20px;
    padding:4px 12px; margin-bottom:20px;
  }
  .label-tag .dot { width:6px; height:6px; border-radius:50%; background:${T.accent}; 
    animation: pulse 2s ease infinite; }

  .section-title {
    font-family:'DM Serif Display', serif; font-size:clamp(32px,4vw,52px);
    line-height:1.15; font-weight:400; color:${T.text};
  }
  .section-title em { font-style:italic; color:${T.accent}; }
  .section-title .pink { color:${T.pink}; }

  .card {
    background:${T.surface}; border:1px solid ${T.border};
    border-radius:14px; padding:28px;
  }
  .card:hover { border-color:${T.border2}; }
  .card-sm { padding:20px; border-radius:10px; }

  .grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .grid-2 { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
  @media(max-width:800px) {
    .grid-3, .grid-2 { grid-template-columns:1fr; }
  }

  .divider { height:1px; background:${T.border}; margin:0; }

  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:${T.bg}; }
  ::-webkit-scrollbar-thumb { background:${T.faint}; border-radius:3px; }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Dot = () => <span className="dot" />;

const LabelTag = ({ children }) => (
  <div className="label-tag"><Dot />{children}</div>
);

const Section = ({ id, style, children }) => (
  <section id={id} style={{ padding:"96px clamp(20px,6vw,80px)", maxWidth:1140, margin:"0 auto", ...style }}>
    {children}
  </section>
);

const StatCard = ({ num, label, sub }) => (
  <div className="card card-sm" style={{ textAlign:"center" }}>
    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:40, color:T.accent, lineHeight:1 }}>{num}</div>
    <div style={{ fontSize:14, fontWeight:500, color:T.text, marginTop:8 }}>{label}</div>
    {sub && <div style={{ fontSize:12, color:T.muted, marginTop:4 }}>{sub}</div>}
  </div>
);

const FeatureCard = ({ icon, title, body, accent }) => (
  <div className="card" style={{ display:"flex", flexDirection:"column", gap:16 }}>
    <div style={{ width:42, height:42, borderRadius:10, background: accent === "pink" ? "#e05a8a22" : "#1bbd8a22",
      display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{icon}</div>
    <div>
      <div style={{ fontWeight:600, fontSize:15, marginBottom:6 }}>{title}</div>
      <div style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>{body}</div>
    </div>
  </div>
);

const StepRow = ({ n, title, body }) => (
  <div style={{ display:"flex", gap:20, paddingBottom:32,
    borderBottom:`1px solid ${T.border}`, marginBottom:32 }}>
    <div style={{ minWidth:36, height:36, borderRadius:"50%",
      border:`1px solid ${T.border2}`, display:"flex", alignItems:"center",
      justifyContent:"center", fontSize:13, color:T.muted, flexShrink:0 }}>{n}</div>
    <div>
      <div style={{ fontWeight:600, fontSize:15, marginBottom:4 }}>{title}</div>
      <div style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>{body}</div>
    </div>
  </div>
);

// ─── Marquee logos ────────────────────────────────────────────────────────────
const LOGOS = ["Epic","FHIR R4","HL7 v2","MIMIC-IV","NHS","NHANES","HIPAA","CE Mark","ISO 27001","FDA SaMD"];
const Marquee = () => {
  const items = [...LOGOS,...LOGOS];
  return (
    <div style={{ overflow:"hidden", borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`,
      padding:"18px 0", background:T.surface }}>
      <div style={{ display:"flex", gap:48, whiteSpace:"nowrap",
        animation:"marquee 22s linear infinite", width:"max-content" }}>
        {items.map((l,i) => (
          <span key={i} style={{ fontSize:13, color:T.faint, letterSpacing:".06em",
            textTransform:"uppercase", fontWeight:500 }}>{l}</span>
        ))}
      </div>
    </div>
  );
};

// ─── Nav ──────────────────────────────────────────────────────────────────────
const PAGES = ["Home","Solution","Business","Evidence","Funding","Team","Contact"];

const Nav = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: scrolled ? "rgba(8,8,8,.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
      transition:"all .3s" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)",
        height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        {/* Logo */}
        <button onClick={() => setPage("Home")} style={{ background:"none", border:"none",
          fontFamily:"'DM Serif Display',serif", fontSize:20, color:T.text,
          display:"flex", alignItems:"center", gap:2 }}>
          Her<span style={{ color:T.pink }}>Heart</span>
          <span style={{ fontSize:10, color:T.muted, fontFamily:"'DM Sans',sans-serif",
            fontWeight:500, marginLeft:6, letterSpacing:".1em", textTransform:"uppercase" }}>AI</span>
        </button>
        {/* Desktop links */}
        <div style={{ display:"flex", gap:4, alignItems:"center" }}>
          {PAGES.slice(0,-1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              style={{ background:"none", border:"none", fontSize:13, fontWeight:500,
                color: page===p ? T.text : T.muted, padding:"6px 12px", borderRadius:6,
                transition:"color .2s" }}>
              {p}
            </button>
          ))}
          <div style={{ width:1, height:18, background:T.border, margin:"0 8px" }} />
          <button className="btn-primary" style={{ padding:"8px 18px", fontSize:13 }}
            onClick={() => setPage("Contact")}>
            Book a call →
          </button>
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
    {/* Hero */}
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", textAlign:"center",
      padding:"120px clamp(20px,6vw,80px) 80px",
      background:`radial-gradient(ellipse 80% 60% at 50% -10%, #1bbd8a18 0%, transparent 70%)` }}>
      <div className="fade-up">
        <LabelTag>Clinical AI · Women's Cardiovascular Health · SaMD</LabelTag>
      </div>
      <h1 className="section-title fade-up fade-up-1"
        style={{ fontSize:"clamp(40px,6vw,76px)", maxWidth:780, margin:"0 auto 24px" }}>
        Closing the gender gap<br />in <em>cardiac diagnosis</em>
      </h1>
      <p className="fade-up fade-up-2"
        style={{ fontSize:17, color:T.muted, maxWidth:520, lineHeight:1.75, margin:"0 auto 36px" }}>
        HerHeart is an AI-powered CDSS that stratifies cardiovascular risk in women
        using sex-specific biomarkers that standard triage systematically misses.
      </p>
      <div className="fade-up fade-up-3" style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
        <button className="btn-primary" onClick={() => setPage("Contact")}>Request pilot access →</button>
        <button className="btn-ghost" onClick={() => setPage("Solution")}>See how it works</button>
      </div>
      <div className="fade-up fade-up-4"
        style={{ display:"flex", gap:24, marginTop:48, color:T.muted, fontSize:12,
          letterSpacing:".06em", textTransform:"uppercase" }}>
        {["HIPAA compliant","FHIR R4 API","FDA 510(k) pathway","GDPR ready"].map(t => (
          <span key={t} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ color:T.accent }}>✓</span>{t}
          </span>
        ))}
      </div>
    </div>

    <Marquee />

    {/* Problem stats */}
    <Section>
      <LabelTag>The problem</LabelTag>
      <h2 className="section-title" style={{ marginBottom:16 }}>
        Women are <span className="pink">misdiagnosed</span> every day
      </h2>
      <p style={{ color:T.muted, fontSize:15, maxWidth:560, marginBottom:48 }}>
        Standard cardiovascular risk models were trained predominantly on male cohorts.
        Women present differently — and current tools don't account for that.
      </p>
      <div className="grid-3" style={{ marginBottom:64 }}>
        <StatCard num="50%" label="Misdiagnosed at first ED visit" sub="Women with NSTEMI" />
        <StatCard num="3×" label="Higher in-hospital mortality" sub="vs men with same severity" />
        <StatCard num="7 yrs" label="Later first diagnosis" sub="vs male patients on average" />
      </div>
      <div className="grid-3">
        <FeatureCard icon="🫀" title="Real-time risk stratification"
          body="Low / intermediate / high risk score delivered in under 200ms at the moment of triage." />
        <FeatureCard icon="🧬" title="Female-specific biomarkers"
          body="Preeclampsia history, gestational diabetes, menopause age — factors standard tools ignore." accent="pink" />
        <FeatureCard icon="🔍" title="Explainable AI (XAI)"
          body="SHAP values per prediction. Clinicians see why, not just what — critical for regulatory adoption." />
      </div>
    </Section>

    <div className="divider" />

    {/* CTA strip */}
    <div style={{ padding:"64px clamp(20px,6vw,80px)", textAlign:"center",
      background:`radial-gradient(ellipse 60% 80% at 50% 100%, #e05a8a14 0%, transparent 70%)` }}>
      <h2 className="section-title" style={{ marginBottom:16 }}>
        Ready to pilot <em>HerHeart</em>?
      </h2>
      <p style={{ color:T.muted, marginBottom:32, fontSize:15 }}>
        We're onboarding 3 pilot hospitals in Q4 2026. Free integration, shared authorship on outcomes paper.
      </p>
      <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
        <button className="btn-primary" onClick={() => setPage("Contact")}>Book a discovery call →</button>
        <button className="btn-ghost" onClick={() => setPage("Business")}>View business plan</button>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: SOLUTION
// ═══════════════════════════════════════════════════════════════════════════════
const SolutionPage = () => (
  <div style={{ paddingTop:80 }}>
    <Section>
      <LabelTag>Technical solution</LabelTag>
      <h1 className="section-title" style={{ marginBottom:24 }}>
        An API that plugs into<br />any <em>EHR workflow</em>
      </h1>
      <p style={{ color:T.muted, fontSize:15, maxWidth:560, marginBottom:64 }}>
        HerHeart is a stateless JSON endpoint. The hospital calls it from inside their
        existing triage screen. The clinician never "opens HerHeart" — the score
        simply appears in the workflow they already use.
      </p>

      {/* Architecture visual */}
      <div className="card" style={{ marginBottom:48, padding:0, overflow:"hidden" }}>
        <div style={{ padding:"24px 28px", borderBottom:`1px solid ${T.border}` }}>
          <span style={{ fontSize:12, color:T.muted, letterSpacing:".06em", textTransform:"uppercase" }}>
            Integration architecture
          </span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr auto 1fr", gap:0,
          alignItems:"stretch", minHeight:180 }}>
          {[
            { label:"EHR / triage system", sub:"Epic · Cerner · local HIS", color:T.muted },
            { label:"→", isArrow:true },
            { label:"FHIR gateway", sub:"HL7 R4 · PHI de-id · audit log", color:T.accent },
            { label:"→", isArrow:true },
            { label:"HerHeart API", sub:"XGBoost · SHAP · drift monitor", color:T.pink },
          ].map((item, i) => (
            item.isArrow
              ? <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:20, color:T.faint, padding:"0 8px" }}>{item.label}</div>
              : <div key={i} style={{ padding:"28px 24px", borderRight: i < 4 ? `1px solid ${T.border}` : "none" }}>
                  <div style={{ fontSize:13, fontWeight:600, color:item.color, marginBottom:6 }}>{item.label}</div>
                  <div style={{ fontSize:12, color:T.muted }}>{item.sub}</div>
                </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${T.border}`, padding:"20px 28px",
          background:"#0d0d0d", fontFamily:"monospace", fontSize:12, color:"#5dcaa5" }}>
          POST /v1/score  →  {"{ risk_tier: 'high', confidence: 0.91, shap: [{...}] }"}
        </div>
      </div>

      {/* How it works steps */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"start" }}>
        <div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, marginBottom:32 }}>
            How it works
          </h2>
          {[
            ["01","Patient arrives at ED or primary care","Triage staff input current symptoms. HerHeart auto-pulls historical obstetric and cardiac data via FHIR from the hospital EHR — no manual data entry."],
            ["02","Model scores in real time","XGBoost ensemble ingests 40+ female-specific features. SHAP values explain each prediction. Drift monitoring flags when data distribution shifts."],
            ["03","Risk tier appears in the triage screen","Low / intermediate / high + top contributing factors appear inside Epic or Cerner. The clinician decides — HerHeart supports, never replaces."],
          ].map(([n,t,b]) => <StepRow key={n} n={n} title={t} body={b} />)}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            ["Female-specific features","Preeclampsia, gestational diabetes, menopause age, HRT status, parity"],
            ["Standard cardiac features","BP, cholesterol, troponin, ECG findings, smoking, diabetes, age"],
            ["Model output","Risk tier (3-class) + calibrated probability + ranked SHAP features"],
            ["Latency","< 200ms synchronous · async webhook mode for batch scoring"],
            ["Compliance","HIPAA BAA ready · GDPR Art.9 · CE SaMD pathway · FDA 510(k)"],
            ["EHR support","Epic SMART on FHIR · Cerner CDS Hooks · HL7 v2 ADT events"],
          ].map(([k,v]) => (
            <div key={k} className="card card-sm"
              style={{ display:"flex", flexDirection:"column", gap:4 }}>
              <div style={{ fontSize:11, color:T.accent, textTransform:"uppercase",
                letterSpacing:".06em", fontWeight:600 }}>{k}</div>
              <div style={{ fontSize:13, color:T.muted }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: BUSINESS PLAN
// ═══════════════════════════════════════════════════════════════════════════════
const BusinessPage = () => {
  const years = ["Y1","Y2","Y3","Y4","Y5"];
  const revenue = [0,120,500,1800,4500];
  const costs   = [380,400,600,1600,3300];
  const maxVal  = 4500;
  return (
    <div style={{ paddingTop:80 }}>
      <Section>
        <LabelTag>Business plan · 2026–2030</LabelTag>
        <h1 className="section-title" style={{ marginBottom:24 }}>
          A scalable SaaS model<br />for <em>clinical AI</em>
        </h1>
        <p style={{ color:T.muted, fontSize:15, maxWidth:560, marginBottom:64 }}>
          HerHeart operates as a per-hospital SaaS subscription. Pricing scales with
          ED volume. Revenue-share channel deals unlock exponential distribution from year 3.
        </p>

        {/* Revenue model cards */}
        <div className="grid-3" style={{ marginBottom:48 }}>
          {[
            ["Subscription","€3k–15k / month per hospital site, tiered by ED annual patient volume"],
            ["Channel reseller","20–35% rev-share with Philips, Siemens, or Epic App Orchard from Y3"],
            ["Value-based pilot","Free 3-month pilot → paid contract on measurable triage improvement"],
          ].map(([t,b]) => (
            <div key={t} className="card">
              <div style={{ fontSize:11, color:T.accent, textTransform:"uppercase",
                letterSpacing:".06em", fontWeight:600, marginBottom:10 }}>{t}</div>
              <div style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>{b}</div>
            </div>
          ))}
        </div>

        {/* 5-year chart */}
        <div className="card" style={{ marginBottom:48 }}>
          <div style={{ borderBottom:`1px solid ${T.border}`, padding:"16px 24px",
            display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:13, fontWeight:600 }}>5-year P&L projection</span>
            <div style={{ display:"flex", gap:16, fontSize:12, color:T.muted }}>
              <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:12, height:3, background:T.accent, display:"inline-block", borderRadius:2 }}/>
                Revenue (€k)
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:12, height:3, background:T.pink, display:"inline-block", borderRadius:2 }}/>
                Costs (€k)
              </span>
            </div>
          </div>
          <div style={{ padding:"28px 24px" }}>
            <div style={{ display:"flex", gap:16, alignItems:"flex-end", height:200 }}>
              {years.map((y, i) => (
                <div key={y} style={{ flex:1, display:"flex", flexDirection:"column",
                  alignItems:"center", gap:8, height:"100%" }}>
                  <div style={{ flex:1, display:"flex", flexDirection:"column",
                    justifyContent:"flex-end", gap:4, width:"100%" }}>
                    <div style={{ background:T.pink, borderRadius:"4px 4px 0 0",
                      height: `${(costs[i]/maxVal)*160}px`,
                      opacity:.7, transition:"height .5s" }} />
                    <div style={{ background:T.accent, borderRadius:"4px 4px 0 0",
                      height: `${(revenue[i]/maxVal)*160}px`,
                      marginTop:-((costs[i]/maxVal)*160),
                      transition:"height .5s" }} />
                  </div>
                  <div style={{ fontSize:12, color:T.muted }}>{y}</div>
                  <div style={{ fontSize:11, color:T.accent }}>€{revenue[i]}k</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phase timeline */}
        <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, marginBottom:24 }}>
          Growth phases
        </h2>
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {[
            ["2026","Pre-revenue — validation","FDA 510(k) filing · IRB retrospective study · pilot hospital signed · €380k burn · seed round raise"],
            ["2027","Pilot revenue — €120k ARR","2–3 paying pilot hospitals · validation paper submitted · CE mark pathway started"],
            ["2028","Early scale — €500k ARR","10 hospitals · first reseller MOU · Series A prep · break-even on horizon"],
            ["2029–30","Scale — €1.8M–4.5M ARR","30+ hospitals · Epic App Orchard listing · U.S. + EU markets active · profitable"],
          ].map(([yr,title,body], i) => (
            <div key={yr} style={{ display:"grid", gridTemplateColumns:"100px 1fr",
              gap:24, padding:"24px 0", borderBottom:`1px solid ${T.border}` }}>
              <div style={{ fontSize:13, color:T.accent, fontWeight:600, paddingTop:2 }}>{yr}</div>
              <div>
                <div style={{ fontWeight:600, fontSize:15, marginBottom:4 }}>{title}</div>
                <div style={{ fontSize:13, color:T.muted }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: EVIDENCE
// ═══════════════════════════════════════════════════════════════════════════════
const EvidencePage = () => (
  <div style={{ paddingTop:80 }}>
    <Section>
      <LabelTag>Clinical evidence &amp; validation</LabelTag>
      <h1 className="section-title" style={{ marginBottom:24 }}>
        Built on peer-reviewed<br /><em>clinical science</em>
      </h1>
      <p style={{ color:T.muted, fontSize:15, maxWidth:560, marginBottom:64 }}>
        HerHeart's model architecture draws on published evidence for sex-specific
        cardiovascular risk factors and has been designed for multi-stage clinical validation.
      </p>

      {/* Evidence cards */}
      <div className="grid-2" style={{ marginBottom:48 }}>
        {[
          ["Training datasets","MIMIC-IV · NHANES · Women's Health Initiative (WHI) · Nurses' Health Study — ensuring a diverse female cohort from day one."],
          ["Validation plan","Phase 1: retrospective AUC-ROC, sensitivity, NPV, calibration. Phase 2: prospective pilot with real triage comparison vs standard clinical assessment."],
          ["Explainability","SHAP values per inference. Feature importance ranked for clinicians. Audit trail for every prediction — essential for regulatory review and malpractice defense."],
          ["Drift monitoring","Continuous data drift and concept drift detection. Alerts when demographic shifts or new treatment protocols alter the model's input distribution."],
        ].map(([t,b]) => (
          <div key={t} className="card">
            <div style={{ fontSize:11, color:T.accent, textTransform:"uppercase",
              letterSpacing:".06em", fontWeight:600, marginBottom:10 }}>{t}</div>
            <div style={{ fontSize:13, color:T.muted, lineHeight:1.75 }}>{b}</div>
          </div>
        ))}
      </div>

      {/* KPIs */}
      <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, marginBottom:24 }}>
        Target performance metrics
      </h2>
      <div className="grid-3">
        {[
          ["AUC-ROC","> 0.82","Discrimination across 3 risk tiers"],
          ["Sensitivity","> 90%","High-risk class — critical for acute care"],
          ["NPV","> 96%","Low-risk class — safe discharge threshold"],
          ["Calibration","Hosmer-Lemeshow","Probability reliability across cohorts"],
          ["Latency","< 200ms","Synchronous triage-ready response"],
          ["Drift alert","< 2% monthly","Model performance degradation threshold"],
        ].map(([m,v,d]) => (
          <div key={m} className="card card-sm">
            <div style={{ fontSize:11, color:T.muted, textTransform:"uppercase",
              letterSpacing:".06em", marginBottom:6 }}>{m}</div>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:28,
              color:T.accent, marginBottom:4 }}>{v}</div>
            <div style={{ fontSize:12, color:T.faint }}>{d}</div>
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
  <div style={{ paddingTop:80 }}>
    <Section>
      <LabelTag>Funding &amp; investment opportunity</LabelTag>
      <h1 className="section-title" style={{ marginBottom:24 }}>
        Seeking <em>€800k</em> seed<br />round · Q3 2026
      </h1>
      <p style={{ color:T.muted, fontSize:15, maxWidth:560, marginBottom:64 }}>
        We are raising a seed round to fund FDA 510(k) filing, our first clinical
        pilot, and two senior ML engineering hires. We have active non-dilutive
        applications running in parallel.
      </p>

      {/* Use of funds */}
      <div className="grid-2" style={{ marginBottom:48 }}>
        <div className="card">
          <div style={{ fontSize:13, fontWeight:600, marginBottom:20 }}>Use of funds</div>
          {[
            ["FDA 510(k) + regulatory","€180k","22%"],
            ["ML engineering (×2 hires)","€280k","35%"],
            ["EHR integration layer","€120k","15%"],
            ["Clinical pilot costs","€80k","10%"],
            ["Legal / IP / patents","€80k","10%"],
            ["Operations / runway","€60k","8%"],
          ].map(([label, amt, pct]) => (
            <div key={label} style={{ display:"flex", justifyContent:"space-between",
              padding:"10px 0", borderBottom:`1px solid ${T.border}`, fontSize:13 }}>
              <span style={{ color:T.muted }}>{label}</span>
              <span style={{ display:"flex", gap:16 }}>
                <span style={{ color:T.text }}>{amt}</span>
                <span style={{ color:T.faint, minWidth:32, textAlign:"right" }}>{pct}</span>
              </span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div className="card" style={{ borderColor:`${T.accent}44` }}>
            <div style={{ fontSize:11, color:T.accent, textTransform:"uppercase",
              letterSpacing:".06em", fontWeight:600, marginBottom:8 }}>Non-dilutive (in progress)</div>
            <div style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>
              CDTI R&D loan (Spain) · EIC Accelerator Phase 1 ·
              NIH SBIR Phase I (U.S.) · Horizon Europe Health Cluster
            </div>
          </div>
          <div className="card">
            <div style={{ fontSize:11, color:T.accent, textTransform:"uppercase",
              letterSpacing:".06em", fontWeight:600, marginBottom:8 }}>Target investors</div>
            <div style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>
              HealthTech VCs (Asabys Partners, Forbion, Sofinnova) ·
              Hospital corporate venture arms · Angels with cardiology background
            </div>
          </div>
          <div className="card">
            <div style={{ fontSize:11, color:T.pink, textTransform:"uppercase",
              letterSpacing:".06em", fontWeight:600, marginBottom:8 }}>What investors get</div>
            <div style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>
              Equity stake · Board observer seat · Co-investment rights on Series A ·
              First-mover in a $12B gender-health AI market
            </div>
          </div>
          <div className="card">
            <div style={{ fontSize:11, color:T.muted, textTransform:"uppercase",
              letterSpacing:".06em", fontWeight:600, marginBottom:8 }}>IP protection</div>
            <div style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>
              Provisional U.S. patent filed · Proprietary female-feature pipeline ·
              Data flywheel moat via hospital BAAs
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, marginBottom:24 }}>
        Post-funding milestones
      </h2>
      <div className="grid-3">
        {[
          ["Month 3","First pilot hospital signed. Retrospective validation dataset secured under IRB."],
          ["Month 6","Validation results submitted to peer-review journal. FDA 510(k) pre-submission meeting."],
          ["Month 12","Prospective pilot live. €120k ARR. CE mark technical file complete."],
        ].map(([m,b]) => (
          <div key={m} className="card card-sm">
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22,
              color:T.accent, marginBottom:8 }}>{m}</div>
            <div style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>{b}</div>
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
  <div style={{ paddingTop:80 }}>
    <Section>
      <LabelTag>The team</LabelTag>
      <h1 className="section-title" style={{ marginBottom:24 }}>
        Built by people who understand<br />both <em>medicine and data</em>
      </h1>
      <p style={{ color:T.muted, fontSize:15, maxWidth:560, marginBottom:64 }}>
        Our founding team combines health data science, clinical cardiology, and
        regulatory expertise — the exact skills a SaMD startup needs to move fast and safely.
      </p>
      <div className="grid-3" style={{ marginBottom:64 }}>
        {[
          ["Founder / CEO","Health Data Science & Bioinformatics (MSc). Background in software engineering and ML. Led the original HerHeart research concept.","CEO · Strategy · Fundraising"],
          ["Chief Medical Officer","Cardiologist with 15 years ED experience. Led women's cardiac health research at Hospital Clínic Barcelona. Clinical validation lead.","CMO · Clinical validation · KOL"],
          ["Head of ML Engineering","PhD in Applied ML. Former researcher at MIMIC-IV dataset team. Leads model architecture, SHAP pipeline, and drift monitoring.","CTO · Model · Infrastructure"],
          ["Regulatory Affairs","Specialist in EU MDR and FDA SaMD. Previously led CE mark submission for two Class IIa devices. Owns the 510(k) filing.","Regulatory · Compliance · Legal"],
          ["Clinical Advisor","Professor of Cardiology, University of Barcelona. Co-author on 40+ peer-reviewed cardiovascular papers. Scientific board member.","Advisor · Scientific board"],
          ["Strategic Advisor","Former VP of Digital Health at Philips Healthtech. Deep hospital C-suite network across Spain, Germany, and the UK.","Advisor · Business development"],
        ].map(([role, bio, tags]) => (
          <div key={role} className="card">
            <div style={{ width:44, height:44, borderRadius:"50%",
              background:`${T.accent}22`, border:`1px solid ${T.accent}44`,
              marginBottom:14 }} />
            <div style={{ fontSize:11, color:T.accent, textTransform:"uppercase",
              letterSpacing:".06em", fontWeight:600, marginBottom:6 }}>{role}</div>
            <div style={{ fontSize:13, color:T.muted, lineHeight:1.7, marginBottom:12 }}>{bio}</div>
            <div style={{ fontSize:11, color:T.faint }}>{tags}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ background:`${T.accent}0a`, borderColor:`${T.accent}33`,
        textAlign:"center", padding:"40px 32px" }}>
        <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, marginBottom:12 }}>
          We're hiring
        </h2>
        <p style={{ color:T.muted, fontSize:14, marginBottom:24, maxWidth:420, margin:"0 auto 24px" }}>
          Open roles: Senior ML Engineer (FHIR/healthcare), Clinical Data Scientist,
          Hospital Partnerships Manager (DACH region).
        </p>
        <button className="btn-ghost">View open roles →</button>
      </div>
    </Section>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: CONTACT
// ═══════════════════════════════════════════════════════════════════════════════
const ContactPage = () => {
  const [type, setType] = useState("Hospital / Clinic");
  const [sent, setSent] = useState(false);
  const types = ["Hospital / Clinic","Investor / VC","Clinical advisor","Press / Media","Other"];
  return (
    <div style={{ paddingTop:80 }}>
      <Section style={{ maxWidth:780 }}>
        <LabelTag>Get in touch</LabelTag>
        <h1 className="section-title" style={{ marginBottom:24 }}>
          Let's talk about<br />piloting <em>HerHeart</em>
        </h1>
        <p style={{ color:T.muted, fontSize:15, marginBottom:48 }}>
          Whether you're a hospital considering a pilot, an investor evaluating the opportunity,
          or a cardiologist interested in the science — we respond within 48 hours.
        </p>

        {sent ? (
          <div className="card" style={{ textAlign:"center", padding:"56px 32px",
            borderColor:`${T.accent}44` }}>
            <div style={{ fontSize:36, marginBottom:16 }}>✓</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:28,
              color:T.accent, marginBottom:12 }}>Message received</h2>
            <p style={{ color:T.muted, fontSize:14 }}>
              We'll be in touch within 48 hours. Check your inbox (and spam folder).
            </p>
          </div>
        ) : (
          <div className="card">
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                {[["Name","Your name"],["Organisation","Hospital / Fund / Institution"]].map(([label,ph]) => (
                  <div key={label}>
                    <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>{label}</div>
                    <input placeholder={ph}
                      style={{ width:"100%", background:T.bg, border:`1px solid ${T.border2}`,
                        borderRadius:8, padding:"10px 14px", color:T.text, fontSize:13,
                        outline:"none" }} />
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>Email</div>
                <input type="email" placeholder="you@institution.org"
                  style={{ width:"100%", background:T.bg, border:`1px solid ${T.border2}`,
                    borderRadius:8, padding:"10px 14px", color:T.text, fontSize:13, outline:"none" }} />
              </div>
              <div>
                <div style={{ fontSize:12, color:T.muted, marginBottom:8 }}>I am a…</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {types.map(t => (
                    <button key={t} onClick={() => setType(t)}
                      style={{ padding:"7px 14px", borderRadius:20, fontSize:12, fontWeight:500,
                        border:`1px solid ${type===t ? T.accent : T.border2}`,
                        background: type===t ? `${T.accent}18` : "transparent",
                        color: type===t ? T.accent : T.muted, transition:"all .15s" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize:12, color:T.muted, marginBottom:6 }}>Message</div>
                <textarea rows={4} placeholder="Tell us about your situation and what you're looking for…"
                  style={{ width:"100%", background:T.bg, border:`1px solid ${T.border2}`,
                    borderRadius:8, padding:"10px 14px", color:T.text, fontSize:13,
                    outline:"none", resize:"vertical" }} />
              </div>
              <button className="btn-primary" style={{ alignSelf:"flex-start" }}
                onClick={() => setSent(true)}>
                Send message →
              </button>
            </div>
          </div>
        )}

        <div className="grid-3" style={{ marginTop:32 }}>
          {[
            ["Email","hello@herheart.ai"],
            ["Based in","Madrid, Spain · EU"],
            ["Response","Within 48 hours"],
          ].map(([k,v]) => (
            <div key={k} style={{ textAlign:"center", padding:20 }}>
              <div style={{ fontSize:11, color:T.muted, textTransform:"uppercase",
                letterSpacing:".06em", marginBottom:4 }}>{k}</div>
              <div style={{ fontSize:13, color:T.text }}>{v}</div>
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
  <footer style={{ borderTop:`1px solid ${T.border}`, padding:"48px clamp(20px,6vw,80px)",
    maxWidth:1140, margin:"0 auto" }}>
    <div style={{ display:"flex", justifyContent:"space-between",
      alignItems:"flex-start", flexWrap:"wrap", gap:32, marginBottom:40 }}>
      <div>
        <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22,
          marginBottom:8 }}>
          Her<span style={{ color:T.pink }}>Heart</span>
          <span style={{ fontSize:10, color:T.muted, fontFamily:"'DM Sans',sans-serif",
            fontWeight:500, marginLeft:6, letterSpacing:".1em" }}>AI</span>
        </div>
        <div style={{ fontSize:13, color:T.muted, maxWidth:260, lineHeight:1.7 }}>
          AI-powered cardiovascular decision support for women. FHIR-native, explainable, clinician-first.
        </div>
      </div>
      <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>
        {[["Product",["Solution","Evidence","Pricing"]],
          ["Company",["Business","Team","Funding"]],
          ["Contact",["Book a call","hello@herheart.ai","Press kit"]],
        ].map(([group, links]) => (
          <div key={group}>
            <div style={{ fontSize:11, color:T.muted, textTransform:"uppercase",
              letterSpacing:".06em", marginBottom:12 }}>{group}</div>
            {links.map(l => (
              <div key={l} style={{ marginBottom:8 }}>
                <span onClick={() => setPage(l.replace(" a call","Contact").replace("hello@herheart.ai","Contact"))}
                  style={{ fontSize:13, color:T.faint, cursor:"pointer",
                    transition:"color .15s" }}
                  onMouseEnter={e => e.target.style.color=T.text}
                  onMouseLeave={e => e.target.style.color=T.faint}>{l}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:24,
      display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
      <span style={{ fontSize:12, color:T.faint }}>© 2026 HerHeart AI SL · Madrid, Spain</span>
      <span style={{ fontSize:12, color:T.faint }}>GDPR compliant · HIPAA ready · CE SaMD pathway</span>
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
      case "Business": return <BusinessPage />;
      case "Evidence": return <EvidencePage />;
      case "Funding":  return <FundingPage />;
      case "Team":     return <TeamPage />;
      case "Contact":  return <ContactPage />;
      default:         return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ background:T.bg, minHeight:"100vh" }}>
      <Nav page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
