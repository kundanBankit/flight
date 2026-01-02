import React, { useState, useRef, useEffect } from "react";

export default function TravellerSelector({
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  travelClass,
  setTravelClass,
  theme = "light", // "dark" or "light"
}) {
  const [popup, setPopup] = useState(false);
  const ref = useRef(null);
  const total = adults + children + infants;

  const classes = [
    "Economy/Premium Economy",
    "Premium Economy",
    "Business",
    "First Class",
  ];

  // 🎨 Theme Colors
  const isDark = theme === "dark";
  const colors = {
    background: isDark ? "#1a1a1d" : "#ffffff",
    text: isDark ? "#f1f1f1" : "#212529",
    muted: isDark ? "#b0b3b8" : "#6c757d",
    border: isDark ? "rgba(255,255,255,0.3)" : "#dee2e6",
    active: "#0BABE4",
    buttonBg: isDark ? "#242529" : "#ffffff",
  };

  // 🧠 Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (type, value) => {
    if (type === "adults") setAdults(value);
    if (type === "children") setChildren(value);
    if (type === "infants") setInfants(value);
  };

  return (
    <div
      ref={ref}
      className="col-12 col-md-4 col-lg-2 px-3 position-relative"
      style={{ cursor: "pointer", width: "auto" }}
    >
      {/* 🔘 Field */}
      <div
        onClick={() => setPopup(!popup)}
        className="p-2 rounded-3"
        style={{ backgroundColor: "transparent" }}
      >
        <small className="d-block mb-1" style={{ color: colors.muted }}>
          Travellers & Class
        </small>
        <div className="fw-semibold" style={{ color: colors.text }}>
          {total} Traveller{total > 1 ? "s" : ""}
        </div>
        <small style={{ color: colors.muted }}>{travelClass}</small>
      </div>

      {/* ✅ Popup */}
      {popup && (
        <div
          className="position-absolute rounded-4 shadow-lg p-4 mt-2 traveller-popup"
          style={{
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "680px",
            zIndex: 3000,
            backgroundColor: colors.background,
            border: `1px solid ${colors.border}`,
            color: colors.text,
            minHeight: "470px",
            borderRadius: "20px",
            transition: "all 0.3s ease",
            boxShadow: isDark
              ? "0 0 20px rgba(255,255,255,0.15)"
              : "0 0 15px rgba(0,0,0,0.15)",
            overflowY: "auto", // scroll for small screens
            maxHeight: "80vh",
          }}
        >
          {/* Adults */}
          <div className="mb-4">
            <div
              className="fw-bold text-uppercase small mb-1"
              style={{ color: colors.text }}
            >
              ADULTS (12y+)
            </div>
            <small className="d-block mb-2" style={{ color: colors.muted }}>
              On the day of travel
            </small>
            <div className="d-flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  className="btn"
                  style={{
                    width: "42px",
                    backgroundColor:
                      adults === n ? colors.active : colors.buttonBg,
                    color: adults === n ? "#fff" : colors.text,
                    border: `1px solid ${
                      adults === n ? colors.active : colors.border
                    }`,
                  }}
                  onClick={() => handleSelect("adults", n)}
                >
                  {n}
                </button>
              ))}
              <button
                className="btn"
                style={{
                  backgroundColor: adults > 9 ? colors.active : colors.buttonBg,
                  color: adults > 9 ? "#fff" : colors.text,
                  border: `1px solid ${
                    adults > 9 ? colors.active : colors.border
                  }`,
                }}
                onClick={() => handleSelect("adults", 10)}
              >
                9+
              </button>
            </div>
          </div>

          {/* ✅ Children + Infants (same line, responsive) */}
          <div
            className="d-flex justify-content-between align-items-start mb-4 flex-wrap"
            style={{ gap: "30px" }}
          >
            {/* Children */}
            <div style={{ flex: 1, minWidth: "250px" }}>
              <div
                className="fw-bold text-uppercase small mb-1"
                style={{ color: colors.text }}
              >
                CHILDREN (2y–12y)
              </div>
              <small className="d-block mb-2" style={{ color: colors.muted }}>
                On the day of travel
              </small>
              <div className="d-flex gap-2 flex-wrap">
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    className="btn"
                    style={{
                      width: "42px",
                      backgroundColor:
                        children === n ? colors.active : colors.buttonBg,
                      color: children === n ? "#fff" : colors.text,
                      border: `1px solid ${
                        children === n ? colors.active : colors.border
                      }`,
                    }}
                    onClick={() => handleSelect("children", n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Infants */}
            <div style={{ flex: 1, minWidth: "250px" }}>
              <div
                className="fw-bold text-uppercase small mb-1"
                style={{ color: colors.text }}
              >
                INFANTS (below 2y)
              </div>
              <small className="d-block mb-2" style={{ color: colors.muted }}>
                On the day of travel
              </small>
              <div className="d-flex gap-2 flex-wrap">
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    className="btn"
                    style={{
                      width: "42px",
                      backgroundColor:
                        infants === n ? colors.active : colors.buttonBg,
                      color: infants === n ? "#fff" : colors.text,
                      border: `1px solid ${
                        infants === n ? colors.active : colors.border
                      }`,
                    }}
                    onClick={() => handleSelect("infants", n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Travel Class */}
          <div className="mb-4">
            <div
              className="fw-bold text-uppercase small mb-2"
              style={{ color: colors.text }}
            >
              CHOOSE TRAVEL CLASS
            </div>
            <div className="d-flex flex-wrap gap-2">
              {classes.map((cls) => (
                <button
                  key={cls}
                  className="btn"
                  style={{
                    backgroundColor:
                      travelClass === cls ? colors.active : colors.buttonBg,
                    color: travelClass === cls ? "#fff" : colors.text,
                    border: `1px solid ${
                      travelClass === cls ? colors.active : colors.border
                    }`,
                  }}
                  onClick={() => setTravelClass(cls)}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn rounded-pill px-4 fw-semibold"
              onClick={() => setPopup(false)}
              style={{
                backgroundColor: colors.active,
                color: "#fff",
                border: "none",
              }}
            >
              APPLY
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Responsive Styles */}
      <style>
        {`
          @media (max-width: 992px) {
            .traveller-popup {
              width: 90%;
              left: 50%;
              transform: translateX(-50%);
            }
          }
          @media (max-width: 576px) {
            .traveller-popup {
              width: 100%;
              left: 0;
              transform: none;
              border-radius: 0 0 20px 20px;
              top: 105%;
            }
          }
        `}
      </style>
    </div>
  );
}
