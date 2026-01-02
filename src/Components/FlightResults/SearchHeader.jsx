// src/components/SearchHeader.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { ArrowLeftRight, X } from "lucide-react";
import CitySelector from "../FlightSearchSection/CitySelector";
import DateSelector from "../FlightSearchSection/DateSelector";
import TravellerSelector from "../FlightSearchSection/TravellerSelector";
import FareTypeSelector from "./FareTypeSelector";
import flightService from "../../api/flightService"; // <-- service wrapper

export default function SearchHeader({ searchData, flightData, onSearch }) {
  const navigate = useNavigate();

  // SAFELY pull initial values from searchData (may be undefined)
  const {
    tripType: initialTripType = "oneway",
    fromCity: initialFromCity = null,
    toCity: initialToCity = null,
    departureDate: initialDeparture = new Date(),
    returnDate: initialReturn = null,
    multiCities: initialMultiCities = [],
    adults: initialAdults = 1,
    children: initialChildren = 0,
    infants: initialInfants = 0,
    travelClass: initialTravelClass = "Economy",
    fareType: initialFareType = "regular",
    zeroCancellation: initialZeroCancellation = false,
    airportList: initialAirportList = [],
  } = searchData || {};

  // local states
  const [isSticky, setIsSticky] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const [tripType, setTripType] = useState(initialTripType);
  const [fromCity, setFromCity] = useState(initialFromCity);
  const [toCity, setToCity] = useState(initialToCity);
  const [departureDate, setDepartureDate] = useState(
    initialDeparture ? new Date(initialDeparture) : new Date()
  );
  const [returnDate, setReturnDate] = useState(
    initialReturn ? new Date(initialReturn) : null
  );
  const [fareType, setFareType] = useState(initialFareType);
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [infants, setInfants] = useState(initialInfants);
  const [travelClass, setTravelClass] = useState(initialTravelClass);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [multiCities, setMultiCities] = useState(
    initialMultiCities.length
      ? initialMultiCities
      : [
          { from: "New Delhi, India", to: "Mumbai, India", date: new Date() },
          { from: "Mumbai, India", to: "Bengaluru, India", date: new Date() },
        ]
  );

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tripOptions = [
    { key: "oneway", label: "One Way" },
    { key: "round", label: "Round Trip" },
    // { key: "multi", label: "Multi City" },
  ];

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleMultiChange = (index, field, value) => {
    const updated = [...multiCities];
    updated[index][field] = value;
    if (field === "to" && index < updated.length - 1) {
      updated[index + 1].from = value;
    }
    setMultiCities(updated);
  };

  const addCity = () => {
    if (multiCities.length < 5) {
      const lastTo = multiCities[multiCities.length - 1].to;
      setMultiCities([
        ...multiCities,
        { from: lastTo, to: "Select City", date: new Date() },
      ]);
    }
  };

  const removeCity = (index) => {
    if (multiCities.length > 2) {
      setMultiCities(multiCities.filter((_, i) => i !== index));
    }
  };

  // MAIN SEARCH - uses flightService which does mapping and returns safe structure
  const handleSearch = async () => {
    // build params to carry to results page (for UI/inputs)
    const params = {
      tripType,
      fromCity,
      toCity,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      travelClass,
      fareType,
      multiCities,
    };

    // start UI loading states
    onSearch && onSearch("start");
    setShowLoader(true);

    const depDate = departureDate.toLocaleDateString("en-CA"); // YYYY-MM-DD
    const retDate = returnDate ? returnDate.toLocaleDateString("en-CA") : null;


    // prepare payload expected by API/service
    const payload = {
      agentId: "AG2190",
      vendor: "TRIPJACK",
      cabinClass: (travelClass || "Economy").toUpperCase(),
      adult: (adults || 1).toString(),
      child: (children || 0).toString(),
      infant: (infants || 0).toString(),
      isDirectFlight: true,
      isConnectingFlight: true,
      passengerFareType: "",
      routeInfos: [
        {
          fromCityOrAirport: fromCity?.code || fromCity || "",
          toCityOrAirport: toCity?.code || toCity || "",
          travelDate: depDate,
        },
        ...(tripType === "round" && returnDate
          ? [
              {
                fromCityOrAirport: toCity?.code || toCity || "",
                toCityOrAirport: fromCity?.code || fromCity || "",
                travelDate: retDate,
              },
            ]
          : []),
      ],
    };

    const startTime = performance.now();

    try {
      // call service which maps response safely
      const apiResponse = await flightService.searchFlights(payload);

      const endTime = performance.now();
      const loaderDuration = Math.ceil((endTime - startTime) / 1000);

      // navigate to results; ensure apiData is always an object with ONWARD/RETURN
      navigate("/flight-results", {
        state: {
          searchData: params,
          apiData: apiResponse || { ONWARD: [], RETURN: [] },
          loaderDuration,
        },
      });
    } catch (err) {
      // error handling — keep UI usable and navigate with apiData = null + error message
      console.error("Flight search failed:", err);
      navigate("/flight-results", {
        state: {
          searchData: params,
          apiData: { ONWARD: [], RETURN: [] }, // safe empty response so UI doesn't break
          loaderDuration: 0,
          error: err?.message || "Search failed",
        },
      });
    } finally {
      onSearch && onSearch("stop");
      setShowLoader(false);
    }
  };



  return (
    <>
      <div
        className={`${
          isSticky ? "fixed top-0 left-0 right-0 z-50" : "relative"
        } text-white py-2 px-4 shadow-sm`}
        style={{ backgroundColor: "transparent", fontSize: "18px" }}
      >
        <div className="container-fluid px-4">
          {/* ===== TOP ROW ===== */}
          <div className="d-flex align-items-center justify-content-between gap-2  mb-2">
            {/* Trip Type Dropdown */}
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                size="sm"
                className="bg-transparent border-0 text-white fw-semibold px-2"
                style={{
                  fontSize: "12px",
                  minWidth: "120px",
                  textAlign: "left",
                }}
              >
                {tripOptions.find((t) => t.key === tripType)?.label ||
                  "Trip Type"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {tripOptions.map((opt) => (
                  <Dropdown.Item
                    key={opt.key}
                    onClick={() => setTripType(opt.key)}
                  >
                    {opt.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* City selectors + swap + dates */}
            {tripType === "multi" ? (
              <input
                type="text"
                readOnly
                value={`${multiCities[0].from} to ${
                  multiCities[multiCities.length - 1].to
                }, India via ${multiCities[1].from}`}
                className="form-control bg-transparent text-light border-0 fw-semibold"
                style={{
                  fontSize: "12px",
                  maxWidth: "420px",
                  color: "#B0B9C3",
                }}
              />
            ) : (
              <>
                <div className="col-12 col-sm-6 col-md-4 col-lg position-relative">
                  <CitySelector
                    label="From"
                    city={fromCity}
                    setCity={setFromCity}
                    airports={initialAirportList}
                    oppositeCity={toCity}
                    theme="dark"
                  />
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg position-relative">
                  <button
                    type="button"
                    className="btn btn-light rounded-circle border shadow-sm position-absolute d-flex justify-content-center align-items-center"
                    onClick={swapCities}
                    title="Swap From & To"
                    style={{
                      left: "-30px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "42px",
                      height: "42px",
                      // zIndex: 1,
                    }}
                  >
                    <ArrowLeftRight size={18} className="text-primary" />
                  </button>

                  <CitySelector
                    label="To"
                    city={toCity}
                    setCity={setToCity}
                    airports={initialAirportList}
                    oppositeCity={fromCity}
                    theme="dark"
                  />
                </div>

                <div style={{ width: "130px" }}>
                  <DateSelector
                    label="Departure"
                    date={departureDate}
                    setDate={setDepartureDate}
                    theme="dark"
                    small
                  />
                </div>

                {tripType === "round" && (
                  <div style={{ width: "130px" }}>
                    <DateSelector
                      label="Return"
                      date={returnDate}
                      setDate={setReturnDate}
                      isReturn
                      theme="dark"
                      small
                    />
                  </div>
                )}
              </>
            )}

            {/* Travellers */}
            <div style={{ width: "180px" }}>
              <TravellerSelector
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                infants={infants}
                setInfants={setInfants}
                travelClass={travelClass}
                setTravelClass={setTravelClass}
                theme="dark"
                small
              />
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="fw-bold border-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #08e9fd 13%, #49b0fd 81%)",
                fontSize: "14px",
                padding: "9px 30px",
                borderRadius: "25px",
                color: "#fff",
                letterSpacing: "0.5px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              {showLoader ? "SEARCHING..." : "SEARCH"}
            </Button>
          </div>

          {/* MULTI-CITY SECTION */}
          {tripType === "multi" && (
            <div className="mb-2 mt-1">
              {multiCities.map((city, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-start flex-nowrap"
                  style={{
                    background: "linear-gradient(to right, #0b1625, #0f2138)",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    marginBottom: "6px",
                    gap: "12px",
                    boxShadow: "inset 0 0 2px rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    className="fw-semibold"
                    style={{
                      width: "55px",
                      fontSize: "11px",
                      color: "#49b0fd",
                      flexShrink: 0,
                    }}
                  >
                    TRIP {index + 1}
                  </span>

                  <div style={{ width: "160px" }}>
                    <CitySelector
                      label="From"
                      city={city.from}
                      setCity={(val) => handleMultiChange(index, "from", val)}
                      activeDropdown={activeDropdown}
                      setActiveDropdown={setActiveDropdown}
                      theme="dark"
                      small
                    />
                  </div>

                  <div style={{ width: "160px" }}>
                    <CitySelector
                      label="To"
                      city={city.to}
                      setCity={(val) => handleMultiChange(index, "to", val)}
                      activeDropdown={activeDropdown}
                      setActiveDropdown={setActiveDropdown}
                      theme="dark"
                      small
                    />
                  </div>

                  <div style={{ width: "140px" }}>
                    <DateSelector
                      label="Depart"
                      date={city.date}
                      setDate={(val) => handleMultiChange(index, "date", val)}
                      theme="dark"
                      small
                    />
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-end"
                    style={{ gap: "6px", marginLeft: "auto", flexShrink: 0 }}
                  >
                    {index > 1 && (
                      <button
                        className="btn border-0 d-flex align-items-center justify-content-center p-0"
                        onClick={() => removeCity(index)}
                        title="Remove City"
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(255,255,255,0.1)",
                          color: "#fff",
                          transition: "0.2s ease",
                        }}
                      >
                        <X size={14} />
                      </button>
                    )}

                    {index === multiCities.length - 1 &&
                      multiCities.length < 5 && (
                        <Button
                          onClick={addCity}
                          className="fw-semibold border-0"
                          style={{
                            fontSize: "11px",
                            height: "28px",
                            borderRadius: "20px",
                            padding: "4px 12px",
                            backgroundImage:
                              "linear-gradient(to right, #08e9fd 13%, #49b0fd 81%)",
                            color: "#fff",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          + Add City
                        </Button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            className="mt-1"
            style={{ transform: "scale(0.9)", transformOrigin: "left" }}
          >
            <FareTypeSelector
              fareType={fareType}
              setFareType={setFareType}
              zeroCancellation={initialZeroCancellation}
              setZeroCancellation={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
