import React from "react";

export default function UpcomingRightSidebar({ flight }) {
  if (!flight) return null;

  return (
    <div className="d-flex flex-column gap-3">

      {/* ================================
            CARD 1 — Ticket(s)
      ================================ */}
      <div
        className="card shadow-sm"
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <div className="card-body">
          <h6 className="fw-bold mb-3">Ticket(s)</h6>

          <div
            className="d-flex align-items-center gap-2 text-primary fw-semibold"
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-download"></i> Download invoice(s)
          </div>
        </div>
      </div>

      {/* ================================
            CARD 2 — Airline Contact
      ================================ */}
      <div
        className="card shadow-sm"
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <div className="card-body">
          <h6 className="fw-bold mb-3">Airline Contact</h6>

          <div className="d-flex align-items-center gap-3 mb-2">
            <img
              src={flight.airlineLogo}
              alt={flight.airlineName}
              width={36}
              height={36}
              style={{ objectFit: "contain" }}
            />

            <div className="fw-semibold">
              {flight.airlineName || "Airline"}
            </div>
          </div>

          <div className="small text-muted">
            {flight.airlineContact?.phones?.join(", ") ||
              "Not available"}
          </div>
        </div>
      </div>

      {/* ================================
            CARD 3 — Price Breakup
      ================================ */}
      <div
        className="card shadow-sm"
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <div className="card-body">
          <h6 className="fw-bold mb-3">Price Breakup</h6>

          <div className="d-flex justify-content-between small mb-2">
            <span>Airline Base Fare</span>{" "}
            <strong>₹ {flight.price?.baseFare || 0}</strong>
          </div>

          <div className="d-flex justify-content-between small mb-2">
            <span>Airline Taxes</span>{" "}
            <strong>₹ {flight.price?.taxes || 0}</strong>
          </div>

          <div className="d-flex justify-content-between small mb-3">
            <span>Convenience Fee</span>{" "}
            <strong>₹ {flight.price?.convenienceFee || 0}</strong>
          </div>

          <hr />

          <div className="d-flex justify-content-between fw-bold mb-2">
            <span>Amount Paid</span>{" "}
            <span>₹ {flight.price?.amountPaid || 0}</span>
          </div>
        </div>
      </div>

      {/* ================================
            CARD 4 — Payment Information
      ================================ */}
      <div
        className="card shadow-sm"
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <div className="card-body">
          <h6 className="fw-bold mb-3">Payment Information</h6>

          <div className="d-flex justify-content-between small mb-2">
            <span>Total Amount</span>
            <strong>₹ {flight.paymentInfo?.totalAmount || 0}</strong>
          </div>

          <div className="d-flex justify-content-between small mb-2">
            <span>Transaction Fees</span>
            <strong>₹ {flight.paymentInfo?.transactionFee || 0}</strong>
          </div>

          <div className="d-flex justify-content-between small mb-2">
            <span>Platform Charges</span>
            <strong>₹ {flight.paymentInfo?.platformFee || 0}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
