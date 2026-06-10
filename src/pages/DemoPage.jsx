import { EmbeddedHtmlFrame, Section } from "../components/common";
import { HERHEART_EHR_FULL_DEMO_SRCDOC } from "../site/embedded";
import { T } from "../site/tokens";

export default function DemoPage({ setPage }) {
  return (
    <div style={{ paddingTop: 58 }}>
      <div style={{ background: T.navBg, padding: "32px clamp(20px,5vw,72px) 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 600, marginBottom: 6 }}>Interactive clinical demo</div>
            <h1 style={{ fontFamily: "'Lora',serif", fontSize: "clamp(22px,2.5vw,32px)", color: "#fff", fontWeight: 500, letterSpacing: "-.01em", marginBottom: 6 }}>
              HerNextBeat — Full EHR Workflow Simulation
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", maxWidth: 640, lineHeight: 1.8 }}>
              The existing live demo has been replaced with the full multi-tab EHR prototype,
              including triage, patient history, orders, notes, and imaging inside a single embedded workflow.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn-secondary" style={{ fontSize: 12, padding: "8px 16px" }} onClick={() => setPage("Solution")}>Technical docs</button>
            <button className="btn-primary" style={{ fontSize: 12, padding: "8px 16px" }} onClick={() => setPage("Contact")}>Request integration →</button>
          </div>
        </div>
      </div>

      <Section style={{ maxWidth: 1200, paddingTop: 32 }}>
        <div className="card" style={{ padding: 16, overflow: "hidden" }}>
          <EmbeddedHtmlFrame title="HerNextBeat full EHR clinical demo" srcDoc={HERHEART_EHR_FULL_DEMO_SRCDOC} minHeight={1400} />
        </div>
      </Section>

      <div style={{ background: T.surfaceAlt, borderTop: `1px solid ${T.border}`, padding: "48px clamp(20px,5vw,72px)", textAlign: "center" }}>
        <h2 className="section-title" style={{ fontSize: 26, marginBottom: 12 }}>
          Ready to integrate HerNextBeat into your ED?
        </h2>
        <p style={{ color: T.textMid, fontSize: 14, maxWidth: 520, margin: "0 auto 24px", lineHeight: 1.8 }}>
          This embedded prototype mirrors a fuller clinical workflow. The production integration still connects via FHIR R4
          and returns results inside your clinicians&apos; existing environment.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => setPage("Contact")}>Request a pilot →</button>
          <button className="btn-secondary" onClick={() => setPage("Solution")}>Technical architecture</button>
        </div>
      </div>
    </div>
  );
}