import React from "react";
import UpcomingLeftDetails from "./UpcomingLeftDetails";
import UpcomingRightSidebar from "./UpcomingRightSidebar";
import { useLocation } from "react-router-dom";

export default function UpcomingBookingDetails() {
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
      <div
        className="container py-5"
        style={{ maxWidth: "1100px" }}
      >


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
            

            <div className="text-muted small mt-1">
              Booking ID-{flight?.bookingId}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="small fw-semibold text-muted">
            Booked on {flight?.bookingDate || "—"}
          </div>
        </div>


        <div className="row">

          {/* LEFT SECTION */}
          <div className="col-md-8">
            <UpcomingLeftDetails flight={flight} />
          </div>

          {/* RIGHT SECTION */}
          <div className="col-md-4">
            <UpcomingRightSidebar flight={flight} />
          </div>

        </div>
      </div>
    </div>
  );
}
