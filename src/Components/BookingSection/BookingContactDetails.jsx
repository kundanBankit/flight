import React, { useState, useEffect, useRef } from "react";

const BookingContactDetails = ({ onValidate }) => {
  const [countryCode, setCountryCode] = useState("India (+91)");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const sectionRef = useRef(null);

  // Expose values & validation to parent
  useEffect(() => {
    onValidate({
      countryCode,
      mobile,
      email,
      ref: sectionRef
    });
  }, [countryCode, mobile, email]);

  return (
    <div
      ref={sectionRef}
      style={{
        border: "1px solid #e0e0e0",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <h5 style={{ fontWeight: 600, marginBottom: "18px" }}>
        Booking details will be sent to
      </h5>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* COUNTRY CODE */}
        <div style={{ flex: "1" }}>
          <label style={labelStyle}>Country Code *</label>
          <select
            style={selectStyle}
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option>India (+91)</option>
            <option>USA (+1)</option>
            <option>UK (+44)</option>
            <option>Canada (+1)</option>
            <option>Australia (+61)</option>
          </select>
        </div>

        {/* MOBILE */}
        <div style={{ flex: "2" }}>
          <label style={labelStyle}>Mobile No *</label>
          <input
            style={inputStyle}
            placeholder="Enter mobile no."
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* EMAIL */}
        <div style={{ flex: "2" }}>
          <label style={labelStyle}>Email *</label>
          <input
            style={inputStyle}
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <p style={{ marginTop: "10px", color: "#0B8A8A", fontWeight: 500 }}>
        Booking details & alerts will also be sent to <span style={{ fontWeight: 600 }}>Kundan</span>
      </p>
    </div>
  );
};

export default BookingContactDetails;

const labelStyle = {
  fontSize: "13px",
  fontWeight: 600,
  marginBottom: "6px",
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #d0d0d0",
  outline: "none",
  fontSize: "14px",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #d0d0d0",
  outline: "none",
  background: "#fff",
  fontSize: "14px",
};
