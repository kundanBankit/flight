import React from "react";

export default function FareSelector({ fareType, setFareType, theme = "light" }) {
  const fares = [
    { key: "regular", label: "Regular", desc: "Regular fares" },
    { key: "student", label: "Student", desc: "Extra discounts/baggage" },
    { key: "armed", label: "Armed Forces", desc: "Up to ₹600 off" },
    { key: "seniorCitizen", label: "Senior Citizen", desc: "Up to ₹600 off" },
    { key: "doctorAndNurses", label: "Doctor and Nurses", desc: "Up to ₹600 off" },
  ];

  //  Define color scheme for both themes
  const isDark = theme === "dark";

  const textColor = isDark ? "#f1f5f9" : "#212529";
  const mutedText = isDark ? "#9ca3af" : "#6c757d";
  const background = isDark ? "#1a1a1d" : "#ffffff";
  const borderColor = isDark ? "#2f2f3a" : "#dee2e6";
  const activeBg = isDark ? "#0b1324" : "#e7f1ff";
  const activeText = "#0d6efd";

  return (
    <div
      className="mt-4 rounded-4 p-3"
      style={{
        backgroundColor: background,
        color: textColor,
        border: isDark ? "1px solid #2f2f3a" : "1px solid #e9ecef",
      }}
    >
      <p className="fw-bold mb-2" style={{ color: textColor }}>
        Select a special fare
      </p>

      <div className="d-flex flex-wrap gap-2">
        {fares.map((fare) => (
          <button
            key={fare.key}
            onClick={() => setFareType(fare.key)}
            className={`btn rounded-4 px-3 py-2 ${
              fareType === fare.key ? "active" : ""
            }`}
            style={{
              minWidth: "130px",
              borderWidth: "1px",
              borderColor: fareType === fare.key ? activeText : borderColor,
              backgroundColor: fareType === fare.key ? activeBg : background,
              color: fareType === fare.key ? activeText : textColor,
              transition: "all 0.2s ease",
              boxShadow: "none",
            }}
          >
            <div className="fw-semibold">{fare.label}</div>
            <small
              style={{
                color: fareType === fare.key ? activeText : mutedText,
              }}
            >
              {fare.desc}
            </small>
          </button>
        ))}
      </div>
    </div>
  );
}
