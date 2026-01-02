import React from "react";
import { useLocation } from "react-router-dom";
import CompletedLeftDetails from "./CompletedLeftDetails";
import CompletedRightDetails from "./CompletedRightDetails";


export default function CompletedBookingDetails() {
  const { state } = useLocation();
  const flight = state?.flight || null;

  return (
    <div
      style={{
        background: `
          linear-gradient(
            to bottom,
            #021021 0%,
            #021021 10%,
            #092444ff 20%,
            #0c2f4eff 25%,
            #1a406aff 32%,
            #14355bff 40%,
            #E5EEF4 40%,
            #E5EEF4 100%
          )
        `,
      }}
    >
      <div className="container py-5" style={{ maxWidth: "1100px" }}>

        {/* ======================================================
                      🔥 TOP SUCCESS BANNER (NEW)
        ======================================================= */}
        <div
          style={{
            background: "#E6FFFA",
            padding: "20px 25px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            border: "1px solid #d4f3ef",
            borderBottom: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div>
            <h5
              style={{
                margin: 0,
                color: "#0b6b61",
                fontWeight: "700",
              }}
            >
              {flight?.journeyMessage || "Hope you had a nice journey!"}
            </h5>

            <div className="text-muted small mt-1">
              Booking ID-{flight?.bookingId}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="small fw-semibold text-muted">
            Booked on {flight?.bookingDate || "—"}
          </div>
        </div>

        {/* ======================================================
                       LEFT + RIGHT MAIN LAYOUT
        ======================================================= */}
        <div className="row">

          {/* LEFT SECTION */}
          <div className="col-md-8">
            <CompletedLeftDetails flight={flight} />
          </div>

          {/* RIGHT SECTION */}
          <div className="col-md-4">
            <CompletedRightDetails flight={flight} />
          </div>

        </div>
      </div>
    </div>
  );
}
