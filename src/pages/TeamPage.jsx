import claraImg from "../assets/clara.png";
import ivanImg from "../assets/ivan.png";
import marcoImg from "../assets/marco.png";
import martaImg from "../assets/marta.png";
import rajaeImg from "../assets/rajae.png";
import victorImg from "../assets/victor.png";
import { LabelTag, Section } from "../components/common";
import { T } from "../site/tokens";

export default function TeamPage() {
  return (
    <div style={{ paddingTop: 58 }}>
      <div style={{ background: T.navBg, padding: "52px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <LabelTag>The team - NextBeat</LabelTag>
          <h1 className="section-title" style={{ color: "#fff", marginBottom: 16 }}>
            Clinical depth meets<br /><em>engineering precision</em>
          </h1>
        </div>
      </div>
      <Section>
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {[[rajaeImg, "Rajae El Gaouzi • Founder / CEO", "Leads the strategic vision, partnerships, and overall growth of HerNextBeat, driving innovation in women’s cardiovascular healthcare.", "CEO · Strategy · Fundraising"], [claraImg, "Clara Gonzalez • Chief Medical Officer (CMO)", "Oversees clinical strategy, medical validation, and collaboration with healthcare professionals to ensure patient-centered and evidence-based solutions.", "CMO · Clinical validation · KOL"], [marcoImg, "Marco Russo • Chief Financial Officer (CFO)", "Manages financial strategy, investment planning, budgeting, and long-term business sustainability.", "CFO · Finance · Strategy"], [ivanImg, "Iván Peréz López • Chief Technology Officer (CTO)", "Leads the development of HerNextBeat’s AI infrastructure, software architecture, and integration with healthcare systems.", "CTO · Model · Infrastructure"], [victorImg, "Victor Gutierrez Gonzalez • Regulatory Affairs and Quality Assurance (QA) Manager", "Ensures compliance with FDA, HIPAA, and healthcare quality standards while overseeing regulatory strategy and product safety.", "Regulatory · Compliance · Legal"], [martaImg, "Marta Meroño Rafel • Operation and Marketing Officer (OMO)", "Coordinates business operations, marketing strategy, brand development, and communication to support market adoption and company growth.", "OMO · Business development"]].map(([image, role, bio, tags]) => (
            <div key={role} className="card">
              <img src={image} alt={role} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: `1.5px solid ${T.teal}44`, marginBottom: 14 }} />
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: T.teal, marginBottom: 6 }}>{role}</div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75, marginBottom: 10 }}>{bio}</div>
              <div style={{ fontSize: 11, color: T.textFaint }}>{tags}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ background: T.tealFaint, borderColor: `${T.teal}33`, textAlign: "center", padding: "40px 28px" }}>
          <h2 className="section-title" style={{ fontSize: 24, marginBottom: 10 }}>We are hiring</h2>
          <p style={{ color: T.textMid, fontSize: 14, maxWidth: 400, margin: "0 auto 24px", lineHeight: 1.8 }}>
            Open roles: Senior ML Engineer (FHIR/healthcare AI), Clinical Data Scientist,
            Hospital Partnerships Manager (US/Canada and DACH region).
          </p>
          <button className="btn-secondary">View open roles →</button>
        </div>
      </Section>
    </div>
  );
}