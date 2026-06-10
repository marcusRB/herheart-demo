export const T = {
  bg: "#F7F8FA",
  surface: "#FFFFFF",
  surfaceAlt: "#EEF2F7",
  navBg: "#0D1F3C",

  navy: "#0D1F3C",
  navyMid: "#1A3560",
  navyLight: "#2B5192",

  teal: "#0E7C86",
  tealLight: "#1BA3B0",
  tealFaint: "#E0F4F6",

  rose: "#B5446E",
  roseMid: "#C9567F",
  roseFaint: "#FAEEF3",

  amber: "#B06E00",
  amberFaint: "#FFF4E0",

  danger: "#C0392B",
  dangerFaint: "#FDEDEC",
  success: "#1A7A4A",
  successFaint: "#E8F6EE",

  text: "#0D1F3C",
  textMid: "#3D5475",
  textMuted: "#7A8FA8",
  textFaint: "#B0BEC8",

  border: "#D8E3EE",
  border2: "#C2D1E0",

  ehrBg: "#102040",
  ehrBorder: "#1E3A5F",
  ehrText: "#C8D8F0",
};

export const GLOBAL_CSS = `
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

export const PAGES = [
  "Home",
  "Solution",
  "Demo",
  "Business",
  "Stress Test",
  "Evidence",
  "Funding",
  "Team",
  "Contact",
];

export const LOGOS = [
  "Epic",
  "Cerner",
  "FHIR R4",
  "HL7 v2",
  "MIMIC-IV",
  "NHS",
  "NHANES",
  "HIPAA",
  "CE Mark",
  "ISO 27001",
  "FDA SaMD",
  "IHE XDS",
];