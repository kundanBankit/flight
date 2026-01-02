import { ChevronDown, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import airlineLogos from "../../utils/airlineLogos";

function formatTime(dt) {
  if (!dt) return "--:--";
  const d = new Date(dt);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

const SelectedReturnFlight = ({ flight, isSelected = true, onBookNow }) => {
  /* ===================== Extract Onward ===================== */
  const onwardSeg = flight.departure?.segments?.[0] || {};
  const onwardLastSeg =
    flight.departure?.segments?.[flight.departure.segments.length - 1] || {};

  const onwardAirlineLogo =
    airlineLogos[onwardSeg.airlineCode] || airlineLogos.DEFAULT;

  const onwardAirline = onwardSeg.airlineName || "Airline";
  const onwardDepTime = formatTime(onwardSeg.departure?.datetime);
  const onwardArrTime = formatTime(onwardLastSeg.arrival?.datetime);

  const onwardPrice =
    flight.departure?.fares?.[0]?.baseFare ??
    flight.departure?.fares?.[0]?.totalFare ??
    0;

  /* ===================== Extract Return ===================== */
  const returnSeg = flight.returnFlight?.segments?.[0] || {};
  const returnLastSeg =
    flight.returnFlight?.segments?.[flight.returnFlight.segments.length - 1] ||
    {};

  const returnLogo =
    airlineLogos[returnSeg.airlineCode] || airlineLogos.DEFAULT;

  const returnAirline = returnSeg.airlineName || "Airline";
  const returnDepTime = formatTime(returnSeg.departure?.datetime);
  const returnArrTime = formatTime(returnLastSeg.arrival?.datetime);

  const returnPrice =
    flight.returnFlight?.fares?.[0]?.baseFare ??
    flight.returnFlight?.fares?.[0]?.totalFare ??
    0;

  /* ===================== Totals ===================== */
  const totalFare = (onwardPrice || 0) + (returnPrice || 0);

  const [showFarePopup, setShowFarePopup] = useState(false);
  const popupRef = useRef(null);

  // Close pop-up on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!popupRef.current?.contains(e.target)) {
        setShowFarePopup(false);
      }
    };

    if (showFarePopup)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFarePopup]);

  if (!flight) return null;

  return (
    <div
      className={`d-flex align-items-center justify-content-between rounded w-100 px-3 py-2 position-relative ${
        isSelected ? "bg-[#042046]" : "bg-[#0a1c3a]"
      }`}
      style={{
        border: "1px solid rgba(255,255,255,0.15)",
        overflow: "visible",
      }}
    >
      {/* ===================== ONWARD ===================== */}
      <div
        className="d-flex flex-column justify-content-center border-end border-secondary px-3"
        style={{ width: "33%" }}
      >
        <div className="d-flex align-items-center gap-2 mb-1">
          <img src={onwardAirlineLogo} width={22} height={22} alt="" />
          <p className="text-white-50 mb-0" style={{ fontSize: "14px" }}>
            Departure · <span className="text-white">{onwardAirline}</span>
          </p>
        </div>

        <div className="d-flex align-items-center justify-content-between text-white">
          <span className="fw-semibold" style={{ fontSize: "17px" }}>
            {onwardDepTime}
          </span>

          <span className="mx-2 text-secondary">→</span>

          <span className="fw-semibold" style={{ fontSize: "17px" }}>
            {onwardArrTime}
          </span>

          <span className="text-white-50 ms-2" style={{ fontSize: "14px" }}>
            ₹ {onwardPrice.toLocaleString()}
          </span>
        </div>

        <a
          href="#"
          className="mt-1"
          style={{ color: "#38BEFD", fontSize: "13px", textDecoration: "none" }}
        >
          Flight Details
        </a>
      </div>

      {/* ===================== RETURN ===================== */}
      <div
        className="d-flex flex-column justify-content-center border-end border-secondary px-3"
        style={{ width: "33%" }}
      >
        <div className="d-flex align-items-center gap-2 mb-1">
          <img src={returnLogo} width={22} height={22} alt="" />
          <p className="text-white-50 mb-0" style={{ fontSize: "14px" }}>
            Return · <span className="text-white">{returnAirline}</span>
          </p>
        </div>

        <div className="d-flex align-items-center justify-content-between text-white">
          <span className="fw-semibold" style={{ fontSize: "17px" }}>
            {returnDepTime}
          </span>

          <span className="mx-2 text-secondary">→</span>

          <span className="fw-semibold" style={{ fontSize: "17px" }}>
            {returnArrTime}
          </span>

          <span className="text-white-50 ms-2" style={{ fontSize: "14px" }}>
            ₹ {returnPrice.toLocaleString()}
          </span>
        </div>

        <a
          href="#"
          className="mt-1"
          style={{ color: "#38BEFD", fontSize: "13px", textDecoration: "none" }}
        >
          Flight Details
        </a>
      </div>

      {/* ===================== TOTAL ===================== */}
      <div
        className="d-flex flex-column justify-content-center align-items-end px-3 text-white position-relative"
        style={{ width: "33%" }}
      >
        <p className="fw-bold mb-0" style={{ fontSize: "26px" }}>
          ₹ {totalFare.toLocaleString()}
        </p>

        <p className="text-white-50 mb-1" style={{ fontSize: "13px" }}>
          per adult
        </p>

        {/* Fare Details */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowFarePopup((prev) => !prev);
          }}
          style={{
            color: "#38BEFD",
            fontSize: "13px",
            textDecoration: "none",
          }}
        >
          Fare Details
        </a>

        <div className="d-flex align-items-center gap-2 mt-2">
          <button
  className="btn btn-sm fw-semibold text-white"
  style={{ backgroundColor: "#2e8dfd", borderRadius: "6px" }}
  onClick={() => {
    const combined = {
      fares: [
        ...(flight.departure?.fares || []),
        ...(flight.returnFlight?.fares || []),
      ],

      departure: {
        city: onwardSeg.departure?.city,
        datetime: onwardSeg.departure?.datetime,
      },
      arrival: {
        city: onwardLastSeg.arrival?.city,
        datetime: onwardLastSeg.arrival?.datetime,
      },

      airlineCode: onwardSeg.airlineCode,
      airlineName: onwardSeg.airlineName,

      onward: flight.departure,
      return: flight.returnFlight,
    };

    onBookNow?.(combined);
  }}
