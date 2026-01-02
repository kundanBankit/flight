import React from "react";

const ErrorPopup = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div style={overlay}>
      <div style={popupBox}>
        <h5 style={{ margin: 0, fontWeight: 600 }}>⚠️ Validation Error</h5>
        <p style={{ marginTop: 10, marginBottom: 20 }}>{message}</p>

        <button onClick={onClose} style={closeBtn}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;

// ---------- STYLES ----------
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10000,
};

const popupBox = {
  background: "white",
  padding: "24px 30px",
  borderRadius: "12px",
  width: "350px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

const closeBtn = {
  background: "#007bff",
  border: "none",
  padding: "8px 18px",
  color: "#fff",
  borderRadius: "6px",
  cursor: "pointer",
};
