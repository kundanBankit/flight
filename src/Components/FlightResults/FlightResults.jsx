// FlightResults.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DateFareSelector from "./DateFareSelector";
import SortOptions from "./SortOptions";
import FlightCard from "./FlightCard";
import SearchHeader from "./SearchHeader";
import AppliedFilters from "./AppliedFilters";
import CardLayoutResults from "./CardLayoutResults";
import ReturnFlightResultHeader from "./ReturnFlightResultHeader";
import FlightCardRoundTrip from "./FlightCardRoundTrip";
import FlightLoader from "../FlightLoader";
import SelectedReturnFlight from "./SelectedReturnFlight";
import FareOptionsPopup from "./FareOptionsPopup";

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);

  //  FILTER STATE
  const [filterData, setFilterData] = useState(null);

  // FILTER ENGINE
  const applyFiltersToFlights = (flights, filters) => {
    if (!filters) return flights;
    let result = [...flights];

    //  PRICE FILTER
    if (filters.priceFilter.active) {
      result = result.filter(
        (f) => (f?.fares?.[0]?.baseFare || 0) <= filters.priceFilter.value
      );
    }

    // STOPS FILTER (Corrected logic)
    const selectedStops = filters.stops
      .filter((s) => s.checked)
      .map((s) => s.stops);

    if (selectedStops.length > 0) {
      result = result.filter((f) => {
        const stopCount = (f?.segments?.length || 1) - 1;
        return selectedStops.includes(stopCount);
      });
    }

    //  AIRLINE FILTER
    const selectedAirlines = filters.airlines
      .filter((a) => a.checked)
      .map((a) => a.name);

    if (selectedAirlines.length > 0) {
      result = result.filter((f) =>
        selectedAirlines.includes(f?.segments?.[0]?.airlineName)
      );
    }

    //  DEPARTURE SLOT FILTER
    const depSlots = filters.departureSlots.filter((s) => s.checked);
 
if (depSlots.length > 0) {
  result = result.filter((f) => {
    const depH = new Date(
      f?.segments?.[0]?.departure?.datetime
    ).getHours();
 
    return depSlots.some((slot) => {
      if (slot.label === "Before 6 AM") return depH < 6;
      if (slot.label === "6 AM to 12 PM") return depH >= 6 && depH < 12;
      if (slot.label === "12 PM to 6 PM") return depH >= 12 && depH < 18;
      if (slot.label === "After 6 PM") return depH >= 18;
      return false;
    });
  });
}
 
// ✅ ARRIVAL SLOT FILTER
const arrSlots = filters.arrivalSlots.filter((s) => s.checked);
 
if (arrSlots.length > 0) {
  result = result.filter((f) => {
    const segments = f?.segments || [];
    const lastSeg = segments[segments.length - 1];
    const arrH = new Date(
      lastSeg?.arrival?.datetime
    ).getHours();
 
    return arrSlots.some((slot) => {
      if (slot.label === "Before 6 AM") return arrH < 6;
      if (slot.label === "6 AM to 12 PM") return arrH >= 6 && arrH < 12;
      if (slot.label === "12 PM to 6 PM") return arrH >= 12 && arrH < 18;
      if (slot.label === "After 6 PM") return arrH >= 18;
      return false;
    });
  });
}
 
 

    return result;
  };

  // Incoming data
  const {
    searchData = null,
    apiData = { ONWARD: [], RETURN: [] },
    loaderDuration = 3,
  } = location.state || {};

  const onwardFlights = Array.isArray(apiData.ONWARD) ? apiData.ONWARD : [];
  const returnFlights = Array.isArray(apiData.RETURN) ? apiData.RETURN : [];

  // ⭐ SORT STATE
  const [sortKey, setSortKey] = useState("CHEAPEST");
  const [sortedOnward, setSortedOnward] = useState(onwardFlights);

  // ⭐ SORT ENGINE
  const sortFlights = (flights, key) => {
    let sorted = [...flights];

    switch (key) {
      case "CHEAPEST":
        sorted.sort(
          (a, b) =>
            (a?.fares?.[0]?.baseFare || 0) - (b?.fares?.[0]?.baseFare || 0)
        );
        break;

      case "NON_STOP_FIRST":
        sorted.sort(
          (a, b) => (a.segments?.length || 1) - (b.segments?.length || 1)
        );
        break;

      case "YOU_MAY_PREFER":
        sorted.sort((a, b) => (a?.duration || 9999) - (b?.duration || 9999));
        break;

      case "Discounted Price":
        sorted.sort(
          (a, b) =>
            (a?.fares?.[0]?.baseFare || 0) - (b?.fares?.[0]?.baseFare || 0)
        );
        break;

      case "Early Departure":
        sorted.sort(
          (a, b) =>
            new Date(a.segments[0]?.departure?.datetime) -
            new Date(b.segments[0]?.departure?.datetime)
        );
        break;

      case "Late Departure":
        sorted.sort(
          (a, b) =>
            new Date(b.segments[0]?.departure?.datetime) -
            new Date(a.segments[0]?.departure?.datetime)
        );
        break;

      default:
        break;
    }

    return sorted;
  };

  // Runs when Sort Key OR Flights update
  useEffect(() => {
    setSortedOnward(sortFlights(onwardFlights, sortKey));
  }, [sortKey, onwardFlights]);

  // Sort option clicked
  const applySorting = (key) => {
    setSortKey(key);
  };

  // ⭐ Sticky header
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedOnwardFlight, setSelectedOnwardFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);

  const [showOptionsPopup, setShowOptionsPopup] = useState(false);
  const [selectedFlightForPopup, setSelectedFlightForPopup] = useState(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const [hasUserSelectedOnward, setHasUserSelectedOnward] = useState(false);
  
  // ⭐ FINAL flights = Sorted + Filtered
  const finalOnward = applyFiltersToFlights(sortedOnward, filterData);
  const finalReturn = applyFiltersToFlights(returnFlights, filterData);
 
// ✅ Auto-select top onward flight until user clicks
useEffect(() => {
  if (!finalOnward?.length || hasUserSelectedOnward) return;

  const first = finalOnward[0];
  const firstSeg = first.segments[0];

  const uniqueKey =
    firstSeg.airlineCode +
    "_" +
    firstSeg.departure.datetime +
    "_" +
    (first.fares?.[0]?.id || "");

  setSelectedOnwardFlight(prev => {
    // ✅ prevent infinite loop
    if (prev?.uniqueKey === uniqueKey) return prev;
    return { ...first, uniqueKey };
  });

}, [finalOnward, hasUserSelectedOnward]);

 
// ✅ Auto-select top return flight (if none selected)
useEffect(() => {
  if (finalReturn?.length > 0 && !selectedReturnFlight) {
    const first = finalReturn[0];
    const firstSeg = first.segments[0];
 
    const uniqueKey =
      firstSeg.airlineCode +
      "_" +
      firstSeg.departure.datetime +
      "_" +
      (first.fares?.[0]?.id || "");
 
    setSelectedReturnFlight({ ...first, uniqueKey });
  }
}, [finalReturn, selectedReturnFlight]);

  if (!searchData) {
    return (
      <div className="text-center mt-5">
        <h4>No search data found!</h4>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/flight-search")}
        >
          Go Back
        </button>
      </div>
    );
  }



  const readableFrom = `${searchData.fromCity?.city} (${searchData.fromCity?.code})`;
  const readableTo = `${searchData.toCity?.city} (${searchData.toCity?.code})`;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        minHeight: "100vh",
        overflowX: "auto",
        background: `
          linear-gradient(
            to bottom,
            #021021 0px,
            #021021 130px,
            #092444 210px,
            #0c2f4e 270px,
            #1a406a 330px,
            #14355b 380px,
            #E5EEF4 380px,
            #E5EEF4 100%
          )
        `,
      }}
    >
      {/* Sticky Header */}
      <div
        ref={headerRef}
        className={`search-header-wrapper ${isSticky ? "sticky" : ""}`}
        style={{
          backgroundColor: isSticky ? "rgba(4,20,34,0.95)" : "transparent",
          width: "100%",
          transition: "all 0.3s ease",
          backdropFilter: isSticky ? "blur(6px)" : "none",
        }}
      >
        <SearchHeader
          searchData={searchData}
          onSearch={(signal) => {
            if (signal === "start") setIsLoading(true);
            if (signal === "stop") setIsLoading(false);
          }}
        />
      </div>

      <div style={{ height: isSticky ? `${headerHeight}px` : "0px" }} />

      {isLoading && (
        <FlightLoader
          message="Searching best flight options..."
          duration={loaderDuration}
        />
      )}

      {!isLoading && (
        <CardLayoutResults>
          <div
            className="flightBody"
            style={{
              display: "flex",
              gap: "12px",
              padding: "0 20px",
              width: "100%",
              maxWidth: "1300px",
              margin: "0 auto",
            }}
          >
            {/* LEFT FILTERS */}
            <div
              style={{
                width: "280px",
                flexShrink: 0,
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                position: "sticky",
                top: `${headerHeight + 20}px`,
                height: "fit-content",
              }}
            >
              <AppliedFilters
                flights={onwardFlights}
                fromCity={searchData.fromCity?.city}
                toCity={searchData.toCity?.city}
                onFilterChange={(data) => setFilterData(data)}
              />
            </div>

            {/* RIGHT SIDE */}
            <div style={{ flex: 1, width: "0" }}>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#f3f3f3",
                }}
              >
                Flights from <b>{readableFrom}</b> to <b>{readableTo}</b>
              </p>
              {searchData.tripType === "oneway" && (
                <DateFareSelector
                  selectedSearchDate={searchData.departureDate}
                  flights={onwardFlights} // ⭐ FLIGHTS PASS KARNE PADENGE
                />
              )}

              {searchData.tripType === "oneway" && (
                <SortOptions onSortChange={applySorting} />
              )}

              {/* ⭐ SORTED + FILTERED FLIGHTS */}
              {searchData.tripType === "oneway" && (
                <FlightCard flights={finalOnward} />
              )}

              {/* ROUND TRIP */}
              {searchData.tripType === "round" && (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 45%" }}>
                    <FlightCardRoundTrip
  direction="onward"
  flights={finalOnward}
  selectedFlight={selectedOnwardFlight}
  onSelectFlight={(f) => {
    setHasUserSelectedOnward(true);   // ✅ mark manual select
    setSelectedOnwardFlight(f);
  }}
/>
                  </div>

                  <div style={{ flex: "1 1 45%" }}>
                     <FlightCardRoundTrip
                      direction="return"
                      flights={finalReturn}
                      selectedFlight={selectedReturnFlight}
                      onSelectFlight={setSelectedReturnFlight}
                    />
                  </div>
                </div>
              )}

              {/* Bottom Selected Fare Card */}
              {searchData.tripType === "round" &&
                selectedOnwardFlight &&
                selectedReturnFlight && (
                  <div
                    style={{
                      position: "fixed",
                      bottom: "10px",
                      // left: "0px",
                      width: "932px", // your card width (adjust if needed)
                      // marginLeft: "20px",
                      background: "rgba(10,28,58,0.95)",
                      // padding: "10px 20px",
                      borderTop: "2px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(6px)",
                      zIndex: 9,
                      borderRadius: "5px",
                    }}
                  >
                    <SelectedReturnFlight
                      flight={{
                        departure: {
                          ...selectedOnwardFlight,
                          price:
                            selectedOnwardFlight?.price ||
                            selectedOnwardFlight?.totalFare ||
                            0,
                        },
                        returnFlight: {
                          ...selectedReturnFlight,
                          price:
                            selectedReturnFlight?.price ||
                            selectedReturnFlight?.totalFare ||
                            0,
                        },
                        totalFare:
                          (selectedOnwardFlight?.price ||
                            selectedOnwardFlight?.totalFare ||
                            0) +
                          (selectedReturnFlight?.price ||
                            selectedReturnFlight?.totalFare ||
                            0),
                      }}
                      onBookNow={(flight) => {
                        setSelectedFlightForPopup(flight);
                        setShowOptionsPopup(true);
                      }}
                    />
                  </div>
                )}
            </div>
          </div>
        </CardLayoutResults>
      )}

      {/* Fare Popup */}
      {showOptionsPopup && selectedFlightForPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 9,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "auto",
            padding: "40px 0",
          }}
        >
          <FareOptionsPopup
            flight={selectedFlightForPopup}
            onClose={() => setShowOptionsPopup(false)}
          />
        </div>
      )}
    </div>
  );
};

export default FlightResults;