>
  BOOK NOW
</button>


          <button
            className="btn btn-sm fw-semibold"
            style={{
              border: "1px solid #ffffffff",
              color: "#ffffffff",
              borderRadius: "6px",
            }}
          >
            LOCK PRICE
          </button>

          <ChevronDown size={22} className="text-white ms-1" />
        </div>

        {/* ===================== POPUP ===================== */}
        {showFarePopup && (
          <div
            ref={popupRef}
            className="bg-white shadow rounded p-3 position-absolute"
            style={{
              bottom: "90px",
              right: "20px",
              width: "360px",
              zIndex: 9999,
            }}
          >
            <div
              className="d-flex justify-content-between align-items-center mb-2"
              style={{ borderBottom: "1px solid #eee", paddingBottom: "6px" }}
            >
              <h6 className="fw-bold text-black mb-0">Fare Summary</h6>
              <X
                size={18}
                className="text-secondary cursor-pointer"
                onClick={() => setShowFarePopup(false)}
              />
            </div>

            <div className="d-flex justify-content-between mb-1">
              <p className="mb-1 text-black">Onward Fare</p>
              <p className="fw-semibold text-black mb-1">
                ₹ {onwardPrice.toLocaleString()}
              </p>
            </div>

            <div className="d-flex justify-content-between mb-1">
              <p className="mb-1 text-black">Return Fare</p>
              <p className="fw-semibold text-black mb-1">
                ₹ {returnPrice.toLocaleString()}
              </p>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <p className="fw-bold text-black mb-0">Total</p>
              <p className="fw-bold text-black mb-0">
                ₹ {totalFare.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedReturnFlight;
