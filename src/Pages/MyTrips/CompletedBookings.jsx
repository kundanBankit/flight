import React from "react";
import { Link } from "react-router-dom";
import { FaPlaneDeparture, FaUser } from "react-icons/fa";
import { MdFlight } from "react-icons/md";

export default function MyTripsCompleted({ flight: incomingFlight }) {

  // DEFAULT DUMMY DATA (fallback)
 const defaultFlight = {
  // BASIC INFO
  tripType: "One Way Flight",
  bookingId: "NN7ACBLM45931991368",
status: "Completed",  // or "Upcoming", "Cancelled"
journeyMessage: "Hope you had a nice journey!",
bookingDate: "17 Jan 2025",

  // CITY / AIRPORT INFO
  fromCity: "New Delhi",
  toCity: "Mumbai",
  fromAirportCode: "DEL",
  fromAirportName: "Indira Gandhi International Airport",
  fromTerminal: "Terminal 3",
  toAirportCode: "BOM",
  toAirportName: "Chhatrapati Shivaji Maharaj International Airport",
  toTerminal: "Terminal 2",

  // DATE & TIME
  departureDay: "Mon",
  departureDate: "03 Nov 2025",
  departureTime: "07:35 PM",
  arrivalDate: "03 Nov 2025",
  arrivalTime: "09:35 PM",
  duration: "4h 30m",
  stops: "Non-stop",

  // AIRLINE
  airlineName: "Air India",
  airlineCode: "AI",
  flightNumber: "971",
  airlineLogo:
    "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/SG.png",

  // PNR / TICKET
  pnr: "WPCSE6",
  eTicket: "098-9042709229",

  // TRAVELLER
  travellerName: "Apurva gupta",
email: "sakshi120795@gmail.com",
    phone: "9971672315",  travellerType: "Adult",
  gender: "Female",
  seat: "-",
  meal: "Vegetarian Hindu Meal",

  // BAGGAGE
  baggage: {
    cabin: "Details not available",
    checkin: "Details not available",
  },

  // FARE TYPE
  fare: {
    cabinClass: "Economy",
    fareType: "Regular Fare",
    fareFamily: "ECOVALU",
  },

  // PRICE BREAKUP (Right Sidebar)
  price: {
    baseFare: 16185,
    taxes: 2955,
    convenienceFee: 1074,
    amountPaid: 18864,
  },

  // PAYMENT INFO
  paymentInfo: {
    totalAmount: 18864,
    transactionFee: 250,
    platformFee: 250,
  },



  // AIRLINE CONTACT (Right Sidebar)
  airlineContact: {
    airline: "Air India",
    phones: ["+911169329333", "+911169329999"],
  },
};
  // FINAL FLIGHT DATA TO USE
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

          {/* TOP AREA */}
          <div className="d-flex justify-content-between align-items-start p-4 pb-3">

            {/* Left Flight Info */}
            <div className="d-flex align-items-start gap-3">

              {/* Flight Icon */}
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

                <div className="text-muted small d-flex align-items-center gap-2">
                     <span
    className={`fw-semibold text-${
      flight.status === "Completed"
        ? "success"
        : flight.status === "Upcoming"
        ? "primary"
        : "danger"
    }`}
  >
    {flight.status}
  </span>

  <span className="mx-2">•</span>
                  <span className="fw-semibold">{flight.tripType}</span>
                  <span>•</span>
                  <span>Booking ID - {flight.bookingId}</span>
                </div>
              </div>
            </div>

            {/* VIEW & MANAGE BOOKING */}
            <Link
  to="/my-trips/Completed/details"
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
              VIEW & MANAGE BOOKING
            </Link>
          </div>

          <div style={{ borderTop: "1px solid #eee" }}></div>

          {/* BOTTOM AREA */}
          <div className="p-4">
            <div className="row">

              {/* FROM */}
              <div className="col-md-4 mb-3">
                <div className="fw-bold">From</div>
                <div className="small mt-1">  {flight.departureDate} • {flight.departureTime}
</div>
                <div className="text-muted small">
                  {flight.fromAirport} - {flight.fromCity} {flight.fromTerminal}
                </div>
              </div>

              {/* TO */}
              <div className="col-md-4 mb-3">
                <div className="fw-bold">To</div>
                <div className="small mt-1">{flight.arrivalDate} • {flight.arrivalTime}</div>
                <div className="text-muted small">
                  {flight.toAirport} - {flight.toCity}
                </div>
              </div>

              {/* AIRLINE */}
              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center gap-2">
                  <MdFlight style={{ fontSize: "18px" }} />
                  <div className="fw-bold small">
                    {flight.airlineName} {flight.flightNumber}
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2 mt-1">
                  <FaUser style={{ fontSize: "14px" }} />
                  <div className="small">{flight.travellerName}</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
