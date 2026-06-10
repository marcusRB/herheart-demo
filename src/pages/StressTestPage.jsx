import { EmbeddedHtmlFrame, LabelTag, Section } from "../components/common";
import { HERHEART_STRESS_TEST_SRCDOC } from "../site/embedded";
import { T } from "../site/tokens";

export default function StressTestPage({ setPage }) {
  return (
    <div style={{ paddingTop: 58 }}>
      <div style={{ background: T.navBg, padding: "52px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <LabelTag>Financial stress test</LabelTag>
          <h1 className="section-title" style={{ color: "#fff", marginBottom: 16 }}>
            Pressure-test growth,<br /><em>unit economics and runway</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, maxWidth: 560, lineHeight: 1.8 }}>
            Explore churn, CAC, pricing, OPEX and retention sensitivity with a dedicated stress-testing workspace.
            This view complements the Business model with downside analysis and scenario volatility.
          </p>
        </div>
      </div>

      <Section style={{ maxWidth: 1200, paddingTop: 32 }}>
        <div className="card" style={{ padding: 16, overflow: "hidden", marginBottom: 32 }}>
          <EmbeddedHtmlFrame title="HerHeart financial stress test" srcDoc={HERHEART_STRESS_TEST_SRCDOC} minHeight={1650} />
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => setPage("Business")}>Back to business model</button>
          <button className="btn-secondary" onClick={() => setPage("Funding")}>View funding case</button>
        </div>
      </Section>
    </div>
  );
}