import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FareOptionsPopup from "../Components/FlightResults/FareOptionsPopup";
import {
  formatDateShort,
  formatDuration,
  formatTime,
} from "../utils/formatters";
import airlineLogos from "../utils/airlineLogos";

const ComparePage = () => {
  const { state } = useLocation();
  const flights = state?.flights || [];
  const length = flights.length;

  const [selectedFlight, setSelectedFlight] = useState(null);

  /* ---------------- LEFT SIDEBAR FEATURE LIST ---------------- */
  const featureList = [
    { icon: "✈️", label: "Flight summary" },
    { icon: "🛩️", label: "Fleet" },
    { icon: "💺", label: "Seating" },
    { icon: "🔌", label: "Power outlet" },
    { icon: "📺", label: "Infotainment" },
    { icon: "🍱", label: "Meals" },
    { icon: "🥤", label: "Beverages" },
    { icon: "🧳", label: "Cabin Bag" },
    { icon: "🎒", label: "Check In Bag" },
    { icon: "❌", label: "Cancellation" },
    { icon: "💲", label: "Price" },
  ];

 
  /* ---------------- TOOLTIPS ---------------- */
  useEffect(() => {
    document.querySelectorAll(".tooltip-box").forEach((el) => {
      const tip = el.querySelector(".tooltip-content");
      el.addEventListener(
        "mouseenter",
        () => (tip.style.visibility = "visible")
      );
      el.addEventListener(
        "mouseleave",
        () => (tip.style.visibility = "hidden")
      );
    });
  }, []);

  return (
    <div
      style={{
        background: `
          linear-gradient(
            to bottom,
            #021021 0%,
            #021021 5%,
            #092444 10%,
            #0c2f4e 15%,
            #1a406a 20%,
            #14355b 25%,
            #E5EEF4 25%,
            #E5EEF4 100%
          )
        `,
        padding: "30px 0",
        minHeight: "100vh",
      }}
    >
      {/* PAGE HEADER */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          color: "white",
          padding: "25px 40px",
          fontSize: "28px",
          fontWeight: "700",
        }}
      >
        Compare your flights
      </div>

      {/* ROUTE BOX */}
      <div
        className="mx-auto p-3 mb-4"
        style={{
          background: "white",
          borderRadius: "10px",
          width: "90%",
          padding: "12px 22px",
          fontSize: "13px",
          fontWeight: "500",
          color: "#083358",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {flights[0].departure.city}, {flights[0].departure.country} →{" "}
        {flights[0].arrival.city}, {flights[0].arrival.country} | Departure{" "}
        {formatDateShort(flights[0].departure.datetime)}
        <span>* Comparison is between base fares of each flights</span>
      </div>

      {/* MAIN WRAPPER */}
      <div
        className="mx-auto d-flex"
        style={{
          width: "90%",
          background: "white",
          borderRadius: "12px",
          minHeight: "500px",
          padding: "10px 10px",
        }}
      >
        {/* LEFT SIDEBAR */}
        <div
          style={{
            width: "260px",
            // borderRight: "2px solid #eee",
            padding: "25px 0",
          }}
        >
          {featureList.map((f, i) => (
            <div
              key={i}
              className="d-flex align-items-center gap-3 px-4 py-3"
              style={{
                fontSize: "15px",
                fontWeight: "500",
                // borderBottom: "1px solid #f1f1f1",
                color: "#444",
              }}
            >
              <span style={{ fontSize: "16px" }}>{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>

        {/* RIGHT COMPARISON AREA */}
        <div className="flex-grow-1 d-flex justify-content-around">
          {flights.map((f, i) => (
            <div
              key={i}
              style={{
                width: length === 2 ? "48%" : "33%",
                textAlign: "center",
                border: "2px solid #eee",
                borderRadius: "8px",
              }}
            >
              {/* TOP FLIGHT HEADER */}
              <div
                style={{
                  position: "sticky",
                  top: "50px",
                  zIndex: 20,
                  background: "white",
                  padding: "10px",
                  borderBottom: "2px solid #eee",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={airlineLogos[f.airlineCode] || airlineLogos.DEFAULT}
                  width={40}
                  alt={f.airlineName}
                />
                <div>
                  <div className="fw-bold mt-2">
                    {formatTime(f.departure.datetime)} →{" "}
                    {formatTime(f.arrival.datetime)}
                  </div>
                  <div className="text-muted small">
                    {formatDuration(f.duration)} • Non Stop
                  </div>
                </div>
              </div>

              {/* STATIC AIRCRAFT INFO */}
              <div
                className="text-muted"
                style={{
                  background: "white",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Airbus A321 | 3-3 Layout
              </div>

              <div
                className="text-muted"
                style={{
                  background: "white",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Information unavailable
              </div>

              {/* FEATURES MAPPED LIKE MMT */}
              <div
                className="text-muted"
                style={{
                  background: "white",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Information unavailable
              </div>
              <div
                className="text-muted"
                style={{
                  background: "white",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Information unavailable
              </div>
              <div
                className="text-muted"
                style={{
                  background: "white",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Information unavailable
              </div>
              <div
                className="text-muted"
                style={{
                  background: "white",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Information unavailable
              </div>
              <div
                className="text-muted"
                style={{
                  background: "white",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {f.fares[0].baggage.cabin}
              </div>
              <div
                className="text-muted"
                style={{
                  background: "white",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {f.fares[0].baggage.checkIn}
              </div>

              {/* REFUNDABILITY TOOLTIP */}
              <div
                className="fw-semibold text-success tooltip-box mb-2"
                style={{
                  background: "white",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "15px",
                }}
              >
                Partially Refundable
                <div
                  className="tooltip-content"
                  style={{
                    visibility: "hidden",
                    width: "219px",
                    background: "white",
                    color: "#333",
                    textAlign: "left",
                    borderRadius: "6px",
                    padding: "16px",
                    position: "absolute",
                    bottom: "130%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                    fontSize: "12px",
                  }}
                >
                  Cancellation fee starts at ₹4,999 (up to 2 hours before
                  departure)
                </div>
              </div>

              {/* PRICE */}
              <div
                className=" "
                style={{
                  background: "white",
                  padding: "16px",
                  fontWeight: "500",
                  fontSize: "14px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                ₹ {f.fares[0].baseFare}
                <span
                  className="text-muted"
                  style={{
                    background: "white",
                    padding: "0px 4px",
                    fontWeight: "500",
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  per adult
                </span>
              </div>

              <div style={{
                  background: "white",
                  padding: "16px",
                  fontWeight: "500",
                  fontSize: "14px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}>

              <div
                className="text-muted"
                style={{
                  fontSize: "12px",
                }}
              >
                {f.fares.length - 1} more fares available
              </div>

              {/* VIEW BUTTON */}
              <button
                onClick={() => setSelectedFlight(f)}
                className="m-1 fw-bold"
                style={{
                  background:
                    "linear-gradient(to right, rgb(8, 233, 253) 13%, rgb(73, 176, 253) 81%)",
                  color: "white",
                  border: "none",
                  fontSize: "12px",
                  padding: "6px 12px",
                  borderRadius: "30px",
                }}
              >
                VIEW ALL FARE OPTIONS
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFlight && (
        <FareOptionsPopup
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      )}
    </div>
  );
};

export default ComparePage;
