import React from "react";
import { Card } from "react-bootstrap";
import airlineLogos from "../../utils/airlineLogos";

const FlightCardRoundTrip = ({
  direction,
  flights = [],
  selectedFlight,
  onSelectFlight,
}) => {
  // ⭐ CARD COMPONENT
  const FlightCard = ({ flight, selected, onSelect, group }) => {
    if (!flight?.segments?.length) return null;

    const first = flight.segments[0];
    const last = flight.segments[flight.segments.length - 1];

    // ⭐ UNIQUE KEY FOR PROPER SELECTION
    const uniqueKey =
      first.airlineCode +
      "_" +
      first.departure.datetime +
      "_" +
      (flight.fares?.[0]?.id || "");

    const airlineLogo =
      airlineLogos[first.airlineCode] || airlineLogos.DEFAULT;
    const airlineName = first.airlineName;

    const departureTime = new Date(
      first.departure.datetime
    ).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const arrivalTime = new Date(
      last.arrival.datetime
    ).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const fromCity = first.departure.city;
    const toCity = last.arrival.city;

    const totalMinutes = flight.segments.reduce(
      (sum, seg) => sum + (seg.duration || 0),
      0
    );
    const duration = `${Math.floor(totalMinutes / 60)}h ${
      totalMinutes % 60
    }m`;

    const stops = flight.segments.length - 1;
    const stopsText = stops === 0 ? "Non-stop" : `${stops} stop`;

    const price = flight.fares?.[0]?.baseFare ?? 0;

    return (
      <Card
        className="mb-3 shadow-sm border-0 flight-card"
        style={{
          borderRadius: "12px",
          cursor: "pointer",
          backgroundColor: selected ? "#e8f7ff" : "#fff",
          transition: "all 0.3s ease",
        }}
        // ⭐ FLIGHT SELECT WHEN CLICKED
        onClick={() => onSelect({ ...flight, uniqueKey })}
      >
        <Card.Body className="d-flex flex-wrap align-items-center justify-content-between gap-3 px-3 py-3">

          {/* Row 1: Airline + Price + Radio */}
          <div
            className="d-flex align-items-center justify-content-between mb-2"
            style={{ width: "100%" }}
          >
            <div className="d-flex align-items-center gap-2">
              <img
                src={airlineLogo}
                alt={airlineName}
                style={{ width: "36px", height: "36px", objectFit: "contain" }}
              />
              <span className="fw-semibold text-dark" style={{ fontSize: "15px" }}>
                {airlineName}
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <div className="text-end">
                <div className="fw-bold text-dark" style={{ fontSize: "16px" }}>
                  ₹ {price.toLocaleString("en-IN")}
                </div>
                <div className="text-secondary" style={{ fontSize: "12px" }}>
                  per adult
                </div>
              </div>

              {/* ⭐ RADIO BUTTON WITH CORRECT CHECKING */}
              <input
                type="radio"
                name={`radio-${group}`}
                checked={selected}
                onChange={() => onSelect({ ...flight, uniqueKey })}
                style={{
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* Row 2: Time + Duration + Stops */}
          <div
            className="d-flex align-items-center flex-grow-1 text-center"
            style={{
              justifyContent: "space-evenly",
              gap: "40px",
              minWidth: "240px",
            }}
          >
            <div>
              <div className="fw-bold text-dark" style={{ fontSize: "16px" }}>
                {departureTime}
              </div>
              <div className="text-secondary" style={{ fontSize: "13px" }}>
                {fromCity}
              </div>
            </div>

           <div className="text-center">
  {/* Duration */}
  <div className="text-secondary fw-semibold">{duration}</div>

  {/* Line + Dot */}
  <div
    className="position-relative mx-auto"
    style={{
      width: "120px",
      height: "2px",
      backgroundColor: "#f9b234",
      margin: "6px 0",
      borderRadius: "2px",
    }}
  >
    {stops > 0 && (
      <div
        className="position-absolute"
        style={{
          left: "50%",
          top: "-2px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#f9b234",
          transform: "translateX(-50%)",
        }}
      ></div>
    )}
  </div>

  {/* Stops text */}
  <div
    className="text-primary text-decoration-underline"
    style={{ fontSize: "12px", cursor: "pointer" }}
  >
    {stopsText}
  </div>
</div>


            <div>
              <div className="fw-bold text-dark" style={{ fontSize: "16px" }}>
                {arrivalTime}
              </div>
              <div className="text-secondary" style={{ fontSize: "13px" }}>
                {toCity}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  // ⭐ RENDER LIST  FLIGHTS
 // ⭐ RENDER LIST OF FLIGHTS
return (
  <div style={{ width: "100%", boxSizing: "border-box" }}>
    <h6 className="fw-semibold mb-3" style={{ color: "white" }}>
      {direction === "onward" ? "Onward Flights" : "Return Flights"}
    </h6>

    {(flights || []).map((flight, i) => {
      const first = flight.segments[0];

      const uniqueKey =
        first.airlineCode +
        "_" +
        first.departure.datetime +
        "_" +
        (flight.fares?.[0]?.id || "");

      return (
        <FlightCard
          key={i}
          flight={flight}
          selected={selectedFlight?.uniqueKey === uniqueKey}   // ⭐ FIXED
          onSelect={(f) => {
            const firstSeg = f.segments[0];
            const newKey =
              firstSeg.airlineCode +
              "_" +
              firstSeg.departure.datetime +
              "_" +
              (f.fares?.[0]?.id || "");
            onSelectFlight({ ...f, uniqueKey: newKey });       // ⭐ STORE UNIQUE KEY
          }}
          group={direction}
        />
      );
    })}
  </div>
);
};

export default FlightCardRoundTrip;
