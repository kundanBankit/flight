import React from "react";
import { X } from "lucide-react";
import CitySelector from "./CitySelector";
import DateSelector from "./DateSelector";
import TravellerSelector from "./TravellerSelector";

export default function MultiCitySection({
  airportList,
  multiCities,
  handleMultiChange,
  addCity,
  removeCity,
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  travelClass,
  setTravelClass,
}) {
  return (
    <div className="fade-in">
      {multiCities.map((city, index) => {
        const isLastRow = index === multiCities.length - 1;

        return (
          <div
            key={index}
            className={`row gy-3 gx-2 align-items-center mb-3 ${
              index < multiCities.length - 1 ? "border-bottom pb-3" : ""
            }`}
          >
            {/* ---------------- FROM ---------------- */}
            <div className="col-12 col-md-3">
              <CitySelector
                label="From"
                city={city.from}
                setCity={(val) => handleMultiChange(index, "from", val)}
                airports={airportList}
                oppositeCity={city.to} // prevent selecting same as TO
                theme="light"
              />
            </div>

            {/* ---------------- TO ---------------- */}
            <div className="col-12 col-md-3">
              <CitySelector
                label="To"
                city={city.to}
                setCity={(val) => handleMultiChange(index, "to", val)}
                airports={airportList}
                oppositeCity={city.from} // prevent selecting same as FROM
                theme="light"
              />
            </div>

            {/* ---------------- DEPARTURE DATE ---------------- */}
            <div className="col-12 col-md-3">
              <DateSelector
                label="Departure"
                date={city.date}
                setDate={(val) => handleMultiChange(index, "date", val)}
                theme="light"
              />
            </div>

            {/* ---------------- TRAVELLERS + ACTIONS ---------------- */}
            <div className="col-12 col-md-3 d-flex flex-column gap-2 align-items-md-end align-items-start">
              {/* Only FIRST ROW shows traveller selector */}
              {index === 0 && (
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
              )}

              {/* Add / Remove City Buttons */}
              <div className="d-flex flex-wrap gap-2 justify-content-end w-100">
                {/* Add Button - only last row & max 5 */}
                {isLastRow && multiCities.length < 5 && (
                  <button
                    onClick={addCity}
                    className="btn btn-outline-primary rounded-3 fw-semibold"
                  >
                    + ADD CITY
                  </button>
                )}

                {/* Remove Button - but never remove the first 2 */}
                {index > 1 && (
                  <button
                    onClick={() => removeCity(index)}
                    className="btn btn-light border rounded-circle"
                    title="Remove"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
