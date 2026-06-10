import { LabelTag, Section } from "../components/common";
import { T } from "../site/tokens";

export default function SolutionPage() {
  return (
    <div style={{ paddingTop: 58 }}>
      <div style={{ background: T.navBg, padding: "52px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <LabelTag>Technical solution</LabelTag>
          <h1 className="section-title" style={{ color: "#fff", marginBottom: 16 }}>
            An API that plugs into any<br /><em>hospital EHR workflow</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, maxWidth: 520, lineHeight: 1.8 }}>
            HerNextBeat is not a standalone app. It is a stateless clinical intelligence endpoint
            that hospitals call from inside Epic, Cerner, or any HL7-compliant system.
          </p>
        </div>
      </div>
      <Section>
        <div className="card" style={{ marginBottom: 40, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: ".08em" }}>Integration architecture</span>
            <span style={{ fontSize: 11, color: T.teal }}>FHIR R4 · HL7 v2 · CDS Hooks</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr" }}>
            {[
              { label: "EHR / triage system", sub: "Epic · Cerner · local HIS", color: T.textMid },
              { arrow: true },
              { label: "FHIR gateway", sub: "HL7 R4 · PHI de-id · audit log", color: T.teal },
              { arrow: true },
              { label: "HerNextBeat API", sub: "XGBoost · SHAP · drift monitor", color: T.rose },
            ].map((item, index) => item.arrow ? (
              <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: T.border2, padding: "0 8px" }}>→</div>
            ) : (
              <div key={index} style={{ padding: "24px 20px", borderRight: index < 4 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: item.color, marginBottom: 5 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: T.textMuted }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${T.border}`, padding: "14px 24px", background: T.navBg, fontFamily: "monospace", fontSize: 11, color: "#5dcaa5" }}>
            POST /v1/score → {"{ risk_tier: 'high', confidence: 0.91, shap: [{feature:'preeclampsia_hx', value:0.34}] }"}
          </div>
        </div>
        <div className="layout-two layout-two-start" style={{ gap: 48 }}>
          <div>
            <h2 className="section-title" style={{ fontSize: 28, marginBottom: 28 }}>How it works in the ED</h2>
            {[["01", "Patient arrives at ED or primary care", "Triage staff input current symptoms. HerNextBeat auto-pulls historical obstetric and cardiac data via FHIR from the hospital EHR — no manual data entry required."], ["02", "Model scores in real time", "XGBoost ensemble ingests 41 female-specific features. SHAP values explain each prediction. Drift monitoring flags when data distributions shift — essential for long-term accuracy."], ["03", "Risk tier appears in the triage screen", "Low / intermediate / high + top contributing factors appear inside Epic or Cerner. The clinician decides — HerNextBeat supports, never replaces clinical judgement."]].map(([number, title, body]) => (
              <div key={number} style={{ display: "flex", gap: 16, paddingBottom: 24, borderBottom: `1px solid ${T.border}`, marginBottom: 24 }}>
                <div style={{ minWidth: 32, height: 32, borderRadius: "50%", border: `1.5px solid ${T.border2}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: T.textMuted, flexShrink: 0 }}>{number}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: T.navy, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>{body}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[["Female-specific features", "Preeclampsia hx, gestational DM, menopause age, HRT status, parity — 12 sex-specific inputs", "teal"], ["Standard cardiac features", "BP, cholesterol, troponin, ECG findings, smoking, diabetes, age, family history", "teal"], ["Model output", "Risk tier (3-class) + calibrated probability + ranked SHAP feature weights", "teal"], ["Latency", "< 200ms synchronous · async webhook mode available for batch scoring", "teal"], ["Compliance", "HIPAA BAA ready · GDPR Art.9 · CE SaMD class IIa · FDA 510(k) pathway", "rose"], ["EHR support", "Epic SMART on FHIR · Cerner CDS Hooks · HL7 v2 ADT · IHE XDS", "rose"]].map(([key, value, accent]) => (
              <div key={key} className="card card-sm">
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: accent === "rose" ? T.rose : T.teal, marginBottom: 4 }}>{key}</div>
                <div style={{ fontSize: 12, color: T.textMid }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}