import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDateShort, formatTime } from "../../utils/formatters";
import airlineLogos from "../../utils/airlineLogos";
import flightService from "../../api/flightService";
import CenterLoader from "../CenterLoader";

const FareOptionsPopup = ({ flight, onClose }) => {
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("depart");

  const isRoundTrip = flight?.onward && flight?.return;

  // Fare lists
  const onwardFareList = isRoundTrip ? flight.onward?.fares || [] : flight.fares || [];
  const returnFareList = isRoundTrip ? flight.return?.fares || [] : [];

  // Default selected fares
  const [selectedDepartFare, setSelectedDepartFare] = useState(
    onwardFareList?.[0]?.id || null
  );
  const [selectedReturnFare, setSelectedReturnFare] = useState(
    returnFareList?.[0]?.id || null
  );

  // PRICE IDs used for API
  const [, setSelectedPriceIds] = useState([]);

  // ⭐ FIX: Auto add BOTH onward + return ID when RETURN tab opens
  useEffect(() => {
    if (isRoundTrip && activeTab === "return") {
      if (selectedDepartFare && selectedReturnFare) {
        setSelectedPriceIds([selectedDepartFare, selectedReturnFare]);
      }
    }
  }, [activeTab, selectedDepartFare, selectedReturnFare]);

  // ---------------- HANDLE SEARCH ----------------  
 const handleSearch = async (priceId) => {

  // ================= ONE WAY =================
  if (!isRoundTrip) {
    setLoading(true);

    const payload = {
      agentId: "AG2190",
      vendor: "TRIPJACK",
      priceIds: [priceId],
    };

    try {
      const apiResponse = await flightService.fetchReviewDetails(payload);
      const status = apiResponse?.status || apiResponse?.data?.status;

      if (status && status !== "00") {
        alert(apiResponse?.message || "❌ Something went wrong!");
        return;
      }

      navigate("/booking-details", {
        state: { mappedReview: apiResponse.data, flight },
      });

    } catch (err) {
      console.error("❌ Review API failed", err);
      alert("❌ Failed to get fare details.");
    } finally {
      setLoading(false);
    }

    return;
  }

  // ================= ROUND TRIP =================

  // STEP 1 → Depart selected → move to return (NO LOADER)
  if (activeTab === "depart") {
    setSelectedDepartFare(priceId);
    setActiveTab("return");
    return;
  }

  // STEP 2 → Return selected → API CALL (LOADER REQUIRED)
  if (activeTab === "return") {
    if (!selectedDepartFare || !priceId) {
      alert("❌ Please select both onward and return fares.");
      return;
    }

    setLoading(true);

    const payload = {
      agentId: "AG2190",
      vendor: "TRIPJACK",
      priceIds: [selectedDepartFare, priceId],
    };

    try {
      const apiResponse = await flightService.fetchReviewDetails(payload);
      const status = apiResponse?.status || apiResponse?.data?.status;

      if (status && status !== "00") {
        alert(apiResponse?.message || "❌ Something went wrong!");
        return;
      }

      navigate("/booking-details", {
        state: { mappedReview: apiResponse.data, flight },
      });

    } catch (err) {
      console.error("❌ Review API failed", err);
      alert("❌ Failed to get fare details.");
    } finally {
      setLoading(false);
    }
  }
};

  // Scroll arrow logic  
  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;

    const checkScroll = () => {
      setShowLeftArrow(el.scrollLeft > 20);
      setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 20);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);

    return () => el.removeEventListener("scroll", checkScroll);
  }, [activeTab]);

  const scrollRight = () => scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  const scrollLeft = () => scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });

  // PRICE calculations
  const selectedDepartPrice =
    onwardFareList.find((f) => f.id === selectedDepartFare)?.baseFare || 0;

  const selectedReturnPrice =
    returnFareList.find((f) => f.id === selectedReturnFare)?.baseFare || 0;

  const totalRoundTripPrice = selectedDepartPrice + selectedReturnPrice;

  // FARE CARD COMPONENT  
  const renderFareCards = (fareList, type) =>
    fareList.map((fare) => {
      const isDepart = type === "depart";
      const isSelected = isDepart
        ? selectedDepartFare === fare.id
        : selectedReturnFare === fare.id;

      const isOneWay = !isRoundTrip;

      return (
        <div
          key={fare.id}
          onClick={() =>
            isDepart ? setSelectedDepartFare(fare.id) : setSelectedReturnFare(fare.id)
          }
          style={{
            width: "360px",
            minWidth: "300px",
            border: isSelected ? "2px solid #008CFF" : "1px solid #ddd",
            borderRadius: "12px",
            background: "#fff",
            paddingBottom: isOneWay ? "90px" : "20px",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <div className="d-flex align-items-center" style={{ padding: "10px 20px" }}>
            <h4 className="fw-bold">₹ {fare.baseFare}</h4>
            <small className="text-muted ms-2">per adult</small>
          </div>

          <div style={{ padding: "0 20px", fontWeight: 600, fontSize: "13px" }}>
            {fare.fareIdentifier.replace("_", " ")}
          </div>

          <div style={{ height: 1, background: "#e0e0e0", margin: "15px 0" }} />

          <b style={{ padding: "0 20px" }}>Baggage</b>
          <div style={{ padding: "0 20px" }}>
            ✔ {fare.baggage.cabin} Cabin <br />
            ✔ {fare.baggage.checkIn} Check-in
          </div>

          <b style={{ padding: "15px 20px 0" }}>Flexibility</b>
          <div style={{ padding: "0 20px" }}>
            - Cancellation Fee starts at ₹{fare.tax} <br />
            - Date Change Fee depends on airline
          </div>

          <b style={{ padding: "15px 20px 0" }}>Seats & Meals</b>
          <div style={{ padding: "0 20px" }}>
            - Seats may be chargeable <br />
            - Meals may be chargeable
          </div>

          {/* ⭐ ONE-WAY buttons inside card */}
          {!isRoundTrip && (
            <div
              style={{
                position: "absolute",
                bottom: 10,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "0px 20px",
              }}
            >
              <button className="btn btn-outline-primary rounded-pill px-3">
                LOCK PRICE
              </button>

              <button
                className="btn btn-primary rounded-pill px-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearch(fare.id);
                }}
                style={{
                  background: "linear-gradient(to right, #08e9fd, #49b0fd)",
                  border: "none",
                }}
              >
                BOOK NOW
              </button>
            </div>
          )}
        </div>
      );
    });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        justifyContent: "center",
        paddingTop: "60px",
        zIndex: 9,
      }}
    >
      <div
        style={{
          width: "85%",
          background: "#fff",
          borderRadius: "12px",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "#fff",
            padding: "15px 25px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            zIndex: 50,
          }}
        >
          <h3 className="fw-bold">Flight Details and Fare Options available for you!</h3>

          {/* TABS */}
          <div style={{ display: "flex", marginTop: "15px" }}>
            <div
              onClick={() => setActiveTab("depart")}
              style={{
                flex: 1,
                textAlign: "center",
                padding: 10,
                fontWeight: 700,
                cursor: "pointer",
                borderBottom:
                  activeTab === "depart" ? "4px solid #008CFF" : "4px solid #ccc",
              }}
            >
              DEPART: {flight.onward?.departure?.code} → {flight.onward?.arrival?.code}
            </div>

            {isRoundTrip && (
              <div
                onClick={() => setActiveTab("return")}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  borderBottom:
                    activeTab === "return" ? "4px solid #008CFF" : "4px solid #ccc",
                }}
              >
                RETURN: {flight.return?.departure?.code} → {flight.return?.arrival?.code}
              </div>
            )}

            <div
              onClick={onClose}
              style={{
                fontSize: 35,
                cursor: "pointer",
                marginLeft: 20,
              }}
            >
              ×
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div
          className="d-flex align-items-center gap-2 px-3 py-3"
          style={{ fontSize: "15px" }}
        >
          <span style={{ fontWeight: 700 }}>
            {activeTab === "depart" ? "Onward Trip" : "Return Trip"}
          </span>

          <span>·</span>

          <span>
            {activeTab === "depart"
              ? `${flight.onward?.departure?.city} → ${flight.onward?.arrival?.city}`
              : `${flight.return?.departure?.city} → ${flight.return?.arrival?.city}`}
          </span>

          <span>·</span>

          <img
            src={
              activeTab === "depart"
                ? airlineLogos[flight.onward?.airlineCode || flight.airlineCode]
                : airlineLogos[flight.return?.segments?.[0]?.airlineCode]
            }
            alt=""
            style={{ height: 20 }}
          />

          <span className="text-muted">
            {activeTab === "depart"
              ? flight.onward?.airlineName
              : flight.return?.segments?.[0]?.airlineName}
          </span>

          <span>·</span>

          <span className="text-muted">
            {activeTab === "depart" ? (
              <>
                {formatDateShort(flight.onward?.departure?.datetime)} · Departure at{" "}
                {formatTime(flight.onward?.departure?.datetime)} - Arrival at{" "}
                {formatTime(flight.onward?.arrival?.datetime)}
              </>
            ) : (
              <>
                {formatDateShort(flight.return?.departure?.datetime)} · Departure at{" "}
                {formatTime(flight.return?.departure?.datetime)} - Arrival at{" "}
                {formatTime(flight.return?.arrival?.datetime)}
              </>
            )}
          </span>
        </div>

        {/* SCROLLER */}
        <div style={{ position: "relative", padding: "10px 10px" }}>
          {showLeftArrow && (
            <div
              onClick={scrollLeft}
              style={{
                position: "absolute",
                left: "10px",
                top: "45%",
                background: "white",
                padding: "10px 14px",
                borderRadius: "40px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                transform: "rotate(180deg)",
                cursor: "pointer",
                zIndex: 20,
              }}
            >
              ➜
            </div>
          )}

          <div
            ref={scrollRef}
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
              scrollBehavior: "smooth",
              paddingBottom: "25px",
              scrollbarWidth: "none",
            }}
          >
            {!isRoundTrip && renderFareCards(onwardFareList, "depart")}
            {isRoundTrip && activeTab === "depart" && renderFareCards(onwardFareList, "depart")}
            {isRoundTrip && activeTab === "return" && renderFareCards(returnFareList, "return")}
          </div>

          {showRightArrow && (
            <div
              onClick={scrollRight}
              style={{
                position: "absolute",
                right: "10px",
                top: "45%",
                background: "white",
                padding: "10px 14px",
                borderRadius: "40px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                cursor: "pointer",
                zIndex: 20,
              }}
            >
              ➜
            </div>
          )}
        </div>

        {/* FOOTER FOR ROUND TRIP ONLY */}
        {isRoundTrip && (
          <div
            style={{
              position: "sticky",
              bottom: 0,
              background: "#fff",
              padding: "15px 25px",
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: 20,
              alignItems: "center",
            }}
          >
            {activeTab === "depart" && (
              <>
                <h4 className="fw-bold mb-0">₹ {totalRoundTripPrice}</h4>
                <small>ROUNDTRIP FOR 1 ADULT</small>

                <div style={{ flexGrow: 1 }} />

                <button className="btn btn-outline-primary rounded-pill px-4">
                  LOCK PRICE
                </button>

                <button
                  className="btn btn-primary rounded-pill px-5"
                  onClick={() => setActiveTab("return")}
                  style={{
                    background: "linear-gradient(to right, #08e9fd, #49b0fd)",
                    border: "none",
                  }}
                >
                  CONTINUE
                </button>
              </>
            )}

            {activeTab === "return" && (
              <>
                <h4 className="fw-bold mb-0">₹ {totalRoundTripPrice}</h4>
                <small>ROUNDTRIP FOR 1 ADULT</small>

                <div style={{ flexGrow: 1 }} />

                <button className="btn btn-outline-primary rounded-pill px-4">
                  LOCK PRICE
                </button>

                <button
                  className="btn btn-primary rounded-pill px-5"
                  onClick={() => handleSearch(selectedReturnFare)}
                  style={{
                    background: "linear-gradient(to right, #08e9fd, #49b0fd)",
                    border: "none",
                  }}
                >
                  BOOK NOW
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <CenterLoader show={loading} text="Processing booking..." />
    </div>
  );
};

export default FareOptionsPopup;
