import { EmbeddedHtmlFrame, Section } from "../components/common";
import { HERHEART_FINANCIAL_SIMULATOR_SRCDOC } from "../site/embedded";
import { T } from "../site/tokens";

export default function BusinessPage() {
  const years = ["Y1", "Y2", "Y3", "Y4", "Y5"];
  const revenue = [0, 120, 500, 1800, 4500];
  const costs = [380, 400, 600, 1600, 3300];
  const maxVal = 4500;

  return (
    <div style={{ paddingTop: 58 }}>
      <div style={{ background: T.navBg, padding: "52px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div className="label-tag"><span className="dot" />Business plan · 2026–2030</div>
          <h1 className="section-title" style={{ color: "#fff", marginBottom: 16 }}>
            A hospital SaaS model<br />built for <em>institutional procurement</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, maxWidth: 500, lineHeight: 1.8 }}>
            HerNextBeat targets hospital procurement departments, not individual clinicians.
            One contract, institution-wide deployment, subscription pricing per site.
          </p>
        </div>
      </div>
      <Section>
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {[["Per-site subscription", "$10k–15k/month per hospital site, tiered by annual ED patient volume. Annual billing."], ["Channel partnerships", "20–35% rev-share with Philips, Siemens, Epic App Orchard from year 3 onward."], ["Value-based pilot", "Free 3-month pilot → paid contract contingent on measurable triage improvement."]].map(([title, body]) => (
            <div key={title} className="card">
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: T.teal, marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>{body}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginBottom: 40, padding: 16, overflow: "hidden" }}>
          <div style={{ padding: "0 8px 16px", borderBottom: `1px solid ${T.border}`, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>Interactive model</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: T.navy }}>HerHeart financial simulator</div>
            </div>
            <div style={{ fontSize: 12, color: T.textMid }}>Scenario switching, live ARR, EBITDA, LTV:CAC, payback and break-even</div>
          </div>
          <EmbeddedHtmlFrame title="HerHeart financial simulator" srcDoc={HERHEART_FINANCIAL_SIMULATOR_SRCDOC} minHeight={1500} />
        </div>
        <h2 className="section-title" style={{ fontSize: 26, marginBottom: 20 }}>Growth phases</h2>
        {[["2026", "Pre-revenue — validation", "FDA Q‑Sub meeting scheduled · IRB retrospective study · 1st pilot hospital signed · Seed round closed · $380k burn"],
        ["2027", "2‑3 pilot hospitals signed ", "Retrospective validation completed · ISO 13485 initiated"],
        ["2028", "Early scale — $500k ARR", "5‑8 hospitals active (mix of Tier 1/2) · First commercial contracts (full price) · Series A prep (€10‑15M target)"],
        ["2029–30", "Scale — $1.8M–4.5M ARR", "FDA clearance (expected Q4 2029) · Epic App Orchard listing · U.S. + EU markets active · 20‑30 hospitals active"]].map(([year, title, body]) => (
          <div key={year} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 20, padding: "18px 0", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 13, color: T.teal, fontWeight: 600, paddingTop: 2 }}>{year}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: T.navy, marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 13, color: T.textMid }}>{body}</div>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}