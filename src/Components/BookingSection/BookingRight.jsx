import React, { useState } from "react";

const BookingRight = ({ flight, otherServices }) => {
  const selectedFare = flight?.fares?.[0];

  if (!selectedFare) {
    return (
      <div className="p-4 text-center text-danger fw-bold">
        ❌ No fare data found
      </div>
    );
  }

  // ------------------------
  // FARE VALUES
  // ------------------------
  const baseFare = selectedFare.baseFare ?? 0;
  const tax = selectedFare.tax ?? 0;

  const meals = otherServices?.meals || 0;
  const seats = otherServices?.seats || 0;
  const tripSecure = otherServices?.tripSecure || 0;

  const otherTotal = meals + seats + tripSecure;
  const totalAmount = baseFare + tax + otherTotal;

  // ------------------------
  // COLLAPSE STATE
  // ------------------------
  const [open, setOpen] = useState({
    baseFare: false,
    taxes: false,
    other: false,
  });

  const toggle = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <h4 className="fw-bold mb-3">Fare Summary</h4>

      <div
        className="p-3"
        style={{
          borderRadius: "12px",
          border: "1px solid #e5e5e5",
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {/* ================= BASE FARE ================= */}
        <HeaderRow
          label="Base Fare"
          value={baseFare}
          open={open.baseFare}
          onClick={() => toggle("baseFare")}
        />

        {open.baseFare && (
          <div className="ms-3 mt-2 text-muted small">
            <SubRow label="Adult(s)" value={baseFare} />
          </div>
        )}

        <hr />

        {/* ================= TAXES ================= */}
        <HeaderRow
          label="Taxes and Surcharges"
          value={tax}
          open={open.taxes}
          onClick={() => toggle("taxes")}
        />

        {open.taxes && (
          <div className="ms-3 mt-2 text-muted small">
            <SubRow label="Airline Taxes & Charges" value={tax} />
          </div>
        )}

        {/* ================= OTHER SERVICES ================= */}
        {otherTotal > 0 && (
          <>
            <hr />
            <HeaderRow
              label="Other Services"
              value={otherTotal}
              open={open.other}
              onClick={() => toggle("other")}
            />

            {open.other && (
              <div className="ms-3 mt-2 text-muted small">
                {meals > 0 && <SubRow label="Meals" value={meals} />}
                {seats > 0 && <SubRow label="Seats" value={seats} />}
                {tripSecure > 0 && (
                  <SubRow label="Trip Secure" value={tripSecure} />
                )}
              </div>
            )}
          </>
        )}

        <hr />

        {/* ================= TOTAL ================= */}
        <div className="d-flex justify-content-between mt-3">
          <span className="fw-bold fs-5">Total Amount</span>
          <span className="fw-bold fs-4 text-primary">
            ₹ {totalAmount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </>
  );
};

export default BookingRight;

/* =====================================================
   HELPER COMPONENTS
===================================================== */

const HeaderRow = ({ label, value, open, onClick }) => (
  <div
    onClick={onClick}
    className="d-flex justify-content-between align-items-center"
    style={{ cursor: "pointer" }}
  >
    <span className="fw-bold">
      {open ? "−" : "+"} {label}
    </span>
    <span className="fw-bold">
      ₹ {value.toLocaleString("en-IN")}
    </span>
  </div>
);

const SubRow = ({ label, value }) => (
  <div className="d-flex justify-content-between">
    <span>{label}</span>
    <span>₹ {value.toLocaleString("en-IN")}</span>
  </div>
);
