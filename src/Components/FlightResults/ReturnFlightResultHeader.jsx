import React from "react";

const ReturnFlightResultHeader = ({ searchData, direction = "onward" }) => {
  if (!searchData) return null;

  const { fromCity, toCity, returnDate } = searchData;

  // Convert object → readable string
  const formatCity = (c) => {
    if (!c) return "";
    if (typeof c === "string") return c;
    return `${c.city} (${c.code})`;
  };

  const readableFrom = formatCity(fromCity);
  const readableTo = formatCity(toCity);

  const routeText =
    direction === "onward"
      ? `${readableFrom} → ${readableTo}`
      : `${readableTo} → ${readableFrom}`;

  // Format date
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div
      className="mx-auto shadow-sm overflow-hidden border border-gray-200"
      style={{
        borderRadius: "10px",
        background: "linear-gradient(to bottom right, #f9fbff, #eef4ff)",
        width: "100%",
        height: "88px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(to right, #08e9fd, #49b0fd)",
          color: "#fff",
          padding: "6px 12px",
          fontSize: "13px",
          height: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
        }}
      >
        ✈️ {routeText}
        <span style={{ fontSize: "12px" }}>{formatDate(returnDate)}</span>
      </div>

      {/* Column heads */}
      <div
        style={{
          background: "linear-gradient(to right, #f0f6ff, #e7efff)",
          padding: "6px 10px",
          fontSize: "12px",
          fontWeight: 600,
          color: "#374151",
          display: "flex",
          justifyContent: "space-between",
          height: "48px",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>Departure</div>
        <div style={{ flex: 1, textAlign: "center" }}>Duration</div>
        <div style={{ flex: 1, textAlign: "center" }}>Arrival</div>
        <div style={{ flex: 1, textAlign: "right" }}>Price ↑</div>
      </div>
    </div>
  );
};

export default ReturnFlightResultHeader;
