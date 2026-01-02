// src/components/SeatsMealsTabs.jsx
import React, { useMemo, useState, useEffect } from "react";
import { FaChair } from "react-icons/fa";
import { GiChickenLeg } from "react-icons/gi";
// Import your seatinfo. Adjust path if you store the file elsewhere.
// import { seatData } from "../../data/seatinfo";
import flightFrontImg from "../../assets/Images/1.png";
import flightRearImg from "../../assets/Images/10.png";
import rightWingImg from "../../assets/Images/6.png";
import leftWingImg from "../../assets/Images/5.png";
import MealsComponent from "./MealsComponent";
import { useLocation } from "react-router-dom";




const SeatsMealsTabs = ({
  flight,
  activeTab,
  setActiveTab,
  onMealsTotalChange,
  onSeatsTotalChange,
}) => {
  const location = useLocation();

  // ✅ YAHAN SE LO
  const { mapped, seatmap, bookingId } = location.state || {};

  console.log("✅ mapped in SeatsMealsTabs:", mapped);
  console.log("🪑 seatmap:", seatmap);

  const meals =
    mapped?.flights?.[0]?.segments?.[0]?.meals || [];
  console.log("📦 SeatsMealsTabs received flight:", meals);

  // const { travellers, seatmap, bookingId } = location.state;
  console.log("🪑 SeatsMealsTabs seatmap:", seatmap);
  const seatData = seatmap;

  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    console.log("Selected seats:", selectedSeats);
  }, [selectedSeats]);

