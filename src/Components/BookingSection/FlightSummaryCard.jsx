import React from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const FlightSummaryCard = ({ flight }) => {
  const navigate = useNavigate();

  const fromCity = flight?.departCity || "";
const toCity = flight?.arrivalCity || "";


  const date =
    flight?.date1 ||
    flight?.arrivalDate ||
    flight?.travelDate ||
    "";

  const type =
    flight?.type1 ||
    flight?.flightType ||
    flight?.category ||
    "";

  const duration =
    flight?.duration1 ||
    flight?.duration ||
    "";

    
  return (
    <>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "8px",
          padding: "20px 24px",
          border: "1px solid #d8dce3",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          marginBottom: "16px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="fw-bold m-0">Flights Summary</h4>

          <IoChevronDownSharp
            size={22}
            color="#555"
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate("/booking-details", {
                state: { flight },
              })
            }
          />
        </div>

        <div style={{ marginTop: "14px" }}>
          <span style={{ fontWeight: "700" }}>
            {fromCity} → {toCity}
          </span>

          <span style={{ color: "#6e6e6e", marginLeft: "12px" }}>
            {date} · {type} · {duration}
          </span>
        </div>
      </div>
    </>
  );
};

export default FlightSummaryCard;
