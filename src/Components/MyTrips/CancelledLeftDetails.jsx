import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

export default function CancelledLeftDetails({ flight }) {
  const [open, setOpen] = useState(false);

  if (!flight) return <div>No flight data</div>;

  return (
    <>
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
            {flight.fromCity} → {flight.toCity}
            <span className="badge bg-warning text-dark ms-2">Cancelled</span>
          </div>

          {open ? (
            <FaChevronUp size={20} className="text-secondary" />
          ) : (
            <FaChevronDown size={20} className="text-secondary" />
          )}
        </div>

        {/* BODY */}
        {open && (
          <>
            {/* TOP RED STRIP */}
            

            <div className="p-3">

              {/* AIRLINE ROW */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={flight.airlineLogo}
                  width={55}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    padding: "2px",
                  }}
                />

                <div>
                  <div className="fw-bold" style={{ fontSize: "18px" }}>
                    {flight.airlineName} {flight.airlineCode}-{flight.flightNumber}
                  </div>
                  <div className="text-muted small">{flight.status}</div>
                </div>
              </div>

              {/* ********** FLIGHT LEG SECTION ********** */}
              <div className="d-flex justify-content-between align-items-start mb-4">

                {/* LEFT LEG → DELHI → MUMBAI */}
                <div style={{ width: "35%" }}>
                  <div className="fw-bold" style={{ fontSize: "16px" }}>
                    {flight.fromCity} - {flight.toCity}
                  </div>

                  <div className="fw-bold" style={{ fontSize: "17px" }}>
                    {flight.departureTime}, {flight.departureDate}
                  </div>

                  <div className="small text-muted">
                    {flight.fromAirportName}
                  </div>
                  <div className="small text-muted">{flight.fromTerminal}</div>

                  <div className="small mt-1 text-primary" style={{ cursor: "pointer" }}>
                    View Location
                  </div>
                </div>

                {/* CENTER → PLANE ICON + DURATION */}
                <div className="text-center" style={{ width: "30%" }}>
              <img 
  src="https://cdn-icons-png.flaticon.com/512/484/484167.png" 
  width={25} 
  className="mb-1"
/>

                  

                  <div
                    style={{
                      width: "60px",
                      height: "1px",
                      background: "#ccc",
                      margin: "4px auto",
                    }}
                  ></div>

<div className="small text-dark">{flight.duration}</div>
                  <div className="small text-dark">{flight.stops}</div>
                </div>

                {/* RIGHT LEG → MUMBAI → DELHI */}
                <div style={{ width: "35%", textAlign: "right" }}>
                  <div className="fw-bold">{flight.returnCity}</div>

                  <div className="fw-bold" style={{ fontSize: "17px" }}>
                    {flight.arrivalTime}, {flight.arrivalDate}
                  </div>

                  <div className="small text-muted">
                    {flight.toAirportName}
                  </div>
                </div>
              </div>

              {/* ********** BAGGAGE, ECONOMY ********** */}
              <div className="d-flex gap-4 small text-muted mb-3">

                <div>
                  <span className="me-1">💺</span> Economy
                </div>

                <div>
                  <span className="me-1">🛄</span>
                  Check-In: <span className="text-danger">Details Not Available</span>
                </div>

                <div>
                  <span className="me-1">🎒</span>
                  Carry On: <span className="text-danger">Details Not Available</span>
                </div>
              </div>

              {/* ********** TRAVELLER ********** */}
              <div
                className="p-3 rounded"
                style={{ background: "#fafafa", border: "1px solid #eee" }}
              >
                <div className="row small">

                  {/* TRAVELLER */}
                  <div className="col-md-3 d-flex gap-2">
                    <FaUser size={18} />
                    <div>
                      <div className="fw-semibold text-dark">{flight.travellerName}</div>
                      <div className="text-muted">(Cancelled)</div>
                    </div>
                  </div>

                  {/* PNR */}
                  <div className="col-md-3">
                    <strong>PNR/E-Ticket Number</strong>
                    <div>{flight.pnr}</div>
                    <div className="text-muted">{flight.ticketNo}</div>
                  </div>

                  {/* SEAT */}
                  <div className="col-md-2">
                    <strong>Seat</strong>
                    <div>-</div>
                  </div>

                  {/* MEAL */}
                  <div className="col-md-2">
                    <strong>Meal</strong>
                    <div>{flight.meal}</div>
                  </div>

                  {/* EXCESS BAGGAGE */}
                  <div className="col-md-2">
                    <strong>Excess Baggage</strong>
                    <div>-</div>
                  </div>

                </div>
              </div>

            </div>
          </>
        )}
      </div>

{/* CARD 2 — Refund Status */}
<div
  className="card shadow-sm mb-4"
  style={{
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
    overflow: "hidden",
  }}
>
  {/* Header */}
  <div className="p-3 fw-bold" style={{ fontSize: "18px" }}>
    Refund Status
  </div>

  <div className="px-3 pb-3" style={{ fontSize: "15px" }}>

    {/* 🔵 TOP LEFT TEXT + RIGHT SIDE LINKS */}
    <div className="d-flex justify-content-between align-items-start">

      {/* LEFT TEXT */}
      <div className="fw-semibold" style={{ width: "70%" }}>
        Booking for <span className="text-dark">{flight.travellerName}</span> was
        cancelled. A refund of{" "}
        <span className="fw-bold text-success">₹ {flight.refundAmount}</span> has
        been processed.
      </div>

      {/* RIGHT LINKS */}
      <div style={{ width: "28%" }}>
        {/* Link 1 */}
        <div
          className="d-flex align-items-center gap-2 mb-2"
          style={{ cursor: "pointer" }}
        >
          <span style={{ color: "#2a80ec", fontSize: "20px" }}>₹</span>
          <span
            className="text-primary fw-semibold"
            style={{ fontSize: "14px" }}
          >
            View Refund Breakup
          </span>
        </div>

        {/* Link 2 */}
        <div
          className="d-flex align-items-center gap-2"
          style={{ cursor: "pointer" }}
        >
<span style={{ color: "#2a80ec", fontSize: "20px" }}>ⓘ</span>
          <span
            className="text-primary fw-semibold"
            style={{ fontSize: "14px" }}
          >
            How to check refund in bank statement?
          </span>
        </div>
      </div>
    </div>

    {/* TIMELINE */}
    <div className="d-flex justify-content-between mt-4">

      {/* Step 1 */}
      <div className="text-center" style={{ width: "33%" }}>
        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            background: "#ffcc00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          ✔
        </div>
        <div className="fw-semibold mt-2">Booking cancelled</div>
        <div className="text-muted small">{flight.cancelledDate}</div>
      </div>

      {/* Step Line */}
      <div style={{ width: "33%", paddingTop: "20px" }}>
        <div
          style={{
            height: "4px",
            background: "#ffcc00",
            width: "100%",
            margin: "0 auto",
            borderRadius: "4px",
          }}
        ></div>
      </div>

      {/* Step 2 */}
      <div className="text-center" style={{ width: "33%" }}>
        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            background: "#ffcc00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          ✔
        </div>
        <div className="fw-semibold mt-2">Refund processed</div>
        <div className="fw-bold text-success">₹ {flight.refundAmount}</div>
        <div className="text-muted small">{flight.refundDate}</div>
      </div>

      {/* Step Line */}
      <div style={{ width: "33%", paddingTop: "20px" }}>
        <div
          style={{
            height: "4px",
            background: "#ffcc00",
            width: "100%",
            margin: "0 auto",
            borderRadius: "4px",
          }}
        ></div>
      </div>

      {/* Step 3 */}
      <div className="text-center" style={{ width: "33%" }}>
        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            background: "#ffcc00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          ✔
        </div>
        <div className="fw-semibold mt-2">Refund credited</div>
        <div className="text-muted small">Expected by {flight.expectedDate}</div>
      </div>
    </div>

    {/* ARN Section */}
    <div className="mt-4 small">
      <span className="fw-semibold">₹ {flight.refundAmount}</span> has been processed in{" "}
      <span className="badge bg-light text-dark">{flight.paymentMode}</span>.  
      You can trace the status using ARN number{" "}
      <span className="fw-bold">{flight.arnNumber}</span>.
    </div>

  </div>
</div>


{/* CARD 3 — CANCELLATION */}
<div
  className="card shadow-sm mb-4"
  style={{
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
    overflow: "hidden",
  }}
>
  {/* Left Orange Vertical Strip + Title */}
  <div className="d-flex align-items-center">
    
    {/* ORANGE STRIP */}
    <div
      style={{
        width: "6px",
        height: "100%",
        background: "#f3a300",
      }}
    ></div>

    {/* TITLE */}
    <div className="p-3 fw-bold" style={{ fontSize: "18px" }}>
      CANCELLATION
    </div>

  </div>

  {/* MESSAGE */}
  <div className="px-3 pb-3 small text-muted" style={{ fontSize: "15px" }}>
    You have already cancelled your booking.
  </div>
</div>


 {/* CARD 4 — BAGGAGE DETAILS */}
<div
  className="card shadow-sm mb-4"
  style={{
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
    overflow: "hidden",
  }}
>
  {/* HEADER SECTION WITH ORANGE STRIP */}
  <div className="d-flex align-items-center justify-content-between">

    {/* LEFT TITLE BLOCK */}
    <div className="d-flex align-items-center">
      <div
        style={{
          width: "6px",
          height: "100%",
          background: "#f3a300",
        }}
      ></div>

      <div className="p-3">
        <div className="fw-bold" style={{ fontSize: "18px" }}>
          BAGGAGE DETAILS
        </div>
        <div className="text-muted small">
          Baggage inclusions as per fare class booked.
        </div>
      </div>
    </div>

    {/* RIGHT SIDE LINK */}
    <div className="px-3 d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
      <span style={{ color: "#2a80ec", fontSize: "20px" }}>ⓘ</span>
      <span className="text-primary fw-semibold">
        {flight.airlineName?.toUpperCase()} Baggage Policy
      </span>
    </div>
  </div>

  {/* COLLAPSIBLE SECTION */}
  <div
    className="mx-3 p-2 mt-1"
    style={{
      background: "#f3f3f3",
      borderRadius: "6px",
      display: "flex",
      justifyContent: "space-between",
      cursor: "pointer",
      width: "40%"
    }}
  >
    <div className="fw-semibold">{flight.fromCity} - {flight.toCity}</div>
    <div className="fw-bold">⌃</div>
  </div>

  {/* BAGGAGE CONTENT */}
  <div className="px-3 py-3">

    <div className="d-flex gap-5">

      {/* CHECK-IN BAGGAGE */}
      <div className="text-center" style={{ width: "45%" }}>
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <img
            src="https://www.shutterstock.com/image-vector/airport-baggage-reclaim-line-icon-600nw-1734830186.jpg"
            width="50"
          />
        </div>

        <div className="fw-bold mt-2">Check In Baggage</div>
        <div className="text-danger fw-semibold small mt-1">
          Details Not Available
        </div>
      </div>

      {/* CARRY ON */}
      <div className="text-center" style={{ width: "45%" }}>
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW4q516mkZpVFk57BRYrIMT86WCC42eYplBQ&s"
            width="35"
          />
        </div>

        <div className="fw-bold mt-2">Carry On</div>
        <div className="text-danger fw-semibold small mt-1">
          Details Not Available
        </div>
      </div>

    </div>

    {/* INFO PARAGRAPH */}
    <div className="mt-3 small text-muted">
      • We are unable to fetch baggage details for your flight because of some
      technical reasons. Please verify your baggage details by visiting{" "}
      <b>{flight.airlineName}</b> website or contact airline directly at{" "}
      <span className="fw-semibold">011-49970000</span>.
    </div>

  </div>
</div>



       {/* CARD 5 — PRIMARY CONTACT */}
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
