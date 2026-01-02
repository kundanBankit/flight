import React, { useEffect, useRef } from "react";

const SeatSuggestionPopup = ({
  show,
  onClose,
  onAccept,
  seat = "19D",
  type = "Aisle",
  price = 403,
}) => {
  const popupRef = useRef(null);

  // 🔒 Scroll lock when popup opens
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  // ⬆️ Auto-scroll popup into view
  useEffect(() => {
    if (show && popupRef.current) {
      popupRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [show]);

  if (!show) return null;

  return (
    <>
      {/* 🔥 Blur Background Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(3px)",
          zIndex: 99998,
        }}
      />

      {/* 🎯 Popup Box */}
      <div
        ref={popupRef}
        style={{
          position: "fixed",
          top: "120px",
          right: "40px",
          width: "420px",
          background: "white",
          borderRadius: "12px",
          padding: "25px",
          zIndex: 99999,
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
          animation: "fadeIn .3s ease-out",
        }}
      >
        {/* Pointer Arrow */}
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
            borderRight: "12px solid white",
            position: "absolute",
            left: "-12px",
            top: "40px",
            filter: "drop-shadow(-2px 2px 2px rgba(0,0,0,0.1))",
          }}
        ></div>

        {/* Title */}
        <h5 style={{ fontWeight: 700, lineHeight: "20px" }}>
          Here’s a great-value aisle seat that you may prefer!
        </h5>

        {/* Seat info */}
        <p
          className="mt-2"
          style={{
            fontWeight: 700,
            fontSize: "18px",
          }}
        >
          {seat}
          <span style={{ fontSize: "15px", fontWeight: "500" }}>({type})</span>{" "}
          - ₹ {price}
        </p>

        {/* Bottom Buttons */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span
            onClick={onClose}
            style={{
              color: "#0a4ecf",
              fontWeight: "600",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            No, Let Me Choose
          </span>

          <button
            onClick={onAccept}
            style={{
              background: "linear-gradient(90deg,#1d5cf5,#0b43c9)",
              color: "white",
              border: "none",
              padding: "10px 26px",
              borderRadius: "25px",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
            }}
          >
            YES, PLEASE
          </button>
        </div>

        {/* Animation */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>
    </>
  );
};

export default SeatSuggestionPopup;
