import { LabelTag, Section } from "../components/common";
import { T } from "../site/tokens";

export default function EvidencePage() {
  return (
    <div style={{ paddingTop: 58 }}>
      <div style={{ background: T.navBg, padding: "52px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <LabelTag>Clinical evidence &amp; validation</LabelTag>
          <h1 className="section-title" style={{ color: "#fff", marginBottom: 16 }}>
            Built on peer-reviewed<br /><em>cardiovascular science</em>
          </h1>
        </div>
      </div>
      <Section>
        <div className="grid-2" style={{ marginBottom: 40 }}>
          {[["Training datasets", "MIMIC-IV · NHANES · Women's Health Initiative (WHI) · Nurses' Health Study — validated outcomes labels on a diverse female cohort."], ["Validation plan", "Phase 1: retrospective AUC-ROC, sensitivity, specificity, NPV, calibration. Phase 2: prospective pilot comparing HerNextBeat vs standard clinical triage."], ["Explainability (XAI)", "SHAP values per inference. Feature importance ranked for clinicians. Full audit trail per prediction — required for FDA 510(k) and malpractice defense."], ["Drift monitoring", "Continuous data and concept drift detection. Alerts when demographic shifts or new treatment protocols alter model input distributions."]].map(([title, body]) => (
            <div key={title} className="card">
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: T.teal, marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>{body}</div>
            </div>
          ))}
        </div>
        <h2 className="section-title" style={{ fontSize: 26, marginBottom: 20 }}>Target performance metrics</h2>
        <div className="grid-3">
          {[["AUC-ROC", "> 0.82", "Discrimination — 3 risk tiers"], ["Sensitivity", "> 90%", "High-risk class — acute care"], ["NPV", "> 96%", "Low-risk — safe discharge"], ["Calibration", "H-L test p > 0.05", "Probability reliability"], ["Latency", "< 200 ms", "Synchronous triage response"], ["Drift alert", "< 2% / month", "Performance degradation threshold"]].map(([metric, value, description]) => (
            <div key={metric} className="card card-sm">
              <div style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>{metric}</div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: 28, color: T.teal, marginBottom: 3, fontWeight: 500 }}>{value}</div>
              <div style={{ fontSize: 11, color: T.textFaint }}>{description}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}