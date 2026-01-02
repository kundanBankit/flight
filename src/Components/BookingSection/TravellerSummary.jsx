import React from "react";
import { useNavigate } from "react-router-dom";

const TravellerSummary = ({ travellers, flight, onEdit }) => {
  const navigate = useNavigate();

  if (!travellers || travellers.length === 0) return null;

  const fullName = `${travellers[0]?.firstName} ${travellers[0]?.lastName}`;

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(); // if parent wants custom behavior
    } else {
     navigate("/booking-details", {
  state: {
    flight,
    scrollTo: "traveller",
  },
});

    }
  };

  
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "8px",
        padding: "16px 20px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        marginBottom: "16px",
      }}
    >
      {/* TOP HEADER */}
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="fw-bold m-0">Traveller Details</h5>

        <span
          onClick={handleEditClick}
          style={{
            cursor: "pointer",
            color: "#007bff",
            fontSize: "20px",
          }}
          title="Edit Traveller Details"
        >
          ✏
        </span>
      </div>

      {/* TRAVELLER NAME */}
      <div
        style={{
          marginTop: "10px",
          fontSize: "16px",
          fontWeight: "500",
          color: "#444",
        }}
      >
        {fullName}
      </div>
    </div>
  );
};

export default TravellerSummary;
