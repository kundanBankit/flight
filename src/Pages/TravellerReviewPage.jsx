import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BookingLayout from "../Components/BookingSection/BookingLayout";
import FlightSummaryCard from "../Components/BookingSection/FlightSummaryCard";
import TravellerSummary from "../Components/BookingSection/TravellerSummary";
import SeatsMealsTabs from "../Components/BookingSection/SeatMealsTabs";
import BookingRight from "../Components/BookingSection/BookingRight";
import SeatSuggestionPopup from "../Components/BookingSection/SeatSuggestionPopup";

const TravellerReviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const flight = state?.flight;
  const travellers = state?.travellers;

  const [otherServices, setOtherServices] = useState({
    meals: 0,
    seats: 0,
    tripSecure: 0,
  });

  const [showSeatPopup, setShowSeatPopup] = useState(true);
  const [activeTab, setActiveTab] = useState("seats");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleMealsTotalChange = (amount) => {
    setOtherServices((prev) => ({ ...prev, meals: amount }));
  };

  const handleSeatsTotalChange = (amount) => {
    setOtherServices((prev) => ({ ...prev, seats: amount }));
  };

 const handleContinue = (e) => {
  e.preventDefault();      // 🔥 STOP FORM SUBMIT
  e.stopPropagation();     // 🔥 STOP BUBBLING

  if (activeTab === "seats") {
    setActiveTab("meals");
  } else {
    navigate("/booking-confirmation", {
      replace: true,
      state: {
        flight,
        travellers,
        otherServices,
      },
    });
  }
};


  if (!flight) {
    return (
      <div className="p-5 text-center text-danger fw-bold">
        ❌ Flight data missing. Please go back & try again.
      </div>
    );
  }

  return (
    <>
      <BookingLayout
        left={
          <div>
            <h3 className="fw-bold mb-4">Complete your booking</h3>

            <FlightSummaryCard flight={flight} />
            <TravellerSummary travellers={travellers} flight={flight} />

            <SeatsMealsTabs
              flight={flight}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onMealsTotalChange={handleMealsTotalChange}
              onSeatsTotalChange={handleSeatsTotalChange}
            />

            {/* 🔥 IMPORTANT FIX HERE */}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
             <button
  type="button"
  className="btn btn-primary px-4"
  onClick={handleContinue}
>
  {activeTab === "seats" ? "CONTINUE" : "PROCEED TO PAYMENT"}
</button>

            </div>
          </div>
        }
        right={
          <BookingRight
            flight={flight}
            otherServices={otherServices}
          />
        }
      />

      <SeatSuggestionPopup
        show={showSeatPopup}
        seat="19D"
        type="Aisle"
        price={403}
        onClose={() => setShowSeatPopup(false)}
        onAccept={() => setShowSeatPopup(false)}
      />
    </>
  );
};

export default TravellerReviewPage;
