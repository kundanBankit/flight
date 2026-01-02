import React, { useState, useEffect } from "react";
import TravellerAdultForm from "../BookingSection/TravellerAdultForm";
import { useNavigate } from "react-router-dom";
import GSTDetails from "./GSTDetails";
import ReviewTravellerModal from "./ReviewTravellerModel";
import TripSecure from "./TripSecure";
import BookingContactDetails from "./BookingContactDetails";
import ErrorPopup from "../ErrorPopup";
import CenterLoader from "../CenterLoader";
import flightService from "../../api/flightService";

const TravellerDetails = ({ flight, mapped }) => {
  const maxAdults = mapped?.searchInfo?.passengers?.adult;
  console.log("traveldetails", mapped);
  console.log("maxAdult", maxAdults);
  console.log("bookingId in traveller details", mapped?.bookingId);

  const bookingId = mapped?.bookingId || null;

  const [adults, setAdults] = useState([{ id: 1 }]);
  const [activeAdultIndex, setActiveAdultIndex] = useState(0); // ⭐ control open adult
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [adultError, setAdultError] = useState("");

  const [showErrorPopup, setShowErrorPopup] = useState(false);
const [popupMessage, setPopupMessage] = useState("");
const [loading, setLoading] = useState(false);

const [contactDetails, setContactDetails] = useState(null);



  const navigate = useNavigate();

  const [triggerValidation, ] = useState(false);
  const [adultValid, setAdultValid] = useState({});
  const [tripSecureValid, setTripSecureValid] = useState(false);

  const [showReview, setShowReview] = useState(false);
  const [travellerData, setTravellerData] = useState([]);

  const errorRef = React.useRef(null);


  const addAdult = () => {
  if (adults.length >= maxAdults) {
    setAdultError(
      `You have already selected ${maxAdults} ADULT. Remove before adding a new one.`
    );

    // ⭐ Focus + smooth scroll to the error message
    setTimeout(() => {
      if (errorRef.current) {
        errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        errorRef.current.focus?.();
      }
    }, 100);

    return;
  }

  setAdultError("");
  setAdults((prev) => {
    const updated = [...prev, { id: Date.now() }];
    setActiveAdultIndex(updated.length - 1); // auto-open new one
    return updated;
  });
};


  const removeAdult = (id, index) => {
    if (adults.length === 1) return;

    const updated = adults.filter((a) => a.id !== id);
    setAdults(updated);
    setAdultError("");

    // ⭐ adjust active index
    if (activeAdultIndex === index) {
      setActiveAdultIndex(Math.max(0, index - 1));
    }
  };

  const updateAdultValidation = (index, isValid) => {
    setAdultValid((prev) => ({ ...prev, [index]: isValid }));
  };

  useEffect(() => {
    const allValid = Object.values(adultValid).every((v) => v === true);
    const countMatch = Object.keys(adultValid).length === adults.length;

    if (triggerValidation && allValid && countMatch && tripSecureValid) {
      setShowReview(true);
    }
  }, [adultValid, tripSecureValid, triggerValidation, adults.length]);

  // const handleContinue = () => {
  //   setTriggerValidation((prev) => !prev);
  // };

const handleContinue = () => {
  let firstInvalidIndex = null;
  let detailedErrors = [];

  // 1️⃣ CHECK: Total travellers must match maxAdults
  if (adults.length !== maxAdults) {
    detailedErrors.push(
      `Travellers added: ${adults.length}/${maxAdults}\n` +
      `You must fill details for all ${maxAdults} travellers before continuing.`
    );
  }

  // 2️⃣ TRAVELLER-WISE VALIDATION
  adults.forEach((_, index) => {
    const data = travellerData[index] || {};
    let travellerErrors = [];

    if (!data.firstName?.trim()) travellerErrors.push("First Name is missing.");
    if (!data.lastName?.trim()) travellerErrors.push("Last Name is missing.");
    if (!data.gender) travellerErrors.push("Gender not selected.");
    if (data.mobile && !/^[6-9]\d{9}$/.test(data.mobile))
      travellerErrors.push("Mobile number must be 10 digits and start with 6-9.");
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email))
      travellerErrors.push("Invalid email format (e.g., name@mail.com).");

    // INTERNATIONAL
    if (data.country !== "India") {
      if (!data.passport) travellerErrors.push("Passport number is required for international travel.");
      if (!data.expiry) travellerErrors.push("Passport expiry date is missing.");
      if (!data.dob) travellerErrors.push("Date of birth required.");
    }

    if (travellerErrors.length > 0) {
      if (firstInvalidIndex === null) firstInvalidIndex = index;
      detailedErrors.push(`Traveller ${index + 1}:\n• ${travellerErrors.join("\n• ")}`);
    }
  });

  // ❌ IF ANY ERRORS — SHOW POPUP, OPEN CARD, SCROLL
  if (detailedErrors.length > 0) {
    setPopupMessage(detailedErrors.join("\n\n"));
    setShowErrorPopup(true);

    if (firstInvalidIndex !== null) {
      setActiveAdultIndex(firstInvalidIndex);
      setTimeout(() => {
        const section = document.getElementById(`traveller-${firstInvalidIndex}`);
        section?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }

    return;
  }

  // 📌 Validate Contact Details
if (!contactDetails) {
  setPopupMessage("Please fill contact details.");
  setShowErrorPopup(true);
  return;
}

const { countryCode, mobile, email, ref } = contactDetails;

let contactErrors = [];

if (!countryCode) contactErrors.push("Select country code.");
if (!mobile) contactErrors.push("Mobile number is required.");
if (mobile && !/^[6-9]\d{9}$/.test(mobile))
  contactErrors.push("Mobile must be 10 digits starting with 6-9.");
if (!email) contactErrors.push("Email is required.");
if (email && !/^\S+@\S+\.\S+$/.test(email))
  contactErrors.push("Invalid email format (example: test@mail.com).");

// ❌ Show contact errors
if (contactErrors.length > 0) {
  setPopupMessage("Contact Details:\n• " + contactErrors.join("\n• "));
  setShowErrorPopup(true);

  // 🔥 Auto-focus & scroll to contact section
  setTimeout(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    ref.current?.focus?.();
  }, 150);

  return;
}



if (!bookingId) {
  setPopupMessage("Booking ID not found. Unable to continue.");
  setShowErrorPopup(true);
  return;
}

setLoading(true);

flightService.fetchSeatMap(bookingId)
  .then((apiResponse) => {
    setLoading(false);

    if (apiResponse?.status !== "00") {
      setPopupMessage(apiResponse?.message || "Seat map fetch failed. Try again.");
      setShowErrorPopup(true);
      return;
    }

    // ⭐ On success → go to next page with API data
    console.log("🚀 navigating with mappedReview:", mapped);

    navigate("/review-travellers", {
  state: {
    flight,
    travellers: travellerData,
    seatmap: apiResponse?.data,
    bookingId,
     mapped, // 🔥 THIS LINE IS MANDATORY
  },
});

  })
  .catch(() => {
    setLoading(false);
    setPopupMessage("Network error! Please check connection & try again.");
    setShowErrorPopup(true);
  });

};

