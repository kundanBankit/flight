import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CardLayout({ children }) {
  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{
        marginTop: "-80px",
        marginBottom: "80px",
        width: "100%",
      }}
    >
      {/* ✅ Fixed width card container */}
      <div
  className="bg-white shadow-lg rounded-4 p-4 border"
  style={{
    width: "100%",          // 100% width of screen
    maxWidth: "1080px",     // but never exceed 1080px
    minHeight: "280px",
    transition: "height 0.3s ease",
    position: "relative",
  }}
>
        {children}
      </div>
    </div>
  );
}
