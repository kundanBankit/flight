import React, { useEffect, useState } from "react";

const FareTypeSelector = ({
  fareType,
  setFareType,
  zeroCancellation = false,
  setZeroCancellation,
}) => {
  const fareOptions = [
    { key: "regular", label: "Regular" },
    { key: "student", label: "Student" },
    { key: "armed", label: "Armed Forces" },
    { key: "seniorCitizen", label: "Senior Citizen" },
    { key: "doctorAndNurses", label: "Doctor and Nurses" },
  ];

  // Local synced states
  const [activeFare, setActiveFare] = useState(fareType || "regular");
  const [checked, setChecked] = useState(zeroCancellation || false);

  // ✅ Sync with parent props
  useEffect(() => {
    if (fareType && fareType !== activeFare) {
      setActiveFare(fareType);
    }
  }, [fareType]);

  useEffect(() => {
    setChecked(zeroCancellation);
  }, [zeroCancellation]);

  // 🟢 Handle fare type change
  const handleFareChange = (key) => {
    setActiveFare(key);
    setFareType(key);
  };

  // 🟢 Handle zero cancellation
  const handleZeroCancelChange = (e) => {
    const val = e.target.checked;
    setChecked(val);
    setZeroCancellation(val);
  };

  return (
    <div
      className="fare-type-container d-flex align-items-center justify-content-start flex-wrap"
      style={{
        padding: "10px 15px",
        borderRadius: "8px",
        color: "#fff",
        fontSize: "14px",
        gap: "15px",
      }}
    >
      {/* Label */}
      <span style={{ color: "#cfd8e3", marginRight: "10px" }}>Fare Type:</span>

      {/* Fare Options */}
      <div
        className="d-flex flex-wrap align-items-center"
        style={{
          gap: "4px",
          borderRadius: "6px",
          backgroundColor: "#11273d",
          padding: "3px",
        }}
      >
        {fareOptions.map((fare) => (
          <button
            key={fare.key}
            onClick={() => handleFareChange(fare.key)}
            style={{
              backgroundColor:
                activeFare === fare.key ? "#112e52" : "transparent",
              color:
                activeFare === fare.key ? "#ffffff" : "rgba(255,255,255,0.7)",
              border:
                activeFare === fare.key
                  ? "1px solid #49b0fd"
                  : "1px solid rgba(255,255,255,0.2)",
              borderRadius: "6px",
              padding: "6px 14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            {activeFare === fare.key && (
              <span
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "7px",
                  backgroundColor: "#08e9fd",
                  borderRadius: "50%",
                  marginRight: "6px",
                }}
              ></span>
            )}
            {fare.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          width: "1px",
          height: "28px",
          backgroundColor: "rgba(255,255,255,0.3)",
          margin: "0 10px",
        }}
      ></div>

      {/* Zero Cancellation */}
      <label
        className="d-flex align-items-center gap-2"
        style={{
          backgroundColor: "#11273d",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleZeroCancelChange}
          style={{
            accentColor: "#08e9fd",
            width: "15px",
            height: "15px",
            cursor: "pointer",
          }}
        />
        <span style={{ color: "#fff", fontWeight: "500" }}>
          Zero Cancellation
        </span>
      </label>
    </div>
  );
};

export default FareTypeSelector;
