import React, { useState } from "react";

const tabs = [
  {
    id: "vision",
    title: "Vision",
    content:
      "Our vision is to innovate and transform the digital landscape, merging creativity with cutting-edge technology.",
  },
  {
    id: "geoworks",
    title: "GeoWorks",
    content:
      "GeoWorks pioneers geographic data solutions, delivering real-time insights with a stunning visual experience.",
  },
  {
    id: "studios",
    title: "Studios",
    content:
      "Studios bring ideas to life through immersive storytelling, high-end design, and seamless user experience.",
  },
];

export default function LiquidGlassTabs() {
  const [activeTab, setActiveTab] = useState("vision");

  return (
    <section
      style={{
        width: "100%",
        padding: "2rem",
        color: "#e0e6f0",
        fontFamily: "'JetBrains Mono', monospace",
        userSelect: "none",
      }}
    >
      {/* Tabs row */}
      <nav
        style={{
          display: "flex",
          gap: "3rem",
          marginBottom: "2rem",
          marginTop: "-5rem",
          justifyContent: "flex-start",
          alignItems: "center",
          fontWeight: 400,
          fontSize: "3.4rem",
          cursor: "pointer",
          color: "rgba(255, 255, 255, 0.6)",
        }}
      >
        {tabs.map(({ id, title }) => (
          <div
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              color: activeTab === id ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
              borderBottom:
                activeTab === id ? "2px solid #fff" : "2px solid transparent",
              paddingBottom: "4px",
              transition: "color 0.3s ease, border-bottom 0.3s ease",
              fontWeight: activeTab === id ? 500 : 400,
              letterSpacing: "0.05em",
            }}
          >
            {title}
          </div>
        ))}
      </nav>

      {/* Content */}
      <div
        style={{
          fontSize: "1.125rem",
          lineHeight: 1.5,
          color: "#c0c7d6",
          minHeight: "120px",
        }}
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}

        {/* Optional image for each tab */}
        <div style={{ marginTop: "1rem" }}>
          <img
            src={`/images/${activeTab}.jpg`}
            alt={`${activeTab} visual`}
            style={{
              width: "100%",
              maxHeight: "250px",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
}
