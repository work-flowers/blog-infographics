import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0F0E17",
  surface: "#1A1930",
  surfaceLight: "#232145",
  indigo: "#2E1B88",
  azure: "#1479E1",
  ochre: "#E17A14",
  peach: "#F6C696",
  skyBlue: "#9CE1FC",
  white: "#FFFFFF",
  textMuted: "#8B8AA0",
  textDim: "#5C5A72",
};

const tools = {
  sources: [
    { icon: "📧", name: "Gmail", desc: "cc crm@ on any thread" },
    { icon: "📅", name: "Google Calendar", desc: "Meetings auto-captured" },
    { icon: "🎙️", name: "Granola", desc: "In-person transcriptions" },
    { icon: "📬", name: "MailerLite", desc: "Mailing list activity" },
    { icon: "🌐", name: "Website", desc: "Inbound enquiries" },
  ],
  databases: [
    { icon: "👤", name: "Contacts" },
    { icon: "🏢", name: "Companies" },
    { icon: "📧", name: "Emails" },
    { icon: "📋", name: "Meeting Notes" },
    { icon: "🤝", name: "Deals" },
    { icon: "📥", name: "Leads" },
    { icon: "💰", name: "Invoices" },
  ],
  enrichment: [
    { icon: "🔍", name: "Apollo.io", desc: "Job title, LinkedIn, location" },
    { icon: "🧠", name: "AI Agents", desc: "Company research & briefs" },
  ],
  dealWon: [
    { icon: "📁", name: "Google Drive", desc: "Folder structure" },
    { icon: "📋", name: "Linear", desc: "Project & team" },
    { icon: "💬", name: "Slack", desc: "Client channel" },
    { icon: "⏱️", name: "Harvest", desc: "Time tracking" },
    { icon: "📬", name: "MailerLite", desc: "Mailing list" },
    { icon: "🤝", name: "Zapier Partner", desc: "Deal registration" },
  ],
};

