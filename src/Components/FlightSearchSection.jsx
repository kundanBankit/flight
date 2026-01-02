import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardLayout from "./CardLayout";


export default function FlightSearchSection() {
  const [tripType, setTripType] = useState("oneway");
  const [fromCity, setFromCity] = useState("New Delhi");
  const [toCity, setToCity] = useState("Bengaluru");
  const [departureDate, setDepartureDate] = useState("2025-09-24");
  const [returnDate, setReturnDate] = useState("");
  const [fareType, setFareType] = useState("regular");

  // Travellers
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [travellersPopup, setTravellersPopup] = useState(false);
  const travellerRef = useRef(null);
  const totalTravellers = adults + children + infants;
  const travelClasses = [
    { label: "Economy", value: "ECONOMY" },
    { label: "Premium Economy", value: "PREMIUM_ECONOMY" },
    { label: "Business", value: "BUSINESS" },
    { label: "First Class", value: "FIRST" },
  ];

  // Airport search inputs
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [showFromList, setShowFromList] = useState(false);
  const [showToList, setShowToList] = useState(false);
  
const [airportList, setAirportList] = useState([]);

  const airports = [
    {
      city: "New Delhi",
      code: "DEL",
      airport: "Indira Gandhi International Airport",
    },
    {
      city: "Mumbai",
      code: "BOM",
      airport: "Chhatrapati Shivaji Maharaj International Airport",
    },
    {
      city: "Bengaluru",
      code: "BLR",
      airport: "Kempegowda International Airport",
    },
    {
      city: "Hyderabad",
      code: "HYD",
      airport: "Rajiv Gandhi International Airport",
    },
    { city: "Chennai", code: "MAA", airport: "Chennai International Airport" },
    {
      city: "Kolkata",
      code: "CCU",
      airport: "Netaji Subhas Chandra Bose International Airport",
    },
    { city: "Goa", code: "GOI", airport: "Dabolim Airport" },
    { city: "Pune", code: "PNQ", airport: "Pune International Airport" },
    { city: "Jaipur", code: "JAI", airport: "Jaipur International Airport" },
  ];

  const fareOptions = [
    { key: "regular", label: "Regular", desc: "Regular fares" },
    { key: "student", label: "Student", desc: "Extra discounts/baggage" },
    { key: "armed", label: "Armed Forces", desc: "Up to ₹600 off" },
    { key: "senior", label: "Senior Citizen", desc: "Up to ₹600 off" },
    { key: "doctor", label: "Doctor/Nurses", desc: "Up to ₹600 off" },
  ];

  useEffect(() => {
  const fetchAirports = async () => {
    try {
      const res = await fetch(
        "https://uat.bankit.in/BANKITMRA_FLIGHT/resources/AESAPI/flights/city-list",
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (data.status === "00" && Array.isArray(data.data)) {
        // Convert API format → CitySelector expected format
        const formatted = data.data.map((item) => ({
          city: item.cityName,
          airport: item.airPortName,
          code: item.airPortCode,
          country: item.countryName || "India",
        }));

        setAirportList(formatted);
      }
    } catch (error) {
      console.error("City List API failed:", error);
    }
  };

  fetchAirports();
}, []);

  const handleSearch = () => {
    const searchData = {
      tripType,
      fromCity,
      toCity,
      departureDate,
      returnDate,
      totalTravellers,
      adults,
      children,
      infants,
      travelClass,
      fareType,
    };
    console.log("✈️ Flight Search Data:", searchData);
    alert(
      `Searching flights from ${fromCity} to ${toCity} on ${departureDate}`
    );
  };

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const filteredFromCities = airports.filter((a) =>
    a.city.toLowerCase().includes(fromInput.toLowerCase())
  );
  const filteredToCities = airports.filter((a) =>
    a.city.toLowerCase().includes(toInput.toLowerCase())
  );

  // Close traveller popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        travellerRef.current &&
        !travellerRef.current.contains(event.target)
      ) {
        setTravellersPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close airport dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".airport-selector")) {
        setShowFromList(false);
        setShowToList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <CardLayout>
      {/* Trip Type */}
      <div className="d-flex justify-content-start gap-4 mb-4 flex-wrap">
        {["oneway", "round", "multi"].map((type) => (
          <label key={type} className="d-flex align-items-center gap-2">
            <input
              type="radio"
              name="tripType"
              value={type}
              checked={tripType === type}
              onChange={() => setTripType(type)}
            />
            <span className="fw-semibold text-capitalize">
              {type === "oneway"
                ? "One Way"
                : type === "round"
                ? "Round Trip"
                : "Multi City"}
            </span>
          </label>
        ))}
      </div>

      {/* Search Card */}
      <div className="bg-white border rounded-4 shadow-sm p-3 position-relative">
        <div className="row g-0 align-items-center text-start">
          {/* From */}
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-2 border-end p-3 position-relative airport-selector"
            style={{ cursor: "pointer" }}
            onClick={() => setShowFromList(true)}
          >
            <small className="text-muted">From</small>
            <input
              type="text"
              className="form-control border-0 fw-bold fs-5 p-0"
              value={fromCity}
              readOnly
              placeholder="Enter city"
            />
            <small className="text-muted">{fromCity} Airport</small>

            {showFromList && (
              <div
                className="position-absolute bg-white rounded-3 shadow-lg mt-2"
                style={{
                  zIndex: 1000,
                  width: "360px",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="d-flex align-items-center border-bottom px-3 py-2 bg-white sticky-top"
                  style={{ top: 0, zIndex: 5 }}
                >
                  <i className="bi bi-search text-muted me-2"></i>
                  <input
                    type="text"
                    className="form-control border-0 p-0 shadow-none"
                    style={{ fontSize: "0.95rem" }}
                    placeholder="Search city or airport"
                    value={fromInput}
                    autoFocus
                    onChange={(e) => setFromInput(e.target.value)}
                  />
                </div>

                {!fromInput && (
                  <div
                    className="px-3 pt-3 pb-2 text-uppercase fw-bold small"
                    style={{ color: "#6c757d" }}
                  >
                    Popular Cities
                  </div>
                )}

                {(filteredFromCities.length ? filteredFromCities : []).map(
                  (a) => (
                    <div
                      key={a.code}
                      className="px-3 py-2 d-flex justify-content-between align-items-center"
                      style={{
                        cursor: "pointer",
                        borderBottom: "1px solid #f1f1f1",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f8f9fa")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                      onClick={() => {
                        setFromCity(a.city);
                        setFromInput("");
                        setShowFromList(false);
                      }}
                    >
                      <div>
                        <div className="fw-semibold">{a.city}</div>
                        <div className="text-muted small">{a.airport}</div>
                      </div>
                      <div className="fw-bold text-secondary">{a.code}</div>
                    </div>
                  )
                )}

                {filteredFromCities.length === 0 && (
                  <div className="px-3 py-2 text-muted">No results found</div>
                )}
              </div>
            )}
          </div>

          {/* Swap */}
          <div className="col-auto text-center px-3">
            <button
              type="button"
              className="btn btn-light rounded-circle border"
              onClick={swapCities}
            >
              <ArrowLeftRight size={18} className="text-primary" />
            </button>
          </div>

          {/* To */}
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-2 border-end p-3 position-relative airport-selector"
            style={{ cursor: "pointer" }}
            onClick={() => setShowToList(true)}
          >
            <small className="text-muted">To</small>
            <input
              type="text"
              className="form-control border-0 fw-bold fs-5 p-0"
              value={toCity}
              readOnly
              placeholder="Enter city"
            />
            <small className="text-muted">{toCity} Airport</small>

            {showToList && (
              <div
                className="position-absolute bg-white rounded-3 shadow-lg mt-2"
                style={{
                  zIndex: 1000,
                  width: "360px",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="d-flex align-items-center border-bottom px-3 py-2 bg-white sticky-top"
                  style={{ top: 0, zIndex: 5 }}
                >
                  <i className="bi bi-search text-muted me-2"></i>
                  <input
                    type="text"
                    className="form-control border-0 p-0 shadow-none"
                    style={{ fontSize: "0.95rem" }}
                    placeholder="Search city or airport"
                    value={toInput}
                    autoFocus
                    onChange={(e) => setToInput(e.target.value)}
                  />
                </div>

                {!toInput && (
                  <div
                    className="px-3 pt-3 pb-2 text-uppercase fw-bold small"
                    style={{ color: "#6c757d" }}
                  >
                    Popular Cities
                  </div>
                )}

                {(filteredToCities.length ? filteredToCities : []).map((a) => (
                  <div
                    key={a.code}
                    className="px-3 py-2 d-flex justify-content-between align-items-center"
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid #f1f1f1",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f8f9fa")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "white")
                    }
                    onClick={() => {
                      setToCity(a.city);
                      setToInput("");
                      setShowToList(false);
                    }}
                  >
                    <div>
                      <div className="fw-semibold">{a.city}</div>
                      <div className="text-muted small">{a.airport}</div>
                    </div>
                    <div className="fw-bold text-secondary">{a.code}</div>
                  </div>
                ))}

                {filteredToCities.length === 0 && (
                  <div className="px-3 py-2 text-muted">No results found</div>
                )}
              </div>
            )}
          </div>

          {/* Departure */}
          <div
            className="col-6 col-md-3 col-lg-2 border-end p-3 position-relative"
            style={{ cursor: "pointer", minWidth: "180px" }}
            onClick={() => document.getElementById("depDate").showPicker()}
          >
            <small className="text-muted">Departure</small>
            <div className="fw-bold fs-5">
              {new Date(departureDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })}
            </div>
            <small className="text-muted">
              {new Date(departureDate).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </small>
            <input
              id="depDate"
              type="date"
              className="form-control border-0 position-absolute top-0 start-0 w-100 h-100 opacity-0"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>

          {/* Return */}
          <div
            className="col-6 col-md-3 col-lg-2 border-end p-3 position-relative"
            style={{ cursor: "pointer", minWidth: "180px" }}
            onClick={() => document.getElementById("retDate").showPicker()}
          >
            <small className="text-muted">Return</small>
            {returnDate ? (
              <>
                <div className="fw-bold fs-5">
                  {new Date(returnDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })}
                </div>
                <small className="text-muted">
                  {new Date(returnDate).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </small>
              </>
            ) : (
              <div>
                <span className="text-muted">Tap to add date</span>
                <br />
                <small className="text-muted">for bigger discounts</small>
              </div>
            )}
            <input
              id="retDate"
              type="date"
              className="form-control border-0 position-absolute top-0 start-0 w-100 h-100 opacity-0"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          {/* Travellers */}
          <div
            className="col-12 col-md-4 col-lg-2 px-3 position-relative"
            ref={travellerRef}
          >
            <div
              className="p-2 rounded-3"
              style={{ cursor: "pointer" }}
              onClick={() => setTravellersPopup(!travellersPopup)}
            >
              <small className="text-muted d-block">Travellers & Class</small>
              <div className="fw-bold fs-5">
                {totalTravellers} Traveller{totalTravellers > 1 ? "s" : ""}
              </div>
              <small className="text-muted">{travelClass}</small>
            </div>

            {travellersPopup && (
              <div
                className="position-absolute bg-white shadow-lg rounded-4 p-4 mt-2"
                style={{
                  width: "480px",
                  zIndex: 10,
                  right: 0,
                }}
              >
                {/* Adults */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <div className="fw-bold">ADULTS (12y+)</div>
                    <small className="text-muted">on the day of travel</small>
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, ">9"].map((n) => (
                      <button
                        key={n}
                        className={`btn btn-sm ${
                          adults === n
                            ? "btn-primary"
                            : "btn-outline-light border"
                        }`}
                        onClick={() => setAdults(typeof n === "string" ? 9 : n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Children */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <div className="fw-bold">CHILDREN (2y–12y)</div>
                    <small className="text-muted">on the day of travel</small>
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    {[0, 1, 2, 3, 4, 5, 6, ">6"].map((n) => (
                      <button
                        key={n}
                        className={`btn btn-sm ${
                          children === n
                            ? "btn-primary"
                            : "btn-outline-light border"
                        }`}
                        onClick={() =>
                          setChildren(typeof n === "string" ? 6 : n)
                        }
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Infants */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <div className="fw-bold">INFANTS (below 2y)</div>
                    <small className="text-muted">on the day of travel</small>
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    {[0, 1, 2, 3, 4, 5, 6, ">6"].map((n) => (
                      <button
                        key={n}
                        className={`btn btn-sm ${
                          infants === n
                            ? "btn-primary"
                            : "btn-outline-light border"
                        }`}
                        onClick={() =>
                          setInfants(typeof n === "string" ? 6 : n)
                        }
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Class */}
                <div className="mt-4">
                  <div className="fw-bold mb-2">CHOOSE TRAVEL CLASS</div>

                  <div className="d-flex flex-wrap gap-2">
                    {travelClasses.map((cls) => (
                      <button
                        key={cls.value}
                        className={`btn ${
                          travelClass === cls.value
                            ? "btn-primary"
                            : "btn-outline-secondary"
                        }`}
                        onClick={() => setTravelClass(cls.value)}
                      >
                        {cls.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fare Type */}
      <div className="mt-4">
        <p className="fw-semibold mb-2">Select a special fare</p>
        <div className="d-flex flex-wrap gap-2">
          {fareOptions.map((fare) => (
            <button
              key={fare.key}
              onClick={() => setFareType(fare.key)}
              className={`btn ${
                fareType === fare.key
                  ? "btn-outline-primary active"
                  : "btn-outline-secondary"
              } rounded-4 px-3 py-2`}
              style={{
                minWidth: "130px",
                borderWidth: fareType === fare.key ? "2px" : "1px",
              }}
            >
              <div className="fw-semibold">{fare.label}</div>
              <small className="text-muted">{fare.desc}</small>
            </button>
          ))}
        </div>
      </div>

      {/* Zero Cancellation */}
      <div className="form-check mt-4">
        <input type="checkbox" className="form-check-input" id="zeroCancel" />
        <label htmlFor="zeroCancel" className="form-check-label">
          <span className="fw-semibold">Add Zero Cancellation</span> — Get 100%
          refund on cancellation{" "}
          <a href="#" className="text-primary text-decoration-none">
            View Details
          </a>
        </label>
      </div>

      {/* Search Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-primary btn-lg rounded-pill px-5 fw-bold"
          onClick={handleSearch}
          style={{ letterSpacing: "1px" }}
        >
          SEARCH
        </button>
      </div>
    </CardLayout>
  );
}
