import React, { useState } from "react";
import { Card, CardContent } from "./card";

const tabs = [
  {
    id: "vision",
    title: "Vision",
  panorama: "/images/littleplanetsoigrexa.jpg",
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
        title: "Sketchfab Models Photogrammetry",
        description: "Create and provide 3D Models with aerial/non-aerial photogrammetry.",
        image: "/images/portfolio1.jpg",
      },
      {
        id: 2,
        title: "VR Experiences with footage",
        description: "Quest 3 Showcases of different footages.",
        image: "/images/portfolio2.jpg",
      },
    ],
  },
  {
    id: "geoworks",
    title: "GeoWorks",
    content: [
      "GeoWorks pioneers geographic data solutions"
    ],
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
        title: "Geo Mapping in RealityCapture",
        description: "Interactive maps with quality data.",
        image: "/images/portfolio3.jpg",
      },
      {
        id: 4,
        title: "Data Visualization with Potree Cloud Models",
        description: "Interactive sites with measures, etc...",
        image: "/images/portfolio4.jpg",
      },
    ],
  },
  {
    id: "studios",
    title: "Studios",
    content: [
      "Studios bring ideas to life"
    ],
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
        title: "Aerial VFX",
        description: "Blender COLMAP Tracking and VFX.",
        image: "/images/portfolio5.jpg",
      },
      {
        id: 6,
        title: "Product, Automotive, Real State showcases",
        description: "Cinematic shots and interactive experiences.",
        image: "/images/portfolio6.jpg",
      },
    ],
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
        overflow: "visible",
      }}
    >
      {/* Top Gradient Bleed */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "48px",
          pointerEvents: "none",
          background: `linear-gradient(to bottom, ${activeTabObj.theme.bg} 0%, transparent 100%)`,
          zIndex: 1,
        }}
      />
      {/* Bottom Gradient Bleed */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "48px",
          pointerEvents: "none",
          background: `linear-gradient(to top, ${activeTabObj.theme.bg} 0%, transparent 100%)`,
          zIndex: 1,
        }}
      />
      {/* Tabs row */}
      <nav
        className="flex gap-4 md:gap-12 mb-8 justify-start items-center font-normal text-2xl md:text-4xl cursor-pointer select-none border-b-0"
        style={{ color: activeTabObj.theme.text + 'cc' }}
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
      {activeTab === "vision" ? (
        <>
          {/* Two-column layout for tinyplanet and explanation */}
          <div
            className="flex flex-col md:flex-row gap-6 md:gap-10 items-center mb-10"
          >
            {/* Tinyplanet viewer (placeholder or interactive) */}
            <div className="w-full max-w-xs md:max-w-xs flex-shrink-0">
              {!fullscreen && (
                <div
                  onClick={() => setFullscreen(true)}
                  className="w-full aspect-square cursor-pointer rounded-2xl overflow-hidden flex items-center justify-center shadow-lg"
                  style={{ boxShadow: `0 8px 20px ${activeTabObj.theme.shadow}` }}
                  title="Click to fullscreen"
                >
                  <img
                    src="/images/littleplanetsoigrexa-placeholder.jpg"
                    alt="Tiny planet preview"
                    className="w-full h-full object-cover rounded-2xl block"
                  />
                </div>
              )}
            </div>
            {/* Explanatory text */}
            <div className="flex-1 min-w-[180px] text-base md:text-lg font-medium" style={{ color: activeTabObj.theme.text }}>
              <span className="block text-xl md:text-2xl font-bold mb-2">Tiny Planet Effect</span>
              Experience our unique "tiny planet" panorama viewer! This effect transforms a 360° panoramic image into a captivating, interactive globe. Click the preview to explore the full immersive view in fullscreen mode.
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.6,
            color: activeTabObj.theme.text,
            minHeight: "120px",
            userSelect: "text",
            transition: "color 0.5s ease",
            marginBottom: "-6rem",
          }}
        >

          {Array.isArray(activeTabObj.content)
            ? activeTabObj.content.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))
            : activeTabObj.content}

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
      )}


      {/* Fullscreen Overlay: Only load little-planet when fullscreen is active */}
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