console.log("mapped", mapped);
 


  const seatBlockKey = useMemo(() => {
    // If the structure has numeric key we pick first key
    const tripSeat = seatData?.tripSeatMap?.tripSeat;
    if (!tripSeat) return null;
    const keys = Object.keys(tripSeat);
    return keys.length ? keys[0] : null;
  }, []);

  const block = seatBlockKey
    ? seatData?.tripSeatMap?.tripSeat?.[seatBlockKey]
    : null;
  const rows = block?.sData?.row || 0;
  const cols = block?.sData?.column || 0;
  const sInfo = block?.sInfo || [];

  // Convert sInfo array into a map: seatPosition.row -> column -> seat
  const seatMatrix = useMemo(() => {
    // initialize matrix with nulls
    const matrix = Array.from({ length: rows + 1 }, () =>
      Array.from({ length: cols + 1 }, () => null)
    ); // 1-based index
    sInfo.forEach((seat) => {
      const r = seat.seatPosition?.row;
      const c = seat.seatPosition?.column;
      if (typeof r === "number" && typeof c === "number") {
        matrix[r][c] = seat;
      }
    });
    return matrix;
  }, [rows, cols, sInfo]);

  // --- helper to toggle selection ---
  const toggleSeat = (seat) => {
    if (!seat || seat.isBooked) return;
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.code === seat.code);
      if (exists) {
        const next = prev.filter((s) => s.code !== seat.code);
        return next;
      } else {
        return [...prev, seat];
      }
    });
  };

  const totalPrice = selectedSeats.reduce((sum, s) => sum + (s.amount || 0), 0);

  useEffect(() => {
  onSeatsTotalChange?.(totalPrice);
}, [totalPrice]);


  // Determine an "exit" row if present in data (example: seats with iswca true might be exit). If none, pick a sensible row for marker.
  const exitRow = useMemo(() => {
    // find first row that contains any seat with iswca true or any special marker
    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        const seat = seatMatrix[r][c];
        if (seat && seat.iswca) return r;
      }
    }
    // fallback: approximate exit near middle
    return Math.max(1, Math.floor(rows * 0.65));
  }, [rows, cols, seatMatrix]);

  // Render helpers
  const renderSeat = (seat) => {
    if (!seat) return <div style={{ width: 20, height: 20 }} />;

    const isSelected = selectedSeats.some((s) => s.code === seat.code);
    const isBooked = seat.isBooked;
    const isLegroom = seat.isLegroom;

    let bg = "#f0f6ff",
      border = "1px solid #cfdfff",
      color = "#000";

    if (isBooked) {
      bg = "#e2e2e2";
      border = "1px solid #bfbfbf";
      color = "#7a7a7a";
    } else if (isSelected) {
      bg = "#0a66ff";
      border = "2px solid #0842c9";
      color = "#fff";
    } else if (isLegroom) {
      bg = "#ffefc5";
      border = "1px solid #e5c059";
    }

    return (
      <button
        onClick={() => toggleSeat(seat)}
        disabled={isBooked}
        title={`${seat.code} • ₹${seat.amount}`}
        style={{
          width: 36,
          height: 36,
          borderRadius: 6,
          border,
          background: bg,
          color,
          fontSize: 12,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: isBooked ? "not-allowed" : "pointer",
          position: "relative",
          padding: 0,
        }}
      >
        {seat.code}

        {!isBooked && (
          <div
            style={{
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 8,
              color: "#444",
              whiteSpace: "nowrap",
            }}
          >
            ₹{seat.amount}
          </div>
        )}

        {isBooked && (
          <div
            style={{
              position: "absolute",
              top: 2,
              right: 4,
              fontSize: 8,
              color: "#777",
            }}
          >
            ×
          </div>
        )}
      </button>
    );
  };

  // Build rows (super small spacing)
  const seatRowsJsx = [];

  for (let r = 1; r <= rows; r++) {
    const colsJsx = [];

    for (let c = 1; c <= cols; c++) {
      const seat = seatMatrix[r][c];

      colsJsx.push(
        <div
          key={`r${r}c${c}`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {renderSeat(seat)}
        </div>
      );

      // Aisle gap after C column
      if (cols === 7 && c === 3) {
        colsJsx.push(
          <div
            key={`aisle-${r}`}
            style={{
              width: 14,
              height: 28,
            }}
          />
        );
      }
    }

    seatRowsJsx.push(
      <div
        key={`row-${r}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          marginBottom: 10,
        }}
      >
        {/* left row number */}
        <div
          style={{
            width: 18,
            textAlign: "right",
            paddingRight: 4,
            fontSize: 8,
            color: "#666",
          }}
        >
          {r}
        </div>

        <div style={{ display: "flex", gap: 4 }}>{colsJsx}</div>

        {/* right row number */}
        <div style={{ width: 18, fontSize: 8, paddingLeft: 4, color: "#666" }}>
          {r}
        </div>
      </div>
    );
  }

  const pageWrapper = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    background: "#fff",
  };

  const contentWrapper = {
    width: "100%",
    maxWidth: "1400px", // ⭐ prevents monitor stretching
    margin: "0 auto",
    // padding: "0 20px",
  };

  return (

      <div
        style={{
          background: "#ffffff",
          borderRadius: "8px",
          padding: "20px 24px",
          border: "1px solid #d8dce3",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          marginBottom: "16px",
        }}
      >
    <div style={pageWrapper}>
      <div style={contentWrapper}>
        {/* ...your existing component JSX... */}

        <div
          // style={{
          //   background: "#ffffffff",
          //   borderRadius: 8,
          //   padding: 0,
          //   border: "1px solid #e3e7ef",
          // }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 24,
              borderBottom: "1px solid #e08f8fff",
              paddingBottom: 12,
            }}
          >
            <div
              onClick={() => setActiveTab("seats")}
              style={{
                cursor: "pointer",
                fontWeight: activeTab === "seats" ? 700 : 600,
                color: activeTab === "seats" ? "#212529" : "#444",
                paddingBottom: 6,
                borderBottom: activeTab === "seats" ? "3px solid #212529" : "0",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <FaChair />
              Seats
            </div>
            <div
              onClick={() => setActiveTab("meals")}
              style={{
                cursor: "pointer",
                fontWeight: activeTab === "meals" ? 700 : 600,
                color: activeTab === "meals" ? "#212529" : "#444",
                paddingBottom: 6,
                borderBottom: activeTab === "meals" ? "3px solid #212529" : "0",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <GiChickenLeg />
              Meals
            </div>
          </div>

          {/* Content */}
          <div style={{ marginTop: 16 }}>
            {activeTab === "seats" ? (
              <>
                <div
                  style={{
                    background: "#eef7ff",
                    borderRadius: 8,
                    padding: 12,
                    border: "1px solid #dbeefd",
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontWeight: 700 }}>
                    Less than 48 hours left to departure.
                  </div>
                  <div style={{ color: "#444" }}>
                    Pre-book your preferred seat now before they run out!
                  </div>
                </div>

                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <h5 style={{ margin: 0 }}>New Delhi → Bengaluru</h5>
                  <div style={{ color: "#d28100", fontWeight: 700 }}>
                    {selectedSeats.length > 0
                      ? `${selectedSeats.length} seat(s) selected`
                      : "Selection pending"}
                  </div>
                </div>

                {/* Front Section */}
<div className="d-flex justify-content-center mb-2">
  <img
    src={flightFrontImg}
    alt="Front"
    style={{
      width: "clamp(280px, 28vw, 480px)",
      objectFit: "contain"
    }}
  />
</div>

<div style={{ maxWidth: "1400px", margin: "0 auto" }}>
  <div className="row align-items-center gx-0">

    {/* Left Wing */}
    <div className="col-lg-3 d-none d-md-flex justify-content-end p-0">
      <img
        src={leftWingImg}
        alt="Left Wing"
        style={{ width: "clamp(200px, 20vw, 380px)", objectFit: "contain" }}
      />
    </div>

    {/* Seat Map */}
    <div className="col-lg-6 col-md-12 d-flex justify-content-center p-0">
      <div
        style={{
          maxHeight: "70vh",
          overflowY: "auto",
          width: "clamp(300px, 32vw, 500px)",
          background: "#E4DFE9",
          border: "1px solid #dfe6ff",
          padding: "8px",
          borderRadius: "8px"
        }}
      >
        {seatRowsJsx}
      </div>
    </div>

    {/* Right Wing */}
    <div className="col-lg-3 d-none d-md-flex justify-content-start p-0">
      <img
        src={rightWingImg}
        alt="Right Wing"
        style={{ width: "clamp(200px, 20vw, 380px)", objectFit: "contain" }}
      />
    </div>
  </div>
</div>

<div className="d-flex justify-content-center mt-2">
  <img
    src={flightRearImg}
    alt="Rear"
    style={{
      width: "clamp(280px, 28vw, 480px)",
      objectFit: "contain"
    }}
  />
</div>


                {/* Legend + Total */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 16,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    <Legend color="#0a66ff" text="Selected" />
                    <Legend
                      color="#fff3d6"
                      text="Legroom (Extra)"
                      border="#f1c94d"
                    />
                    <Legend color="#f6fbff" text="Available" border="#d8e7ff" />
                    <Legend color="#e8e8e8" text="Booked" />
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, color: "#666" }}>Total</div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#0a4ecf",
                        fontSize: 18,
                      }}
                    >
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </div>
                   

                    
                  </div>
                </div>
                
              </>
            ) : (
              <>
                {console.log(
                  "👉 Meals tab rendered — MealsComponent is loading",
                  flight
                )}

                <MealsComponent meals={meals} 
    onTotalChange={onMealsTotalChange}
  />

               
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const Legend = ({ color, text, border }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: 4,
        background: color,
        border: border || "1px solid #cfcfcf",
      }}
    />
    <div style={{ color: "#444", fontSize: 13 }}>{text}</div>
  </div>
);

export default SeatsMealsTabs;

<style>
  {`
  @media (min-width: 1600px) {
    .plane-img {
      max-width: 520px !important;
    }
    .seatmap-wrapper {
      max-width: 620px !important;
    }
  }

  @media (min-width: 1900px) {
    .plane-img {
      max-width: 600px !important;
    }
    .seatmap-wrapper {
      max-width: 680px !important;
    }
  }
`}
</style>;
