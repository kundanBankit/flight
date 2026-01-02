// FlightCard.jsx
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useNavigate, } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import FareOptionsPopup from "./FareOptionsPopup";
import airlineLogos from "../../utils/airlineLogos";
import { formatDateShort, formatDayOnly, formatDuration, formatTime } from "../../utils/formatters";


const safe = (v, alt = "") => (v === undefined || v === null ? alt : v);

/* helper: compute layover in minutes between segA.arrival.datetime and segB.departure.datetime */
const computeLayoverMinutes = (arrivalDt, nextDepartureDt) => {
  if (!arrivalDt || !nextDepartureDt) return null;
  const a = new Date(arrivalDt);
  const b = new Date(nextDepartureDt);
  if (isNaN(a) || isNaN(b)) return null;
  const diff = (b - a) / (1000 * 60);
  return diff >= 0 ? Math.round(diff) : null;
};

const minsToReadable = (m) => {
  if (m === null || m === undefined) return "";
  const hrs = Math.floor(m / 60);
  const mins = m % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
};

/* ===================== COMPONENT ===================== */
const FlightCard = ({ flights = [] }) => {

const navigate = useNavigate();
// const location = useLocation();
// ❌ DO NOT OVERRIDE flights here
console.log("FLIGHTS FROM PROPS → ", flights);



  // flights is expected to be an array like: [{ segments: [...], fares: [...] }, ...]
  const [expanded, setExpanded] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [compareList, setCompareList] = useState([]);
  // const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [, setSelectedFareForPopup] = useState(null);

  const openFarePopup = (flight, fare = null) => {
    setSelectedFlight(flight);
    setSelectedFareForPopup(fare);
    setShowPopup(true);
  };

  useEffect(() => {
    // simple tooltip handler for next-day badge (keeps original behavior)
    document.querySelectorAll(".next-day-badge").forEach((badge) => {
      const tooltip = badge.querySelector(".next-day-tooltip");
      if (!tooltip) return;
      const enter = () => {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = 1;
      };
      const leave = () => {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = 0;
      };
      badge.addEventListener("mouseenter", enter);
      badge.addEventListener("mouseleave", leave);
      // cleanup on unmount
      return () => {
        badge.removeEventListener("mouseenter", enter);
        badge.removeEventListener("mouseleave", leave);
      };
    });
  }, [flights]);

  // UNIQUE & SAFE FLIGHT ID GENERATOR
const getFlightId = (flight, index) => {
  return (
    flight.flightId ||
    flight.id ||
    flight.key ||
    `${flight.segments?.[0]?.airlineCode || "XX"}_${flight.segments?.[0]?.flightNumber || "000"}_${index}`
  );
};


const handleCompare = (flight, id) => {
  if (compareList.length >= 3) {
    alert("You can compare maximum 3 flights only");
    return;
  }

  if (compareList.some((f) => f._cmpId === id)) return;

  setCompareList([...compareList, { ...flight, _cmpId: id }]);
};


  const removeCompare = (cmpId) => {
    setCompareList(compareList.filter((f) => f._cmpId !== cmpId));
  };

  /* MAIN RENDER */
  return (
    <>
      {flights.map((flight, index) => {
        // safe accessors
        const segments = Array.isArray(flight.segments) ? flight.segments : [];
        const firstSeg = segments[0] || {};
        const lastSeg = segments[segments.length - 1] || {};
        const fares = Array.isArray(flight.fares) && flight.fares.length > 0 ? flight.fares : [{ baseFare: 0, totalFare: 0, baggage: { checkIn: "0 Kg", cabin: "0 Kg" }, id: "" }];
        const primaryFare = fares[0];

        // compute totals
        // totalDuration if present on flight; otherwise sum segments durations
        const totalDuration =
          typeof flight.duration === "number" && !isNaN(flight.duration)
            ? flight.duration
            : segments.reduce((acc, s) => acc + (Number(s.duration) || 0), 0);

        const totalStops = Math.max(0, segments.length - 1);

        // arrival/departure to show on row
        const dep = firstSeg.departure || {};
        const arr = lastSeg.arrival || {};

        // first segment times for the compact row (still safe)
        const depTime = dep.datetime || firstSeg.departure?.datetime || null;
        const arrTime = arr.datetime || lastSeg.arrival?.datetime || null;

        // next-day badge calculation (compares day-of-month)
        const showNextDay = depTime && arrTime && formatDayOnly(depTime) !== formatDayOnly(arrTime);
        const nextDayCount = showNextDay ? (parseInt(formatDayOnly(arrTime), 10) - parseInt(formatDayOnly(depTime), 10)) : 0;

        return (
          <div key={flight.id || flight._cmpId || index}>
            {/* MAIN CARD */}
            <div className="card shadow-sm border-0 p-3 mb-3" style={{ marginTop: "1%" }}>
              <div className="row align-items-center">
                {/* Airline */}
                <div className="col-2 d-flex align-items-center gap-2">
                  <img src={airlineLogos[firstSeg.airlineCode] || airlineLogos.DEFAULT} width={40} alt={firstSeg.airlineName || flight.airlineName || ""} />
                  <div>
                    <div className="fw-semibold">{safe(firstSeg.airlineName, flight.airlineName || "Airline")}</div>
                    <small className="text-muted">{safe(firstSeg.airlineCode, "")} {safe(firstSeg.flightNumber, "")}</small>
                  </div>
                </div>

                {/* Departure */}
                <div className="col-2 text-center">
                  <div className="fw-bold fs-4">{formatTime(depTime)}</div>
                  <div className="text-muted small">{safe(dep.city, dep.code || "")}</div>
                </div>

                {/* Duration */}
               <div className="col-2 text-center">
  {/* Duration */}
  <div className="text-muted small">{formatDuration(totalDuration)}</div>

  {/* Line + Dot */}
  <div
    className="position-relative"
    style={{
      height: "2px",
      width: "45px",
      background: "#2ec5b6",
      margin: "6px auto",
      borderRadius: "2px",
    }}
  >
    {totalStops > 0 && (
      <div
        className="position-absolute"
        style={{
          left: "50%",
          top: "-2px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#2ec5b6",
          transform: "translateX(-50%)",
        }}
      ></div>
    )}
  </div>

  {/* Stops Text */}
  <div className="text-success small fw-semibold">
    {totalStops === 0 ? "Non stop" : `${totalStops} Stop${totalStops > 1 ? "s" : ""}`}
  </div>
</div>


                {/* Arrival */}
                <div className="col-2 text-center" style={{ position: "relative" }}>
                  <div className="fw-bold fs-4 d-flex justify-content-center align-items-center" style={{ gap: "6px" }}>
                    {formatTime(arrTime)}
                    {showNextDay && (
                      <span className="next-day-badge" style={{ fontSize: "13px", color: "red", fontWeight: "700", cursor: "pointer", position: "relative" }}>
                        +{Math.abs(nextDayCount)} DAY
                        <span className="next-day-tooltip" style={{
                          visibility: "hidden",
                          opacity: 0,
                          transition: "0.2s",
                          position: "absolute",
                          top: "-45px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "white",
                          borderRadius: "6px",
                          padding: "8px 10px",
                          fontSize: "12px",
                          color: "#333",
                          width: "140px",
                          textAlign: "center",
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                          zIndex: 10,
                        }}>
                          Arrives next day
                          <div style={{
                            position: "absolute",
                            bottom: "-6px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0,
                            height: 0,
                            borderLeft: "6px solid transparent",
                            borderRight: "6px solid transparent",
                            borderTop: "6px solid white",
                          }} />
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="text-muted small">{safe(arr.city, arr.code || "")}</div>
                </div>

                {/* Price */}
                <div className="col-2 text-end">
                  <div className="fw-bold fs-4">₹ {safe(primaryFare.baseFare || 0)}</div>
                  <small className="text-muted">per adult</small>
                </div>

                {/* VIEW PRICE BUTTON */}
                <div className="col-2 text-end">
                  <button
                    onClick={() => openFarePopup(flight, primaryFare)}
                    className="px-4 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    style={{
                      background: "#e8f3ff",
                      color: "#0077ff",
                      border: "2px solid #80bfff",
                      borderRadius: "30px",
                      fontSize: "60%",
                      width: "100%",
                      cursor: "pointer",
                      zIndex: 5,
                    }}
                  >
                    VIEW PRICES <span>›</span>
                  </button>
                </div>
              </div>

              {/* Compare / Lock Row */}
             {/* Compare / Lock Row */}
<div className="mt-4 d-flex align-items-center justify-content-between">
  <div
    style={{
      cursor: "pointer",
      fontSize: "14px",
      padding: "6px 10px",
      borderRadius: "6px",
      backgroundColor: compareList.some((f) => f._cmpId === getFlightId(flight, index))
        ? "#e8f3ff"
        : "#d4efff",
      color: "#005bbb",
      display: "flex",
      alignItems: "center",
    }}
    onClick={() => {
      const id = getFlightId(flight, index);

      if (compareList.some((f) => f._cmpId === id)) {
        removeCompare(id); 
      } else {
        handleCompare(flight, id);
      }
    }}
  >
    {compareList.some((f) => f._cmpId === getFlightId(flight, index)) ? (
      <>
        <b>Added</b>
        <span style={{ marginLeft: "8px", fontSize: "17px" }}>×</span>
      </>
    ) : (
      <>
        Add to Compare
        <b style={{ marginLeft: "6px", fontSize: "18px" }}>+</b>
      </>
    )}
  </div>
</div>


              {/* Expand Button */}
              <div className="text-end mt-2">
                <button
                  className="btn btn-link p-0 fw-semibold"
                  onClick={() => setExpanded(expanded === index ? null : index)}
                >
                  {expanded === index ? "Hide Flight Details" : "View Flight Details"}
                </button>
              </div>
            </div>

            {/* EXPANDED DETAILS */}
            {expanded === index && (
              <div className="p-3 mb-4" style={{ background: "#fafcff", border: "1px solid #e3e6ea", marginTop: "-2%" }}>
                <ul className="nav nav-tabs mb-3">
                  {["details", "fare", "cancel", "date"].map((tab) => (
                    <li key={tab} className="nav-item">
                      <button
                        className={`nav-link fw-semibold ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab === "details" ? "FLIGHT DETAILS" : tab === "fare" ? "FARE SUMMARY" : tab === "cancel" ? "CANCELLATION" : "DATE CHANGE"}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* DETAILS TAB */}
                {activeTab === "details" && (
                  <div className="p-3 bg-white border rounded">
                    <div className="fw-bold mb-3">
                      {safe(dep.city)} → {safe(arr.city)} , {formatDateShort(depTime)}
                    </div>

                    {/* render each segment stacked */}
                    {segments.map((seg, si) => {
                      const segDep = seg.departure || {};
                      const segArr = seg.arrival || {};
                      return (
                        <div key={si} className="mb-3">
                          <div className="row text-center align-items-center">
                            <div className="col">
                              <div className="fs-4 fw-bold">{formatTime(segDep.datetime)}</div>
                              <div className="text-muted small">{formatDateShort(segDep.datetime)}</div>
                              <div className="fw-semibold mt-2">{segDep.terminal || ""}</div>
                              <div className="text-muted small">{segDep.city}, {segDep.country}</div>
                            </div>

                            <div className="col">
                              <div className="text-muted small">{formatDuration(seg.duration)}</div>
                              <div style={{ height: "2px", width: "40px", background: "#33d1b3", margin: "6px auto" }} />
                              <div className="small text-muted">{seg.aircraftType || seg.aircraftType}</div>
                            </div>

                            <div className="col">
                              <div className="fs-4 fw-bold">{formatTime(segArr.datetime)}</div>
                              <div className="text-muted small">{formatDateShort(segArr.datetime)}</div>
                              <div className="fw-semibold mt-2">{segArr.terminal || ""}</div>
                              <div className="text-muted small">{segArr.city}, {segArr.country}</div>
                            </div>

                            <div className="col text-start">
                              <div className="fw-bold small">Check-in</div>
                              <div>{safe(primaryFare.baggage?.checkIn, primaryFare.baggage?.checkin || "0 Kg")}</div>
                            </div>

                            <div className="col text-start">
                              <div className="fw-bold small">Cabin</div>
                              <div>{safe(primaryFare.baggage?.cabin, "0 Kg")}</div>
                            </div>
                          </div>

                          {/* if there is a next segment, show layover info */}
                          {segments[si + 1] && (
                            (() => {
                              const layMins = computeLayoverMinutes(segArr.datetime, segments[si + 1].departure?.datetime);
                              return (
                                <div className="text-center small text-muted mt-2">
                                  <b>Change of planes</b> • {layMins !== null ? `${minsToReadable(layMins)} Layover in ${segArr.city || segArr.code}` : `Layover in ${segArr.city || segArr.code}`}
                                </div>
                              );
                            })()
                          )}
                        </div>
                      );
                    })}

                    <hr />

                    <div className="d-flex gap-4 small text-muted">
                      <span>🛫 3-3 Layout</span>
                      <span>🥤 Beverage Available</span>
                      <span>💺 Comfortable Seats</span>
                      <span>📺 Entertainment</span>
                    </div>
                  </div>
                )}

                {/* FARE */}
                {activeTab === "fare" && (
                  <div className="p-4 bg-white" style={{ borderRadius: "10px", border: "1px solid #e0e0e0" }}>
                    <h6 className="fw-bold mb-3">Fare breakup</h6>

                    <div className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: "1px solid #eee" }}>
                      <span className="fw-bold text-uppercase">Total</span>
                      <span className="fw-bold fs-5">₹ {safe(primaryFare.totalFare, primaryFare.baseFare || 0)}</span>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                      <span className="text-muted">Base Fare</span>
                      <span>₹ {safe(primaryFare.baseFare, 0)}</span>
                    </div>

                    <div className="d-flex justify-content-between mt-2">
                      <span className="text-muted">Surcharges</span>
                      <span>₹ {safe(primaryFare.tax, 0)}</span>
                    </div>
                  </div>
                )}

                {/* CANCELLATION */}
                {activeTab === "cancel" && (
                  <div className="p-3 bg-white" style={{ borderRadius: "10px", border: "1px solid #e0e0e0" }}>
                    <h6 className="fw-bold mb-3">{safe(dep.city)} - {safe(arr.city)}</h6>

                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: "50%" }}>
                            Time frame
                            <br />
                            <span className="text-muted small">(From Scheduled flight departure)</span>
                          </th>
                          <th>
                            Airline Fee + MMT Fee
                            <br />
                            <span className="text-muted small">(Per passenger)</span>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>0 hours to 2 hours*</td>
                          <td className="fw-semibold text-danger">ADULT : Non Refundable</td>
                        </tr>

                        <tr>
                          <td>2 hours to 4 days*</td>
                          <td>ADULT : ₹ 4,275 + ₹ 350</td>
                        </tr>

                        <tr>
                          <td>4 days to 365 days*</td>
                          <td>ADULT : ₹ 3,200 + ₹ 350</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-3 p-3" style={{ background: "#fde8dd", color: "#b1492d", borderRadius: "8px", fontSize: "14px" }}>
                      <b>*Important:</b> Airline fee is indicative. Fees are subject to airline approval.
                    </div>
                  </div>
                )}

                {/* DATE CHANGE */}
                {activeTab === "date" && (
                  <div className="p-3 bg-white" style={{ borderRadius: "10px", border: "1px solid #e0e0e0" }}>
                    <h6 className="fw-bold mb-3">{safe(dep.city)} - {safe(arr.city)}</h6>

                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: "50%" }}>
                            Time frame
                            <br />
                            <span className="text-muted small">(From Scheduled flight departure)</span>
                          </th>
                          <th>
                            Airline Fee + MMT Fee + Fare difference
                            <br />
                            <span className="text-muted small">(Per passenger)</span>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>0 hours to 2 hours*</td>
                          <td className="fw-semibold text-danger">ADULT : Non Changeable</td>
                        </tr>

                        <tr>
                          <td>2 hours to 365 days*</td>
                          <td>ADULT : ₹ 2,999 + ₹ 350 + Fare difference</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-3 p-3" style={{ background: "#fde8dd", color: "#b1492d", borderRadius: "8px", fontSize: "14px" }}>
                      <b>*Important:</b> Charges depend on airline. Fare difference must be paid by user.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* COMPARE POPUP */}
      {compareList.length > 0 && (
        <div style={{
          position: "fixed",
          top: "50%",
          right: "25px",
          transform: "translateY(-50%)",
          width: "360px",
          background: "#083358",
          borderRadius: "14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          zIndex: 9999,
          overflow: "hidden",
          color: "white",
        }}>
          <div style={{ padding: "14px 20px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "space-between" }}>
            Selected flights
            <span style={{ fontSize: "22px", cursor: "pointer" }} onClick={() => setCompareList([])}>×</span>
          </div>

          <div style={{ background: "white", color: "#1b1b1b" }}>
            {compareList.map((f) => (
              <div key={f._cmpId} style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid #eee", height: "65px" }}>
                <img src={airlineLogos[f.segments?.[0]?.airlineCode] || airlineLogos.DEFAULT} width={40} alt={f.segments?.[0]?.airlineName || "airline"} />
                <div className="ms-2" style={{ width: "100px" }}>
                  <b>{f.segments?.[0]?.airlineName || "Airline"}</b>
                </div>
                <div className="d-flex align-items-center" style={{ flex: 1 }}>
                  <span>{formatTime(f.segments?.[0]?.departure?.datetime)}</span>
                  <div style={{ width: "40px", height: "2px", background: "#6ee7b7", margin: "0 8px" }} />
                  <span>{formatTime(f.segments?.[f.segments.length - 1]?.arrival?.datetime)}</span>
                </div>
                <span onClick={() => removeCompare(f._cmpId)} style={{ cursor: "pointer", fontSize: "18px" }}>×</span>
              </div>
            ))}
          </div>

         <div style={{ padding: "16px", background: "#083358" }}>
  <button
    disabled={compareList.length < 2}
   onClick={() => navigate("/compare", { state: { flights: compareList } })}

    style={{
      width: "100%",
      padding: "12px",
      borderRadius: "30px",
      border: "none",
      fontSize: "15px",
      color: "white",
      background:
        compareList.length < 2
          ? "#7a8ba3"
          : "linear-gradient(90deg, #2196f3, #0066ff)",
      cursor: compareList.length < 2 ? "not-allowed" : "pointer",
    }}
  >
    {compareList.length < 2 ? "SELECT AT LEAST 2 FLIGHTS" : "COMPARE FLIGHTS"}
  </button>
</div>

        </div>
      )}

      {/* Fare options popup */}
      {showPopup && selectedFlight && (
        <FareOptionsPopup
          flight={selectedFlight}
          onClose={() => {
            setShowPopup(false);
            setSelectedFareForPopup(null);
            setSelectedFlight(null);
          }}
        />
      )}
    </>
  );
};

export default FlightCard;