console.log("🚀 navigating (confirm) with mappedReview:", mapped);

  const handleConfirm = () => {
   navigate("/review-travellers", {
  state: {
    flight,
    travellers: travellerData,
     mapped, // 🔥 ADD THIS
  },
});

    setShowReview(false);
  };

  const currentCount = adults.length;
  const maxCount = maxAdults;

  return (
    <div className="mt-4 ">
      <div className="d-flex justify-content-between">
        <h4 className="fw-bold mb-3">Traveller Details</h4>
        <span className="text-muted fw-semibold">
          {currentCount}/{maxCount} added
        </span>
      </div>
      {adultError && (
  <div
    ref={errorRef}
    tabIndex={-1} // needed so focus works
    style={{
      background: "#ffe9e9",
      border: "1px solid #ffb3b3",
      color: "#c80000",
      padding: "10px 14px",
      borderRadius: "8px",
      marginBottom: "10px",
      fontWeight: 500,
    }}
  >
    {adultError}
  </div>
)}

      {mapped?.conditions?.insuranceApplicable && (
        <TripSecure
          triggerValidation={triggerValidation}
          setTripSecureValid={setTripSecureValid}
        />
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        {adults.map((adult, index) => (
          <div
  id={`traveller-${index}`}   // ⭐ helps scroll to exact position
  key={adult.id}
  style={{
    width: activeAdultIndex === index ? "100%" : "calc(50% - 8px)",
    transition: "0.3s ease",
  }}
>


            <TravellerAdultForm
              number={index + 1}
              mapped={mapped}
              onRemove={() => removeAdult(adult.id, index)}
              canRemove={adults.length > 1}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              triggerValidation={triggerValidation}
              setTravellerValid={(v) => updateAdultValidation(index, v)}
              getData={(data) =>
                setTravellerData((prev) => {
                  const updated = [...prev];
                  updated[index] = data;
                  return updated;
                })
              }
              adultError={adultError}
              isActive={activeAdultIndex === index}
              onToggle={() =>
                setActiveAdultIndex(activeAdultIndex === index ? null : index)
              }
            />
          </div>
        ))}

        {/* ⭐ ADD NEW ADULT CARD (Same Design) */}
        <div
          onClick={addAdult}
          style={{
            width: "calc(50% - 8px)",
            background: "#fff",
            borderRadius: "14px",
            border: "2px dashed #4F6BFF",
            padding: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
            transition: "0.25s",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "#4F6BFF",
              color: "#fff",
              fontSize: "22px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </div>

          <div>
            <h6 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
              Add New Adult
            </h6>
            <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
              Click to add traveller
            </p>
          </div>
        </div>
      </div>

      <BookingContactDetails onValidate={setContactDetails} />


      <GSTDetails />

      <div className="mt-4">
        <button className="btn btn-primary px-4" onClick={handleContinue}>
          CONTINUE
        </button>
      </div>

      <ReviewTravellerModal
        show={showReview}
        onClose={() => setShowReview(false)}
        travellers={travellerData}
        onConfirm={handleConfirm}
      />

      <ErrorPopup
  show={showErrorPopup}
  message={popupMessage}
  onClose={() => setShowErrorPopup(false)}
/>

<CenterLoader show={loading} text="Validating details... Please wait" />

    </div>
  );
};

export default TravellerDetails;
