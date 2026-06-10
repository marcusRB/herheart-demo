import { Divider, LabelTag, Marquee, Section, StatCard } from "../components/common";
import { T } from "../site/tokens";

export default function HomePage({ setPage }) {
  return (
    <div>
      <div style={{ paddingTop: 58 }}>
        <div style={{ background: `linear-gradient(135deg, ${T.navBg} 0%, ${T.navyMid} 100%)`, padding: "80px clamp(20px,5vw,72px) 72px", textAlign: "center" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,124,134,.25)", border: "1px solid rgba(14,124,134,.5)", borderRadius: 20, padding: "5px 16px", marginBottom: 24, fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#7FD8E0" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7FD8E0", animation: "pulse 2s ease infinite", display: "inline-block" }} />
              B2B Clinical AI · Hospital &amp; Health System Platform · SaMD
            </div>
            <h1 className="fade-up d1" style={{ fontFamily: "'Lora',serif", fontSize: "clamp(32px,4.5vw,58px)", lineHeight: 1.18, color: "#fff", fontWeight: 500, marginBottom: 20, letterSpacing: "-.02em" }}>
              Closing the gender gap<br />in cardiovascular <span style={{ color: "#F0A0C0", fontStyle: "italic" }}>triage</span>
            </h1>
            <p className="fade-up d2" style={{ fontSize: 16, color: "rgba(255,255,255,.65)", lineHeight: 1.75, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
              HerNextBeat is an AI-powered Clinical Decision Support System for hospitals and emergency departments —
              integrating female-specific cardiovascular biomarkers that standard protocols miss.
            </p>
            <div className="fade-up d3" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
              <button className="btn-primary" onClick={() => setPage("Contact")} style={{ fontSize: 14, padding: "12px 28px" }}>
                Request a pilot →
              </button>
              <button onClick={() => setPage("Demo")} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.08)", color: "#fff", fontWeight: 500, fontSize: 14, padding: "11px 24px", borderRadius: 7, border: "1px solid rgba(255,255,255,.2)", cursor: "pointer", transition: "all .2s" }}>
                ▶ See live demo
              </button>
            </div>
            <div className="fade-up d4" style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap", fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: ".07em", textTransform: "uppercase" }}>
              {["HIPAA compliant", "FHIR R4 API", "FDA 510(k) pathway", "CE SaMD pathway", "GDPR ready"].map((text) => (
                <span key={text} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ color: "#7FD8E0", fontSize: 12 }}>✓</span>{text}
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
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              A decision-support layer,<br />not a replacement
            </h2>
            <p style={{ color: T.textMid, fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
              HerNextBeat plugs into your existing EHR and triage workflow via FHIR R4 API.
              Your clinicians see a risk score — low, intermediate, or high — directly
              inside Epic or Cerner. No new software to learn. No workflow disruption.
            </p>
            <p style={{ color: T.textMid, fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
              The system is designed for hospital procurement, not individual subscriptions.
              One integration, institution-wide deployment.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => setPage("Solution")}>Technical overview</button>
              <button className="btn-secondary" onClick={() => setPage("Demo")}>▶ Try the demo</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[["🏥", "Hospital deployment", "Single FHIR integration. Deployed institution-wide. Works across all EDs and primary care units on the same contract."], ["⚕️", "Clinician-first design", "Risk score and SHAP explanations appear inside the clinician's existing triage screen. Zero learning curve."], ["📋", "Regulatory ready", "FDA 510(k) pathway active. CE SaMD class IIa. Full HIPAA BAA. GDPR Art.9 compliant. Audit trail on every inference."]].map(([icon, title, body]) => (
              <div key={title} className="card card-sm" style={{ display: "flex", gap: 14 }}>
                <div style={{ fontSize: 22, flexShrink: 0, paddingTop: 2 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: T.navy, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.7 }}>{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      <Section style={{ background: T.surfaceAlt, maxWidth: "100%", padding: "72px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <LabelTag>The clinical gap we close</LabelTag>
            <h2 className="section-title">
              Women are systematically <span className="rose">underdiagnosed</span>
            </h2>
            <p style={{ color: T.textMid, fontSize: 15, maxWidth: 520, margin: "12px auto 0", lineHeight: 1.8 }}>
              Standard cardiovascular risk models were trained predominantly on male cohorts.
              This is a patient safety issue — and a liability issue for your institution.
            </p>
          </div>
          <div className="grid-3" style={{ marginBottom: 48 }}>
            <StatCard num="50%" label="Misdiagnosed at first ED visit" sub="Women presenting with NSTEMI" />
            <StatCard num="3×" label="Higher in-hospital mortality" sub="vs men with equivalent severity" />
            <StatCard num="7 yrs" label="Later first diagnosis" sub="Average gap vs male patients" />
          </div>
          <div className="grid-3">
            {[["Preeclampsia history", "Doubles lifetime CVD risk. Absent from TIMI, HEART, and Grace scores."], ["Early menopause", "Menopause before 45 = significant independent CVD risk factor. Ignored in triage."], ["Gestational diabetes", "10× higher risk of type 2 DM and CVD. Never captured in acute risk tools."]].map(([title, body]) => (
              <div key={title} className="card" style={{ borderTop: `3px solid ${T.rose}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: T.rose, marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      <Section style={{ textAlign: "center" }}>
        <LabelTag>Pilot programme — Q4 2026</LabelTag>
        <h2 className="section-title" style={{ marginBottom: 16 }}>
          3 pilot hospital slots available
        </h2>
        <p style={{ color: T.textMid, fontSize: 15, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.8 }}>
          Free integration for 3 months. Shared authorship on the outcomes paper.
          Dedicated clinical implementation support.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => setPage("Contact")}>Apply for a pilot slot →</button>
          <button className="btn-secondary" onClick={() => setPage("Business")}>View business case</button>
        </div>
      </Section>
    </div>
  );
}