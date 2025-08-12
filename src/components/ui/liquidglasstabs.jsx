import React, { useState } from "react";
import { Card, CardContent } from "./card";

const tabs = [
  {
    id: "vision",
    title: "Vision",
    content:
      "Our vision is to innovate and transform the digital landscape, merging creativity with cutting-edge technology.",
    theme: {
      bg: "rgba(245, 61, 61, 0.6)", // Garnet red translucent
      text: "#f2dede", // Soft red/pink text
      border: "#a83232", // Darker red border
      shadow: "rgba(139, 0, 0, 0.3)", // Red glow shadow
      active: "#ff4d4d", // Bright red for active tab
    },
    portfolio: [
      {
        id: 1,
        title: "Visionary UI/UX",
        description: "Innovative interface design for future apps.",
        image: "/images/portfolio1.jpg",
      },
      {
        id: 2,
        title: "AI Integration",
        description: "Seamless AI-powered user experience.",
        image: "/images/portfolio2.jpg",
      },
    ],
    panorama: "/images/littleplanetsoigrexa.JPG",
  },
  {
    id: "geoworks",
    title: "GeoWorks",
    content:
      "GeoWorks pioneers geographic data solutions, delivering real-time insights with a stunning visual experience.",
    theme: {
      bg: "rgba(46, 139, 87, 0.6)", // Earth green translucent
      text: "#d0f0c0", // Soft green text
      border: "#256b42", // Darker green border
      shadow: "rgba(46, 139, 87, 0.3)", // Green glow shadow
      active: "#56d27d", // Bright green for active tab
    },
    portfolio: [
      {
        id: 3,
        title: "Geo Mapping",
        description: "Interactive maps with real-time data.",
        image: "/images/portfolio3.jpg",
      },
      {
        id: 4,
        title: "Data Visualization",
        description: "Clear, actionable geographic insights.",
        image: "/images/portfolio4.jpg",
      },
    ],
    panorama: "/images/geoworks-pano.jpg",
  },
  {
    id: "studios",
    title: "Studios",
    content:
      "Studios bring ideas to life through immersive storytelling, high-end design, and seamless user experience.",
    theme: {
      bg: "rgba(48, 213, 200, 0.6)", // Turquoise translucent
      text: "#c9f9f7", // Soft turquoise text
      border: "#1fae9f", // Darker turquoise border
      shadow: "rgba(48, 213, 200, 0.3)", // Turquoise glow shadow
      active: "#62fff9", // Bright turquoise for active tab
    },
    portfolio: [
      {
        id: 5,
        title: "Immersive Storytelling",
        description: "High-end cinematic experiences.",
        image: "/images/portfolio5.jpg",
      },
      {
        id: 6,
        title: "UX/UI Excellence",
        description: "Seamless and beautiful design systems.",
        image: "/images/portfolio6.jpg",
      },
    ],
    panorama: "/images/studios-pano.jpg",
  },
];

export default function LiquidGlassTabs() {
  const [activeTab, setActiveTab] = useState("vision");
  const [fullscreen, setFullscreen] = useState(false);

  const activeTabObj = tabs.find((tab) => tab.id === activeTab);

  // Prevent event bubbling when clicking inside viewer (to avoid closing fullscreen)
  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <section
      style={{
        width: "100%",
        padding: "2rem",
        fontFamily: "'JetBrains Mono', monospace",
        userSelect: "none",
        background: activeTabObj.theme.bg,
        color: activeTabObj.theme.text,
        backdropFilter: "blur(15px)",
        transition:
          "background-color 0.5s ease, color 0.5s ease, box-shadow 0.5s ease",
        position: "relative",
        zIndex: fullscreen ? 9999 : "auto",
      }}
    >
      {/* Tabs row */}
      <nav
        style={{
          display: "flex",
          gap: "3rem",
          marginBottom: "2rem",
          justifyContent: "flex-start",
          alignItems: "center",
          fontWeight: 400,
          fontSize: "3.4rem",
          cursor: "pointer",
          color: activeTabObj.theme.text + "cc",
          borderBottom: "2px solid transparent",
          userSelect: "none",
        }}
      >
        {tabs.map(({ id, title, theme }) => (
          <div
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              color: activeTab === id ? theme.active : theme.text + "88",
              borderBottom:
                activeTab === id
                  ? `3px solid ${theme.active}`
                  : "3px solid transparent",
              paddingBottom: "6px",
              transition: "color 0.3s ease, border-bottom 0.3s ease",
              fontWeight: activeTab === id ? 600 : 400,
              letterSpacing: "0.05em",
              userSelect: "none",
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
          lineHeight: 1.6,
          color: activeTabObj.theme.text,
          minHeight: "120px",
          userSelect: "text",
          transition: "color 0.5s ease",
          marginBottom: "2rem",
        }}
      >
        {activeTabObj.content}

        {/* Optional image */}
        <div style={{ marginTop: "1rem" }}>
          <img
            src={`/images/${activeTab}.jpg`}
            alt={`${activeTab} visual`}
            style={{
              width: "100%",
              maxHeight: "250px",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: `0 8px 20px ${activeTabObj.theme.shadow}`,
              transition: "box-shadow 0.5s ease",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      </div>

      {/* Vision Tab: little-planet viewer inline and fullscreen */}
      {activeTab === "vision" && !fullscreen && (
        <div
          onClick={() => setFullscreen(true)}
          style={{
            width: "280px",
            height: "280px",
            cursor: "pointer",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: `0 8px 20px ${activeTabObj.theme.shadow}`,
            marginTop: "2rem",
          }}
          title="Click to fullscreen"
        >
          <little-planet
            src={activeTabObj.panorama}
            mode="pano"
            width={280}
            height={280}
            quality="high"
            style={{ width: "100%", height: "100%", borderRadius: "16px" }}
          />
        </div>
      )}

      {/* Fullscreen Overlay */}
      {fullscreen && (
        <div
          onClick={() => setFullscreen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            cursor: "zoom-out",
          }}
        >
          <div
            onClick={stopPropagation}
            style={{
              position: "relative",
              width: "90vw",
              height: "90vw",
              maxWidth: "900px",
              maxHeight: "900px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: `0 0 40px ${activeTabObj.theme.shadow}`,
              cursor: "auto",
              backgroundColor: "#000",
            }}
          >
            <button
              onClick={() => setFullscreen(false)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                zIndex: 11000,
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
                userSelect: "none",
                lineHeight: 1,
              }}
              aria-label="Close fullscreen"
            >
              ×
            </button>
            <little-planet
              src={activeTabObj.panorama}
              mode="pano"
              width={900}
              height={900}
              quality="high"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}

      {/* Portfolio Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {activeTabObj.portfolio.map(({ id, title, description, image }) => (
          <Card
            key={id}
            className="shadow-md hover:shadow-lg transition rounded-2xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              border: `1px solid ${activeTabObj.theme.border}`,
              color: activeTabObj.theme.text,
              transition: "background-color 0.3s ease",
            }}
          >
            <CardContent className="p-4 flex flex-col items-center">
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-600"
                style={{ display: "none" }}
              >
                {title}
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: activeTabObj.theme.active }}
              >
                {title}
              </h3>
              <p className="text-center">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