function AnimatedIn({ children, delay = 0, className = "" }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Pill({ icon, name, desc, color = COLORS.azure, small = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: small ? 8 : 10,
        padding: small ? "6px 12px" : "10px 16px",
        background: hovered ? COLORS.surfaceLight : COLORS.surface,
        border: `1px solid ${hovered ? color : COLORS.textDim}44`,
        borderRadius: 12,
        cursor: "default",
        transition: "all 0.25s ease",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered ? `0 4px 20px ${color}22` : "none",
        minWidth: 0,
      }}
    >
      <span style={{ fontSize: small ? 18 : 22, flexShrink: 0 }}>{icon}</span>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            color: COLORS.white,
            fontSize: small ? 12 : 13,
            fontWeight: 600,
            letterSpacing: "0.01em",
            lineHeight: 1.3,
          }}
        >
          {name}
        </div>
        {desc && (
          <div
            style={{
              color: COLORS.textMuted,
              fontSize: 11,
              lineHeight: 1.3,
              marginTop: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {desc}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ children, color = COLORS.azure, number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.white,
          fontSize: 14,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {number}
      </div>
      <div
        style={{
          color: COLORS.white,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FlowArrow({ color = COLORS.azure, label, vertical = false }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        alignItems: "center",
        gap: 0,
        padding: vertical ? "4px 0" : "0 4px",
        alignSelf: "center",
      }}
    >
      <div
        style={{
          width: vertical ? 2 : 40,
          height: vertical ? 28 : 2,
          background: `linear-gradient(${vertical ? "to bottom" : "to right"}, ${color}44, ${color})`,
          borderRadius: 1,
        }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: vertical ? "5px solid transparent" : `6px solid ${color}`,
          borderRight: vertical ? "5px solid transparent" : "none",
          borderTop: vertical ? `6px solid ${color}` : "5px solid transparent",
          borderBottom: vertical ? "none" : "5px solid transparent",
        }}
      />
      {label && (
        <div
          style={{
            position: "absolute",
            color: color,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            marginTop: vertical ? 0 : -22,
            marginLeft: vertical ? 12 : 0,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

function AutomationBadge() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        background: `${COLORS.indigo}66`,
        border: `1px solid ${COLORS.indigo}`,
        borderRadius: 20,
        color: COLORS.skyBlue,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
      }}
    >
      <span style={{ fontSize: 13 }}>⚡</span> 30+ Zapier Automations
    </div>
  );
}

function NotionHub() {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${COLORS.surface}, ${COLORS.surfaceLight})`,
        border: `2px solid ${COLORS.white}33`,
        borderRadius: 20,
        padding: "24px 28px",
        position: "relative",
        boxShadow: `0 0 60px ${COLORS.indigo}22, inset 0 1px 0 ${COLORS.white}11`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: COLORS.white,
            background: COLORS.white + "15",
            padding: "4px 12px",
            borderRadius: 6,
          }}
        >
          Notion CRM Hub
        </div>
        <div
          style={{
            fontSize: 11,
            color: COLORS.textMuted,
          }}
        >
          7 interconnected databases
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {tools.databases.map((db, i) => (
          <Pill key={i} icon={db.icon} name={db.name} color={COLORS.white} small />
        ))}
      </div>
      <div
        style={{
          marginTop: 14,
          padding: "8px 14px",
          background: `${COLORS.indigo}33`,
          borderRadius: 10,
          border: `1px solid ${COLORS.indigo}44`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 14 }}>🔗</span>
        <span style={{ color: COLORS.skyBlue, fontSize: 11, fontWeight: 500 }}>
          Notion native automations link contacts → companies → deals → meetings automatically
        </span>
      </div>
    </div>
  );
}

function DealWonCascade() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev >= tools.dealWon.length - 1 ? -1 : prev + 1));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: COLORS.ochre,
            letterSpacing: "0.04em",
          }}
        >
          🎉 DEAL WON
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to right, ${COLORS.ochre}44, transparent)`,
          }}
        />
        <span style={{ fontSize: 11, color: COLORS.textMuted }}>
          6 things happen automatically
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        {tools.dealWon.map((tool, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              background: active >= i ? `${COLORS.ochre}18` : COLORS.surface,
              border: `1px solid ${active >= i ? COLORS.ochre + "66" : COLORS.textDim + "33"}`,
              borderRadius: 10,
              transition: "all 0.3s ease",
              transform: active >= i ? "scale(1.02)" : "scale(1)",
            }}
          >
            <span style={{ fontSize: 16 }}>{tool.icon}</span>
            <div>
              <div
                style={{
                  color: active >= i ? COLORS.peach : COLORS.white,
                  fontSize: 11,
                  fontWeight: 600,
                  transition: "color 0.3s ease",
                }}
              >
                {tool.name}
              </div>
              <div style={{ color: COLORS.textMuted, fontSize: 10, lineHeight: 1.2 }}>
                {tool.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBadge({ number, label, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color,
          lineHeight: 1,
          fontFamily: "'DM Serif Display', Georgia, serif",
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontSize: 10,
          color: COLORS.textMuted,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginTop: 4,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function CRMInfographic() {
  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        padding: "40px 24px",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        color: COLORS.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap"
        rel="stylesheet"
      />

      {/* Subtle background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `radial-gradient(${COLORS.textDim}15 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      {/* Glow accents */}
      <div
        style={{
          position: "fixed",
          top: -200,
          right: -200,
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${COLORS.indigo}18, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${COLORS.ochre}10, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <AnimatedIn delay={0}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: COLORS.azure,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              work.flowers · CRM Architecture
            </div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                lineHeight: 1.15,
                margin: 0,
                fontFamily: "'DM Serif Display', Georgia, serif",
                background: `linear-gradient(135deg, ${COLORS.white}, ${COLORS.skyBlue})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              A CRM That Runs Itself
            </h1>
            <p
              style={{
                color: COLORS.textMuted,
                fontSize: 14,
                marginTop: 12,
                lineHeight: 1.6,
                maxWidth: 480,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              7 databases. 30+ automations. Zero manual data entry.
              <br />
              Here's how it all connects.
            </p>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 40,
                marginTop: 24,
                padding: "16px 0",
                borderTop: `1px solid ${COLORS.textDim}33`,
                borderBottom: `1px solid ${COLORS.textDim}33`,
              }}
            >
              <StatBadge number="7" label="Databases" color={COLORS.white} />
              <StatBadge number="30+" label="Automations" color={COLORS.azure} />
              <StatBadge number="12" label="Integrations" color={COLORS.ochre} />
              <StatBadge number="0" label="Manual Entry" color={COLORS.skyBlue} />
            </div>
          </div>
        </AnimatedIn>

        {/* STEP 1: Data Sources */}
        <AnimatedIn delay={200}>
          <SectionLabel number="1" color={COLORS.azure}>
            Data flows in from your existing tools
          </SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 8,
              marginBottom: 8,
            }}
          >
            {tools.sources.map((tool, i) => (
              <Pill key={i} {...tool} color={COLORS.azure} />
            ))}
          </div>
        </AnimatedIn>

        {/* Arrow down */}
        <AnimatedIn delay={400}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px 0",
            }}
          >
            <div
              style={{
                width: 2,
                height: 32,
                background: `linear-gradient(to bottom, ${COLORS.azure}44, ${COLORS.azure})`,
              }}
            />
            <AutomationBadge />
            <div
              style={{
                width: 2,
                height: 20,
                background: `linear-gradient(to bottom, ${COLORS.azure}, ${COLORS.azure}44)`,
              }}
            />
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: `8px solid ${COLORS.azure}88`,
              }}
            />
          </div>
        </AnimatedIn>

        {/* STEP 2: Enrichment */}
        <AnimatedIn delay={500}>
          <SectionLabel number="2" color={COLORS.ochre}>
            AI enriches every record
          </SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 8,
            }}
          >
            {tools.enrichment.map((tool, i) => (
              <Pill key={i} {...tool} color={COLORS.ochre} />
            ))}
          </div>
        </AnimatedIn>

        {/* Arrow down */}
        <AnimatedIn delay={650}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px 0",
            }}
          >
            <div
              style={{
                width: 2,
                height: 28,
                background: `linear-gradient(to bottom, ${COLORS.ochre}44, ${COLORS.white}66)`,
              }}
            />
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: `8px solid ${COLORS.white}66`,
              }}
            />
          </div>
        </AnimatedIn>

        {/* STEP 3: Notion Hub */}
        <AnimatedIn delay={700}>
          <SectionLabel number="3" color={COLORS.white}>
            Everything lands in one place
          </SectionLabel>
          <NotionHub />
        </AnimatedIn>

        {/* Arrow down */}
        <AnimatedIn delay={850}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px 0",
            }}
          >
            <div
              style={{
                width: 2,
                height: 28,
                background: `linear-gradient(to bottom, ${COLORS.white}33, ${COLORS.ochre})`,
              }}
            />
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: `8px solid ${COLORS.ochre}`,
              }}
            />
          </div>
        </AnimatedIn>

        {/* STEP 4: Deal Won Cascade */}
        <AnimatedIn delay={900}>
          <SectionLabel number="4" color={COLORS.ochre}>
            Deal won? Everything spins up
          </SectionLabel>
          <DealWonCascade />
        </AnimatedIn>

        {/* Footer */}
        <AnimatedIn delay={1100}>
          <div
            style={{
              textAlign: "center",
              marginTop: 48,
              padding: "24px 0",
              borderTop: `1px solid ${COLORS.textDim}33`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: COLORS.textMuted,
                letterSpacing: "0.04em",
                lineHeight: 1.7,
              }}
            >
              No seat-based pricing traps · No six-week onboarding · Just the system you need
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 12,
                color: COLORS.azure,
                fontWeight: 600,
              }}
            >
              work.flowers
            </div>
          </div>
        </AnimatedIn>
      </div>
    </div>
  );
}
