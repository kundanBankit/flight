import React, { useEffect, useState } from "react";

export default function ZeroCancellation({
  zeroCancellation = false,
  setZeroCancellation,
}) {
  const [checked, setChecked] = useState(zeroCancellation || false);

  // ✅ Keep local state in sync with parent
  useEffect(() => {
    setChecked(zeroCancellation);
  }, [zeroCancellation]);

  const handleChange = (e) => {
    const val = e.target.checked;
    setChecked(val);
    setZeroCancellation(val);
  };

  return (
    <div
      className="
        d-flex 
        justify-content-between 
        align-items-center 
        flex-wrap 
        mt-4 
        p-3 
        rounded-3 
        shadow-sm 
        gap-3
      "
      style={{
        background:
          "linear-gradient(to right, #f8fbff 0%, #eef6ff 60%, #e0f0ff 100%)",
        border: "1px solid #cce5ff",
        borderLeft: "4px solid #0d6efd",
        borderRadius: "10px",
        marginBottom: "20px",
        transition: "all 0.3s ease",
      }}
    >
      {/* Left Section */}
      <div
        className="
          form-check 
          d-flex 
          align-items-start 
          align-items-sm-center 
          m-0 
          flex-grow-1 
          text-start
        "
      >
        <input
          type="checkbox"
          className="form-check-input me-2 mt-1"
          id="zeroCancel"
          checked={checked}
          onChange={handleChange}
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            borderColor: "#0d6efd",
            flexShrink: 0,
            accentColor: "#0d6efd", // blue check color
          }}
        />
        <label
          htmlFor="zeroCancel"
          className="form-check-label flex-grow-1"
          style={{
            cursor: "pointer",
            lineHeight: "1.4",
          }}
        >
          <span className="fw-semibold text-dark d-block">
            Add Zero Cancellation
          </span>
          <span className="text-muted d-inline-block">
            Get 100% refund on cancellation{" "}
          </span>
          <a
            href="#"
            className="text-primary text-decoration-none fw-semibold ms-1"
          >
            View Details
          </a>
        </label>
      </div>

      {/* Right Badge */}
      <div
        className="
          d-flex 
          align-items-center 
          justify-content-center 
          order-first order-sm-last 
          mx-sm-0 mx-auto
        "
        style={{
          backgroundColor: "#7B61FF",
          color: "white",
          fontWeight: "bold",
          width: "32px",
          height: "32px",
          borderRadius: "4px",
          fontSize: "14px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          flexShrink: 0,
        }}
      >
        Z
      </div>
    </div>
  );
}
