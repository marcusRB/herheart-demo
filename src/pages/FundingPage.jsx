import { LabelTag, Section } from "../components/common";
import { T } from "../site/tokens";

export default function FundingPage() {
  return (
    <div style={{ paddingTop: 58 }}>
      <div style={{ background: T.navBg, padding: "52px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <LabelTag>Investment opportunity</LabelTag>
          <h1 className="section-title" style={{ color: "#fff", marginBottom: 16 }}>
            Seeking <em>$1M</em> seed round<br />· Q3 2026
          </h1>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, maxWidth: 500, lineHeight: 1.8 }}>
            Funding FDA 510(k) filing, two senior ML engineering hires, our first clinical pilot,
            and the EHR integration layer. Non-dilutive grant applications running in parallel.
          </p>
        </div>
      </div>
      <Section>
        <div className="grid-2" style={{ marginBottom: 40 }}>
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 18 }}>Use of funds</div>
            {[["FDA 510(k) + regulatory", "$140k", "14%"], ["ML engineering ×2", "$220k", "22%"], 
            ["EHR integration layer", "$90k", "9%"], ["Clinical pilot costs", "$160k", "16%"], 
            ["Legal / IP / patents", "$50k", "5%"], ["Operations / runway", "$180k", "18%"],
            ["Contingency", "$100k", "10%"],["Sales & Business Development", "$60k", "6%"]].map(([label, amount, percent]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${T.border}`, fontSize: 13 }}>
                <span style={{ color: T.textMid }}>{label}</span>
                <span style={{ display: "flex", gap: 14 }}>
                  <span style={{ color: T.navy, fontWeight: 500 }}>{amount}</span>
                  <span style={{ color: T.textFaint, minWidth: 28, textAlign: "right" }}>{percent}</span>
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="card" style={{ borderLeft: `3px solid ${T.teal}`, borderRadius: "0 10px 10px 0" }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: T.teal, marginBottom: 6 }}>Non-dilutive (in progress)</div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>
                CDTI R&amp;D loan · EIC Accelerator Phase 1 · NIH SBIR Phase I · Horizon Europe Health Cluster · 
                AWS Activate / Google for Startups cloud credits · EIT Health
              </div>
            </div>
            <div className="card">
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: T.teal, marginBottom: 6 }}>Target investors</div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>
                HealthTech VCs (Asabys Partners, Forbion, Sofinnova) ·
                Hospital corporate venture arms · Angels with cardiology background
              </div>
            </div>
            <div className="card" style={{ borderLeft: `3px solid ${T.rose}`, borderRadius: "0 10px 10px 0" }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: T.rose, marginBottom: 6 }}>What investors receive</div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>
                Equity stake · Board observer seat · Co-investment rights on Series A ·
                First-mover in a $12B gender-health AI segment
              </div>
            </div>
            <div className="card">
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: T.textMuted, marginBottom: 6 }}>IP &amp; moat</div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>
                Provisional U.S. patent filed · Female-feature pipeline proprietary ·
                Data flywheel via hospital BAAs · FDA clearance as 2-year competitive barrier
              </div>
            </div>
          </div>
        </div>
        <h2 className="section-title" style={{ fontSize: 26, marginBottom: 20 }}>Post-funding milestones</h2>
        <div className="grid-3">
          {[["Month 3", "• First pilot hospital signed. \
            • Retrospective validation dataset secured under IRB approval."], 
            ["Month 6", "• FDA Pre‑Submission (Q‑Sub) meeting request filed. \
                • ISO 13485 Quality Management System initiated"],
            ["Month 12", "• $10k‑20k ARR from pilot fees or early subscription. \
                • Second pilot hospital LOI signed • SBIR Phase I grant (or equivalent) awarded (non‑dilutive)"],
            ["Month 18", "• ISO 13485 certified \
                •FDA De Novo submission package >50% complete • Cloud credits (AWS/GCP) fully utilised, reducing cash burn"],
            ["Month 30", "• Prospective pilot study initiated at 1‑2 sites • Annual Recurring Revenue (ARR) reaches $240‑360k"],
            ["Month 48", "• Series A ready: €10‑15M raise to scale commercial team, expand to EU (DiGA prep) \
                • Launch Phase 2 (remote monitoring) \
                • CE mark preparation begins (deferred to Series A)."]].map(([milestone, body]) => (
            <div key={milestone} className="card card-sm">
              <div style={{ fontFamily: "'Lora',serif", fontSize: 22, color: T.teal, marginBottom: 8, fontWeight: 500 }}>{milestone}</div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>{body}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}