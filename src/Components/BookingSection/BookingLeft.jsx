import React, { useState, useEffect } from "react";
import TravellerDetails from "./TravellerDetails";
import TripSecure from "./TripSecure";
import PolicyModal from "./PolicyModal";
import BaggageModal from "./BaggageModal";
import TravellerSummary from "./TravellerSummary";
import flightService from "../../api/flightService";
import { SegmentTooltip } from "./SegmentTooltip";
import ImportantInformation from "./ImportantInformation";
import FlightReviewCard from "./FlightReviewCard";

const InfoIcon = () => (
  <span
    style={{
      background: "#ff6b6b",
      padding: "8px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M12 2L4 5V11C4 16.52 7.84 21.74 12 23C16.16 21.74 20 16.52 20 11V5L12 2ZM12 12.75H8.75V10.75H12V7.5L16.5 12L12 16.5V12.75Z" />
    </svg>
  </span>
);

const BookingLeft = ({ flight, mappedReview }) => {
  const mapped = mappedReview ?? {};
  const flightData = flight ?? {};
  const reviewFlight = mapped?.flights || [];
  const priceId = reviewFlight?.[0]?.fareDetails?.priceId || "";
  const [fareRules, setFareRules] = useState(null);
  const [loadingFare, setLoadingFare] = useState(false);
  const [extraBaggage, setExtraBaggage] = useState(null);

  console.log("BookingLeft reviewFlight:", reviewFlight);

  const airlineCode =
    flight?.segments?.[0]?.airlineCode ||
    flight?.airlineCode ||
    flight?.airline;

  const handleFareRule = async () => {
    try {
      setLoadingFare(true);

      if (!priceId) {
        alert("❌ No priceId found for Fare Rules");
        return;
      }

      const res = await flightService.fetchFareRules(priceId);

      console.log("📘 Fare Rule API response:", res);
      setFareRules(res);
      setShowPolicyModal(true);
    } catch (err) {
      console.error("❌ Fare rule error:", err);
      alert("Failed to load fare rules.");
    } finally {
      setLoadingFare(false);
    }
  };

  const calculateTotalDuration = (segments = []) =>
    segments.reduce(
      (sum, s) =>
        sum + (s.durationMinutes || 0) + (s.connectionTimeMinutes || 0),
      0
    );

  const getFirstLastSegment = (segments = []) => ({
    first: segments[0],
    last: segments[segments.length - 1],
  });

  const extractKg = (str = "") => Number(String(str).match(/\d+/)?.[0] || 0);

  console.log("BookingLeft mapped:", mapped);
  console.log("BookingLeft flightData:", flightData);
  console.log("BookingLeft reviewFlight:", reviewFlight);
  // console.log("BookingLeft segments:", segments);
  console.log("BookingLeft priceId:", priceId);

  // Scroll to traveller section if requested
  useEffect(() => {
    if (location.state?.scrollTo === "traveller") {
      const el = document.getElementById("traveller-section");
      setTimeout(() => {
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [location.state]);

  // ------------------------
  // STATES
  // ------------------------
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showBaggageModal, setShowBaggageModal] = useState(false);
  const [showTravellerForm, setShowTravellerForm] = useState(true);

  // If no flight, prevent crashes

  if (!flight || !mapped) {
    return (
      <div className="p-4 text-center text-danger fw-bold">
        ❌ Missing flight data. Go back and select again.
      </div>
    );
  }

  return (
    <>
      <h3 className="fw-bold mb-4">Complete your booking</h3>

      {/* ############################
                MAIN FLIGHT CARD
          ############################ */}

      {reviewFlight.map((flightMapped, flightIndex) => (
        <FlightReviewCard
          key={flightIndex}
          flightMapped={flightMapped}
          handleFareRule={handleFareRule}
          loadingFare={loadingFare}
          extraBaggage={extraBaggage}
          setShowBaggageModal={setShowBaggageModal}
          calculateTotalDuration={calculateTotalDuration}
          getFirstLastSegment={getFirstLastSegment}
          extractKg={extractKg}
        />
      ))}

      {/* POLICY SECTION */}
      <div
        className="d-flex justify-content-between align-items-center p-3 mb-3"
        style={{
          background: "#f5f6ff",
          borderRadius: "8px",
          border: "1px solid #e2e4f6",
        }}
      >
        <h6 className="fw-bold m-0">Cancellation & Date Change Policy</h6>
        <span
          className="text-primary fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={handleFareRule}
        >
          {loadingFare ? "Loading..." : "View Policy"}
        </span>
      </div>

      

      {/* TRAVELLER DETAILS OR SUMMARY */}
      {showTravellerForm ? (
        <TravellerDetails flight={flight} mapped={mapped} />
      ) : (
        <TravellerSummary onEdit={() => setShowTravellerForm(true)} />
      )}

      {/* MODALS */}
      <PolicyModal
        show={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
        airline={airlineCode}
        fareRule={fareRules}
      />

      <BaggageModal
        show={showBaggageModal}
        onClose={() => setShowBaggageModal(false)}
        flight={flight}
        segments={reviewFlight?.[0]?.segments}
        onSelectBaggage={(data) => {
          setExtraBaggage(data);
          setShowBaggageModal(false);
        }}
      />
    </>
  );
};

export default BookingLeft;
