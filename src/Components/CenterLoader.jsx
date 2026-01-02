import React from "react";

const CenterLoader = ({ show, text = "Please wait..." }) => {
  if (!show) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <div style={spinner}></div>
        <p style={textStyle}>{text}</p>
      </div>
    </div>
  );
};

export default CenterLoader;

// ================= STYLES =================
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modal = {
  background: "#fff",
  padding: "28px 32px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

const spinner = {
  width: "48px",
  height: "48px",
  border: "5px solid #e0e0e0",
  borderTop: "5px solid #007bff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const textStyle = {
  marginTop: "14px",
  fontSize: "14px",
  fontWeight: 500,
  color: "#333",
};

/* Add this globally */
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`, styleSheet.cssRules.length);
