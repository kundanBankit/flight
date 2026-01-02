import React from "react";
import { useLocation } from "react-router-dom";

import CancelledLeftDetails from "./CancelledLeftDetails";
import CancelledRightDetail from "./CancelledRightDetails";

export default function CancelledBookingDetails() {
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
            background: "rgb(230, 255, 250)",
            padding: "20px 25px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            border: "1px solid eed461ff",
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
                color: "#f30909ff",
                fontWeight: "700",
              }}
            >
              {flight?.journeyMessage || "Your Flight booking has been cancelled!"}
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
            <CancelledLeftDetails flight={flight} />
          </div>

          {/* RIGHT SECTION */}
          <div className="col-md-4">
            <CancelledRightDetail flight={flight} />
          </div>

        </div>
      </div>
    </div>
  );
}
