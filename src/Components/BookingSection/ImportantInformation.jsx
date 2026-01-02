import React from "react";
import { Info, InfoIcon } from "lucide-react";

const InfoBlock = ({ title, points }) => (
  <div
    className="p-3 mb-4"
    style={{
      background: "#f8fafc",
      borderRadius: "8px",
      border: "1px solid #e2e6ef",
    }}
  >
    <div className="d-flex align-items-center gap-2 mb-2">
      <Info size={18} color="#0d6efd" />
      <h6 className="fw-bold m-0">{title}</h6>
    </div>

    <ul className="mb-0 ps-4 small text-muted">
      {points.map((item, idx) => (
        <li key={idx} className="mb-1">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const ImportantInformation = () => {
  return (
    <div
  className="p-3 mt-4"
  style={{
    borderRadius: "14px",
    border: "1px solid #e2e6ef",
    background: "linear-gradient(180deg, #ffffff, #f9fbff)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  }}
>
  <h4 className="fw-bold mb-4" style={{ color: "#1f2d3d" }}>
    Important Information
  </h4>

  {/* ===== CARD ITEM ===== */}
  <div
    className="mb-4 p-3"
    style={{
      borderRadius: "10px",
      background: "#ffffff",
      border: "1px solid #edf0f7",
    }}
  >
    <div className="d-flex align-items-center gap-3 mb-2">
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#e8f1ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0d6efd",
        }}
      >
        <InfoIcon />
      </div>

      <h6 className="fw-bold m-0">
        Travel Guidelines & Baggage
      </h6>
    </div>

    <ul className="mb-0 ps-4 text-muted">
      <li>
        Carry no more than <b>1 check-in</b> and <b>1 hand baggage</b> per
        passenger. Airlines may levy extra charges if violated.
      </li>
    </ul>
  </div>

  {/* ===== CARD ITEM ===== */}
  <div
    className="mb-4 p-3"
    style={{
      borderRadius: "10px",
      background: "#ffffff",
      border: "1px solid #edf0f7",
    }}
  >
    <div className="d-flex align-items-center gap-3 mb-2">
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#fff4e5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f59f00",
        }}
      >
        <InfoIcon />
      </div>

      <h6 className="fw-bold m-0">
        Boarding Pass Availability
      </h6>
    </div>

    <ul className="mb-0 ps-4 text-muted">
      <li>
        After successful web check-in, your boarding pass will be available
        within <b>6 hours</b> of flight departure.
      </li>
    </ul>
  </div>

  {/* ===== CARD ITEM ===== */}
  <div
    className="p-3"
    style={{
      borderRadius: "10px",
      background: "#ffffff",
      border: "1px solid #edf0f7",
    }}
  >
    <div className="d-flex align-items-center gap-3 mb-2">
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#fdecec",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d63384",
        }}
      >
        <InfoIcon />
      </div>

      <h6 className="fw-bold m-0">
        Unaccompanied Minors
      </h6>
    </div>

    <ul className="mb-0 ps-4 text-muted">
      <li>
        An unaccompanied minor refers to a child traveling without an adult
        aged <b>18 years or above</b>.
      </li>
      <li>
        Airline rules for unaccompanied minors may vary — please verify
        directly with the airline before booking.
      </li>
    </ul>
  </div>
</div>
  );
};

export default ImportantInformation;
