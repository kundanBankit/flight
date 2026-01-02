import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";   // ✅ THIS LINE REQUIRED


export default function CompletedLeftDetails({ flight }) {
  const [open, setOpen] = useState(false);

  if (!flight) return <div>No flight data</div>;

  return (
    <>
      {/* CARD 1 — FLIGHT SUMMARY */}
      <div
        className="card shadow-sm mb-4"
        style={{
          borderRadius: "12px",
          border: "1px solid #e5e5e5",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* HEADER */}
        <div
          className="d-flex justify-content-between align-items-center px-3 py-3"
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          <div className="fw-bold" style={{ fontSize: "20px" }}>
            {flight.fromCity} <span className="text-muted">→ {flight.toCity}</span>{" "}
            <span className="text-muted small">
              • {flight.travellers?.length || 1} Traveller(s) • {flight.stopType || "Non-stop"}
            </span>
          </div>

          {open ? (
            <FaChevronUp size={18} className="text-primary" />
          ) : (
            <FaChevronDown size={18} className="text-primary" />
          )}
        </div>

        {!open && <div style={{ borderTop: "1px solid #eee" }} />}

        {/* EXPANDED */}
        {open && (
          <div className="p-3">

            {/* AIRLINE */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <img
                src={flight.airlineLogo}
                width={45}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  padding: "2px",
                }}
                alt="airline"
              />
              <div>
                <div className="fw-bold" style={{ fontSize: "18px" }}>
                  {flight.airlineName} • {flight.flightNumber}
                </div>
                <span className="badge bg-success px-3 py-2 rounded-pill">{flight.status}</span>
              </div>
            </div>

            {/* TIME ROW */}
            <div className="d-flex justify-content-between align-items-start mb-4">

              {/* DEPARTURE */}
              <div>
  <div className="fw-bold" style={{ fontSize: "16px" }}>
    {flight.fromCity} - {flight.fromAirport}
  </div>

  {/* TIME + DAY + DATE — EXACT UI LIKE IMAGE */}
  <div className="small">
    <span style={{ fontWeight: 700, fontSize: "16px" }}>
      {flight.departureTime}
    </span>
    <span className="text-muted" style={{ marginLeft: "4px" }}>
       ,{flight.departureDay},
    </span>
    <span className="text-muted" style={{ marginLeft: "4px" }}>
      {flight.departureDate}
    </span>
  </div>

  <div className="small">{flight.fromAirportName}</div>
  <div className="text-muted small">{flight.fromTerminal}</div>
</div>


              {/* DURATION */}
              <div className="text-center">
                <div className="text-muted small">{flight.duration}</div>
                <div
    style={{
      width: "60px",
      height: "1px",
      background: "#dcdcdc",
      margin: "4px auto",
    }}
  ></div>
                <div className="small">{flight.stops}</div>
              </div>

              {/* ARRIVAL */}
              <div>
                <div className="fw-bold">{flight.toCity}</div>
<div className="text-muted small">
  {flight.arrivalDate} • {flight.arrivalTime}
</div>
                <div className="small">{flight.toAirportName}</div>
              </div>
            </div>

            {/* PNR */}
            <div className="small mb-2">
              <strong>PNR:</strong> <span className="fw-semibold">{flight.pnr}</span>
            </div>

            <hr />

            {/* BAGGAGE + FARE */}
            <div className="row small mb-3">

              <div className="col-md-6">
                <strong>Baggage allowance</strong>

                <div className="mt-1">
                  🧳 Cabin Bag:{" "}
                  <span className="text-danger">
                    {flight.cabinBag || "Details not available"}
                  </span>
                </div>

                <div>
                  🧳 Check-in Bag:{" "}
                  <span className="text-danger">
                    {flight.checkinBag || "Details not available"}
                  </span>
                </div>
              </div>

              <div className="col-md-6">
                <strong>Fare type</strong>

                <div className="mt-1">💺 {flight.fareClass || "Economy"}</div>
                <div>📄 {flight.fareType || "Regular Fare"}</div>
                <div>🏷 {flight.fareCode || "ECOVALU"}</div>
              </div>

            </div>

            <hr />

            {/* TRAVELLER DETAILS */}
            <div className="fw-bold mb-2">Traveller Details</div>

            <div
              className="p-3 rounded"
              style={{
                background: "#F8F8F8",
                border: "1px solid #E0E0E0",
              }}
            >
              <div className="row small">
                
                <div className="col-md-3 d-flex gap-2">
                  <FaUser size={20} />
                  <div>
                    <div className="fw-semibold">{flight.travellerName}</div>
                    <div className="text-muted">{flight.travellerInfo}</div>
                  </div>
                </div>

                <div className="col-md-3">
                  <strong>PNR/E-Ticket No.</strong>
                  <div>{flight.pnr}</div>
                  <div className="text-muted">{flight.ticketNo}</div>
                </div>

                <div className="col-md-2">
                  <strong>Seat</strong>
                  <div>{flight.seat || "-"}</div>
                </div>

                <div className="col-md-2">
                  <strong>Meal</strong>
                  <div>{flight.meal || "-"}</div>
                </div>

                <div className="col-md-2">
                  <strong>Excess Baggage</strong>
                  <div>{flight.excessBag || "-"}</div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      

      {/* CARD 3 — PRIMARY CONTACT */}
      <div className="card shadow-sm mb-4" style={{ borderRadius: "12px" }}>
        <div className="p-3 fw-bold">PRIMARY CONTACT DETAILS</div>

        <div className="px-3 small text-muted">
          This is your primary contact, you cannot change it.
        </div>

        <div className="p-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <FaUser /> <span className="fw-semibold">{flight.travellerName}</span>
          </div>

          <div className="d-flex align-items-center gap-2 mb-2">
            <FaEnvelope /> {flight.email}
          </div>

          <div className="d-flex align-items-center gap-2">
            <FaPhone /> {flight.phone}
          </div>
        </div>

      </div>
    </>
  );
}
