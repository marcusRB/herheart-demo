import { useState } from "react";
import { LabelTag, Section } from "../components/common";
import { T } from "../site/tokens";

export default function ContactPage() {
  const [type, setType] = useState("Hospital / Health System");
  const [sent, setSent] = useState(false);
  const types = ["Hospital / Health System", "VC / Investor", "Clinical advisor", "Strategic partner", "Press / Media"];

  return (
    <div style={{ paddingTop: 58 }}>
      <div style={{ background: T.navBg, padding: "52px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <LabelTag>Get in touch</LabelTag>
          <h1 className="section-title" style={{ color: "#fff", marginBottom: 16 }}>
            Let&apos;s discuss your<br /><em>pilot programme</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, maxWidth: 500, lineHeight: 1.8 }}>
            We work with hospital procurement, ED clinical leads, and health system CIOs.
            Tell us your context and we will tailor the proposal accordingly.
          </p>
        </div>
      </div>
      <Section style={{ maxWidth: 780 }}>
        {sent ? (
          <div className="card" style={{ textAlign: "center", padding: "56px 32px", borderColor: `${T.teal}44`, background: T.tealFaint }}>
            <div style={{ fontSize: 32, marginBottom: 12, color: T.teal }}>✓</div>
            <h2 style={{ fontFamily: "'Lora',serif", fontSize: 26, color: T.teal, marginBottom: 10 }}>
              Message received
            </h2>
            <p style={{ color: T.textMid, fontSize: 14 }}>
              We respond within 48 hours. You&apos;ll hear from us at the email you provided.
            </p>
          </div>
        ) : (
          <div className="card">
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="compact-grid compact-grid-2">
                {[["Name", "Full name"], ["Organisation", "Hospital / Health system / Fund"]].map(([label, placeholder]) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>{label}</div>
                    <input placeholder={placeholder} style={{ width: "100%", background: T.bg, border: `1px solid ${T.border2}`, borderRadius: 7, padding: "9px 12px", color: T.text, fontSize: 13, outline: "none" }} />
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>Work email</div>
                <input type="email" placeholder="demo@hernextbeat.tech" style={{ width: "100%", background: T.bg, border: `1px solid ${T.border2}`, borderRadius: 7, padding: "9px 12px", color: T.text, fontSize: 13, outline: "none" }} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>I represent…</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {types.map((option) => (
                    <button
                      key={option}
                      onClick={() => setType(option)}
                      style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: `1.5px solid ${type === option ? T.teal : T.border}`, background: type === option ? T.tealFaint : "transparent", color: type === option ? T.teal : T.textMuted, transition: "all .15s" }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>Message</div>
                <textarea rows={4} placeholder="Describe your ED setup, patient volume, current EHR, and what you're looking for…" style={{ width: "100%", background: T.bg, border: `1px solid ${T.border2}`, borderRadius: 7, padding: "9px 12px", color: T.text, fontSize: 13, outline: "none", resize: "vertical", lineHeight: 1.7 }} />
              </div>
              <button className="btn-primary" style={{ alignSelf: "flex-start" }} onClick={() => setSent(true)}>
                Send message →
              </button>
            </div>
          </div>
        )}
        <div className="grid-3" style={{ marginTop: 32 }}>
          {[["Email", "hello@hernextbeat.tech"], ["Based in", "London, England · UK"], ["Response time", "Within 48 h"]].map(([label, value]) => (
            <div key={label} style={{ textAlign: "center", padding: 16, borderRight: label !== "Response time" ? `1px solid ${T.border}` : "none" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, color: T.navy, fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}