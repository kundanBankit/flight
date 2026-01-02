import React, { useState, useEffect, useRef } from "react";
import { FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const TripSecure = ({ triggerValidation, setTripSecureValid }) => {
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(false);

  const sectionRef = useRef(null);

  const handleSelect = (value) => {
    setSelected(value);
    setError(false);
    setTripSecureValid(true);   // ⭐ parent ko valid bhej diya
  };

  useEffect(() => {
    if (triggerValidation) {
      if (!selected) {
        setError(true);
        setTripSecureValid(false); // ⭐ invalid

        setTimeout(() => {
          sectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 150);
      }
    }
  }, [triggerValidation]);


  return (
    <div
      id="trip-secure-box"
      ref={sectionRef}
      className="p-4 mb-4"
      style={{
        borderRadius: "10px",
        border: "1px solid #e2e6ef",
        background: "white",
        marginTop: "3%",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-2">
        <FaShieldAlt size={20} color="#0066cc" />
        <h5 className="fw-bold m-0">Trip Secure</h5>
      </div>

      {error && (
        <div
          className="p-2 mb-3"
          style={{
            background: "#ffe6e6",
            border: "1px solid #ffb3b3",
            borderRadius: "6px",
            color: "#cc0000",
            fontSize: "14px",
          }}
        >
          ⚠️ Please select Yes or No above to continue.
        </div>
      )}

      <div className="p-2" style={{ background: "#f4f4ff", borderRadius: "6px" }}>
        ₹ 199 <span className="text-muted">/Traveller (18% GST included)</span>
      </div>

      <div className="mt-3">
        <label className="d-flex gap-2 align-items-center">
          <input
            type="radio"
            checked={selected === "yes"}
            onChange={() => handleSelect("yes")}
          />
          <span>Yes, Secure my trip.</span>
        </label>

        {selected === "yes" && (
          <div
            className="p-2 mt-2"
            style={{
              background: "#d3ffe0",
              borderRadius: "6px",
              border: "1px solid #9ff5b8",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "600",
            }}
          >
            <FaCheckCircle color="green" />
            Great! Your trip is secured.
          </div>
        )}
      </div>

      <div className="mt-3">
        <label className="d-flex gap-2 align-items-center">
          <input
            type="radio"
            checked={selected === "no"}
            onChange={() => handleSelect("no")}
          />
          <span>No, I will book without trip secure.</span>
        </label>
      </div>
    </div>
  );
};

export default TripSecure;
