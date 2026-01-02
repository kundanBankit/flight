import React, { useState, useEffect } from "react";
import TripTypeSelector from "./TripTypeSelector";
import SingleTripSection from "./SingleTripSection";
import MultiCitySection from "./MultiCitySection";
import FareSelector from "./FareSelector";
import ZeroCancellation from "./ZeroCancellation";
import SearchButton from "./SearchButton";
import { useNavigate } from "react-router-dom";
import CardLayout from "./CardLayout";
import FlightLoader from "../FlightLoader";

import flightService from "../../api/flightService"; // ✅ SERVICE LAYER

export default function FlightSearchSection() {
  const navigate = useNavigate();

  // ===========================
  // BASIC STATES
  // ===========================
  const [airportList, setAirportList] = useState([]);
  const [tripType, setTripType] = useState("oneway");

  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);

  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);

  const [fareType, setFareType] = useState("regular");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");

  const [zeroCancellation, setZeroCancellation] = useState(false);
  const [multiCities, setMultiCities] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loaderDuration, setLoaderDuration] = useState(5);


  // ===========================
  // MULTI-CITY HANDLERS
  // ===========================
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
        { from: lastTo, to: null, date: new Date() },
      ]);
    }
  };

  const removeCity = (index) => {
    if (multiCities.length > 2) {
      setMultiCities(multiCities.filter((_, i) => i !== index));
    }
  };

  // ===========================
  // LOAD AIRPORT LIST
  // ===========================
  useEffect(() => {
    const saved = localStorage.getItem("airportList");
    if (saved) {
      const list = JSON.parse(saved);
      setAirportList(list);
      initializeDefaults(list);
      return;
    }

    const loadCities = async () => {
      try {
        const cities = await flightService.getCityList();

        if (!cities || cities.length === 0) {
          console.warn("⚠️ City API returned empty list");
          return;
        }

        setAirportList(cities);
        localStorage.setItem("airportList", JSON.stringify(cities));
        initializeDefaults(cities);
      } catch (err) {
        console.error("City List API Error:", err);
      }
    };

    loadCities();
  }, []);

  // ===========================
  // DEFAULT FROM / TO CITIES
  // ===========================
  const initializeDefaults = (list) => {
    if (!Array.isArray(list) || list.length < 2) return;

    const savedFrom = localStorage.getItem("lastFromCity");
    const savedTo = localStorage.getItem("lastToCity");

    const defaultFrom = savedFrom ? JSON.parse(savedFrom) : list[0];
    const defaultTo = savedTo ? JSON.parse(savedTo) : list[1];

    setFromCity(defaultFrom);
    setToCity(defaultTo);

    setMultiCities([
      { from: defaultFrom, to: defaultTo, date: new Date() },
      { from: defaultTo, to: list[2] || list[0], date: new Date() },
    ]);
  };

  // ===========================
  // SEARCH HANDLER USING SERVICE
  // ===========================
  const handleSearch = async () => {
    setLoading(true);
    const start = performance.now();

    const payload = {
      agentId: "AG2190",
      vendor: "TRIPJACK",
      cabinClass: travelClass.toUpperCase(),
      adult: adults.toString(),
      child: children.toString(),
      infant: infants.toString(),
      isDirectFlight: true,
      isConnectingFlight: true,
      passengerFareType: "",
      routeInfos: [
        {
          fromCityOrAirport: fromCity?.code,
          toCityOrAirport: toCity?.code,
          travelDate: departureDate.toISOString().split("T")[0],
        },
        ...(tripType === "round"
          ? [
              {
                fromCityOrAirport: toCity?.code,
                toCityOrAirport: fromCity?.code,
                travelDate: returnDate.toISOString().split("T")[0],
              },
            ]
          : []),
      ],
    };

    try {
      const searchResults = await flightService.searchFlights(payload);

      const end = performance.now();
      const apiTime = Math.ceil((end - start) / 1000);
      setLoaderDuration(apiTime);

      setLoading(false);

      navigate("/flight-results", {
        state: {
          searchData: {
            tripType,
            fromCity,
            toCity,
            departureDate,
            returnDate,
            multiCities,
            adults,
            children,
            infants,
            travelClass,
            fareType,
            zeroCancellation,
            airportList,
          },
          apiData: searchResults, // { ONWARD: [...], RETURN: [...] }
          loaderDuration: apiTime,
        },
      });
    } catch (err) {
      console.error("❌ Flight Search Error:", err);
      setLoading(false);
    }
  };

  // ===========================
  // UI
  // ===========================
  return (
    <>
      {loading && (
        <FlightLoader
          message="Searching best flight options..."
          duration={loaderDuration}
        />
      )}

      <div style={{ opacity: loading ? 0 : 1 }}>
        <CardLayout>
          {/* Trip Selector */}
          <div className="d-flex justify-content-center mb-3">
            <TripTypeSelector tripType={tripType} setTripType={setTripType} />
          </div>

          {/* Search Card */}
          <div className="card rounded-4 shadow-sm mx-auto mt-4" style={{ maxWidth: "95%" }}>
            <div className="card-body p-4 bg-white rounded-4">
              {tripType !== "multi" ? (
                <SingleTripSection
                  tripType={tripType}
                  fromCity={fromCity}
                  setFromCity={setFromCity}
                  toCity={toCity}
                  setToCity={setToCity}
                  airportList={airportList}
                  departureDate={departureDate}
                  setDepartureDate={setDepartureDate}
                  returnDate={returnDate}
                  setReturnDate={setReturnDate}
                  adults={adults}
                  setAdults={setAdults}
                  children={children}
                  setChildren={setChildren}
                  infants={infants}
                  setInfants={setInfants}
                  travelClass={travelClass}
                  setTravelClass={setTravelClass}
                />
              ) : (
                <MultiCitySection
                  airportList={airportList}
                  multiCities={multiCities}
                  handleMultiChange={handleMultiChange}
                  addCity={addCity}
                  removeCity={removeCity}
                  adults={adults}
                  setAdults={setAdults}
                  children={children}
                  setChildren={setChildren}
                  infants={infants}
                  setInfants={setInfants}
                  travelClass={travelClass}
                  setTravelClass={setTravelClass}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-3">
            <FareSelector fareType={fareType} setFareType={setFareType} />
            <ZeroCancellation
              zeroCancellation={zeroCancellation}
              setZeroCancellation={setZeroCancellation}
            />
            <SearchButton handleSearch={handleSearch} />
          </div>
        </CardLayout>
      </div>
    </>
  );
}
