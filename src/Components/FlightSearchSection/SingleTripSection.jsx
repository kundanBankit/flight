import React from "react";
import { ArrowLeftRight } from "lucide-react";
import CitySelector from "./CitySelector";
import DateSelector from "./DateSelector";
import TravellerSelector from "./TravellerSelector";

export default function SingleTripSection({
  airportList,
  tripType,
  fromCity,
  setFromCity,
  toCity,
  setToCity,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  travelClass,
  setTravelClass,
  swapCities,
}) {
  return (
    <div className="fade-in position-relative">
      <div className="row gy-3 gx-3 align-items-center text-start position-relative">
        
        {/* -------------------------- FROM -------------------------- */}
        <div className="col-12 col-sm-6 col-md-4 col-lg position-relative">
          <CitySelector
            label="From"
            city={fromCity}
            setCity={setFromCity}
            airports={airportList}
            oppositeCity={toCity} // hide selected "TO" from list
            theme="light"
          />
        </div>

        {/* -------------------------- TO + SWAP -------------------------- */}
        <div className="col-12 col-sm-6 col-md-4 col-lg position-relative">
          {/* Swap Button */}
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
              zIndex: 10,
            }}
          >
            <ArrowLeftRight size={18} className="text-primary" />
          </button>

          <CitySelector
            label="To"
            city={toCity}
            setCity={setToCity}
            airports={airportList}
            oppositeCity={fromCity} // hide selected "FROM" from list
            theme="light"
          />
        </div>

        {/* -------------------------- DEPARTURE DATE -------------------------- */}
        <div className="col-6 col-md-4 col-lg">
          <DateSelector
            label="Departure"
            date={departureDate}
            setDate={setDepartureDate}
            theme="light"
          />
        </div>

        {/* -------------------------- RETURN DATE -------------------------- */}
        {tripType === "round" && (
          <div className="col-6 col-md-4 col-lg">
            <DateSelector
              label="Return"
              date={returnDate}
              setDate={setReturnDate}
              isReturn
              theme="light"
            />
          </div>
        )}

        {/* -------------------------- TRAVELLERS -------------------------- */}
        <div className="col-12 col-md-6 col-lg">
          <TravellerSelector
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
            infants={infants}
            setInfants={setInfants}
            travelClass={travelClass}
            setTravelClass={setTravelClass}
            theme="light"
          />
        </div>
      </div>
    </div>
  );
}
