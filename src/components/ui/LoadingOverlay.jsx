import React, { useEffect } from "react";

export default function LoadingOverlay({ progress }) {
  // Disable scroll on mount, enable scroll on unmount
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div style={{
      position: "fixed",
      zIndex: 9999,
      top: 0, left: 0, width: "100vw", height: "100vh",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(16px) saturate(180%)",
      background: "rgba(255,255,255,0.25)",
      boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
      borderRadius: "0",
      border: "1px solid rgba(255,255,255,0.18)",
      transition: "opacity 0.3s"
    }}>
      <div style={{
        fontSize: "2rem",
        color: "#222",
        marginBottom: "2rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        Loading Models...
      </div>
      <div style={{
        width: "300px",
        height: "16px",
        background: "rgba(255,255,255,0.4)",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
      }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(90deg, #32f0fa 0%, #2aba27 100%)",
          borderRadius: "8px",
          transition: "width 0.2s"
        }} />
      </div>
      <div style={{
        marginTop: "1rem",
        color: "#222",
        fontWeight: 500,
        fontSize: "1.1rem"
      }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}
