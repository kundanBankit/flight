import React from "react";
import { Link } from "react-router-dom";
import { FaPlaneDeparture, FaUser } from "react-icons/fa";
import { MdFlight } from "react-icons/md";

export default function MyTripsCancelled({ flight: incomingFlight }) {

  // DEFAULT DATA
  const defaultFlight = {
  tripType: "One Way Flight",
  bookingId: "NN7ACBLM45931991368",
  status: "Cancelled",
  cancelledOn: "05 Apr 2025",
  refundStatus: "Refund Processed",

  airlineLogo:
    "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/SG.png",

  fromCity: "New Delhi",
  toCity: "Mumbai",
  returnCity: "Mumbai - New Delhi",

  departureDate: "03 Nov 2025",
  departureTime: "07:35 PM",
  arrivalDate: "03 Nov 2025",
  arrivalTime: "09:35 PM",
  duration: "4h 30m",

  fromAirport: "DEL",
  fromTerminal: "Terminal 3",
  toAirport: "BOM",

  airlineName: "Air India",
  airlineCode: "AI",
  flightNumber: "971",

  travellerName: "apurva gupta",
  email: "apurvagupta@gmail.com",
  phone: "9870675863",

  refundAmount: 3460,
  cancelledDate: "05 Apr 2024, 23:09",
  refundDate: "05 Apr 2024, 23:09",
  expectedDate: "12 Apr - 23 Apr",
  paymentMode: "AG105499",
  arnNumber: "74332744097409602708236",

  airlineContact: {
    phones: ["011-44667788", "1800-180-1407"],
  },

  price: {
    baseFare: 16185,
    taxes: 2955,
    convenienceFee: 1074,
    amountPaid: 18864,
  },

  paymentInfo: {
    totalAmount: 18864,
    transactionFee: 250,
    platformFee: 250,
  },
};


  

  const flight = incomingFlight || defaultFlight;

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
         minHeight: "100vh",
        paddingTop: "50px"
      }}
    >
      <div className="container py-5" style={{ maxWidth: "1100px" }}>
        <div
          className="card shadow-sm"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #e5e5e5",
          }}
        >

          {/* ===================== TOP ======================= */}
          <div className="d-flex justify-content-between align-items-start p-4 pb-3">

            {/* LEFT SIDE */}
            <div className="d-flex align-items-start gap-3">

              {/* FLIGHT ICON ROUND */}
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  background: "#fff",
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                <FaPlaneDeparture />
              </div>

              <div>
                <h5 className="fw-bold mb-1" style={{ fontSize: "18px" }}>
                  {flight.fromCity} → {flight.toCity}
                </h5>

                {/* BADGE + CANCEL DETAILS */}
                <div className="d-flex align-items-center gap-2">

                  {/* Refund Badge */}
                  <span
                    className="px-2 py-1 rounded"
                    style={{
                      background: "#ffeecb",
                      color: "#b36b00",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {flight.refundStatus}
                  </span>
                </div>

                <div className="text-muted small mt-1">
                  <span style={{ color: "red", fontWeight: 600 }}>
                    Cancelled on {flight.cancelledOn}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{flight.tripType}</span>
                  <span className="mx-2">•</span>
                  <span>Booking ID - {flight.bookingId}</span>
                </div>

                {/* Red Warning Bar */}
                <div
                  className="mt-2 p-2 rounded"
                  style={{
                    background: "#ffe0e0",
                    color: "#c70000",
                    fontSize: "13px",
                    width: "fit-content",
                  }}
                >
                  Your flight booking has been cancelled.
                </div>
              </div>
            </div>

            {/* RIGHT BUTTON */}
            <Link
              to="/my-trips/cancelled/details"
              state={{ flight }}
              className="btn btn-primary rounded-pill px-4"
              style={{
                background: "linear-gradient(to right, #00a7ff, #006eff)",
                fontWeight: 600,
                fontSize: "14px",
                height: "40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              VIEW BOOKING
            </Link>
          </div>

          {/* ===================== DIVIDER ======================= */}
          <div style={{ borderTop: "1px solid #eee" }}></div>

         

        </div>
      </div>
    </div>
  );
}
