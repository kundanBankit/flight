import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProceedToPay = () => {
  const { state } = useLocation();
const navigate = useNavigate();

  const flight = state?.flight;
  const travellers = state?.travellers || [];
  const otherServices = state?.otherServices || {};

  if (!flight) {
    return (
      <div className="p-5 text-center text-danger fw-bold">
        ❌ No booking data found. Please go back.
      </div>
    );
  }

  // PRICE CALCULATION
  const baseFare = flight?.fares?.[0]?.totalFare || 0;
  const meal = otherServices?.meals || 0;
  const convenienceFee = 360;

  const totalDue = baseFare + meal + convenienceFee;

  return (
    <div className="container my-4">
      <div className="row g-4">

        {/* ================= LEFT SECTION ================= */}
        <div className="col-lg-8">

          {/* FLIGHT + TRAVELLER CARD */}
          <div className="card p-4 mb-4 shadow-sm rounded-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="fw-bold mb-1">
                  {flight.departure.city} ({flight.departure.code}) →{" "}
                  {flight.arrival.city} ({flight.arrival.code})
                </h5>

                <div className="text-muted small">
                  Wed, 15 Oct •{" "}
                  {flight.segments?.[0]?.depTime} →{" "}
                  {flight.segments?.[0]?.arrTime} • Non-Stop
                </div>
              </div>

           <span
  className="text-primary fw-semibold"
  style={{ cursor: "pointer" }}
  onClick={() =>
    navigate("/booking-details", {
      state: {
        flight,
        travellers,
      },
    })
  }
>
  VIEW DETAILS ⌄
</span>

            </div>

            <hr />

            {/* PRIMARY TRAVELLER */}
            <div className="small text-muted">
              👤 <b className="text-dark">
                {travellers[0]?.firstName} {travellers[0]?.lastName}
              </b>{" "}
              (Primary)
              <br />
              📧 {travellers[0]?.email}
              <br />
              📞 {travellers[0]?.mobile}
            </div>
          </div>

          {/* CONTINUE BUTTON */}
          <button
            className="btn text-white fw-bold px-5 py-2 rounded-pill"
            style={{
              background: "linear-gradient(90deg, #4f9cff, #1b6cff)",
              fontSize: "16px",
            }}
          >
            CONTINUE
          </button>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="col-lg-4">
          <div className="card p-4 shadow-sm rounded-4">
            <h5 className="fw-bold mb-3">Total Due</h5>

            <PriceRow label="Fare" value={baseFare} />
            <PriceRow label="Convenience Fee" value={convenienceFee} />
            {meal > 0 && <PriceRow label="Meal" value={meal} />}

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5 text-success">
              <span>Total</span>
              <span>₹ {totalDue.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProceedToPay;

/* ================= HELPERS ================= */

const PriceRow = ({ label, value }) => (
  <div className="d-flex justify-content-between mb-2">
    <span className="text-muted">{label}</span>
    <span className="fw-semibold">
      ₹ {value.toLocaleString("en-IN")}
    </span>
  </div>
);
