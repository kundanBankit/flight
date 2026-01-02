import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

export default function CitySelector({
  label,
  city,
  setCity,
  airports = [],
  oppositeCity,
  theme = "light",
}) {
  const [showList, setShowList] = useState(false);
  const [filter, setFilter] = useState("");
  const ref = useRef(null);

  /* ---------------------------------------------------
     📌 CLOSE DROPDOWN ON OUTSIDE CLICK
  --------------------------------------------------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------------------------------------------
     📌 LOAD DEFAULT OR LAST SELECTED CITY
  --------------------------------------------------- */
  useEffect(() => {
    const key = label === "From" ? "lastFromCity" : "lastToCity";
    const saved = localStorage.getItem(key);

    if (saved) {
      setCity(JSON.parse(saved));
    } else {
      // DEFAULT VALUES
      if (label === "From") {
        setCity({
          city: "Delhi",
          code: "DEL",
          airport: "Indira Gandhi International Airport",
        });
      } else {
        setCity({
          city: "Mumbai",
          code: "BOM",
          airport: "Chhatrapati Shivaji International Airport",
        });
      }
    }
  }, []);

  /* ---------------------------------------------------
     📌 SEARCH FILTER
     (HIDE OPPOSITE CITY)
  --------------------------------------------------- */
  const filtered = airports.filter((item) => {
    if (oppositeCity && item.code === oppositeCity.code) return false;

    return `${item.city} ${item.airport} ${item.code}`
      .toLowerCase()
      .includes(filter.toLowerCase());
  });

  /* ---------------------------------------------------
     🎨 THEME STYLES
  --------------------------------------------------- */
  const isDark = theme === "dark";
  const textColor = isDark ? "#fff" : "#212529";
  const labelColor = isDark ? "#d1d5db" : "#6c757d";
  const dropdownBg = isDark ? "#1a1a1d" : "#ffffff";
  const dropdownHover = isDark ? "#2a2a2e" : "#f8f9fa";
  const codeColor = isDark ? "#0BABE4" : "#0d6efd";

  /* ---------------------------------------------------
     📌 MAIN UI
  --------------------------------------------------- */
  return (
    <div
      ref={ref}
      className="position-relative border-end p-2"
      style={{ cursor: "pointer", marginLeft: "14px" }}
      onClick={() => setShowList(true)}
    >
      {/* Label */}
      <div className="mb-1">
        <small className="fw-semibold" style={{ color: labelColor }}>
          {label}
        </small>
      </div>

      {/* Selected City */}
      <div className="form-control border-0 bg-transparent p-0">
        <input
          type="text"
          className="form-control border-0 fw-bold fs-5 p-0 bg-transparent "
          value={city?.city || ""}
          readOnly
          placeholder="Select City"
          style={{
            color: textColor,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            
          }}
        />

        {/* CODE + AIRPORT BELOW MAIN TITLE */}
        <div className="small text-truncate" style={{ color: isDark ? "#9ca3af" : "#6c757d" }}>
          {city ? `${city.code}, ${city.airport}` : ""}
        </div>
      </div>

      {/* DROPDOWN LIST */}
      {showList && (
        <div
          className="position-absolute rounded-3 shadow-lg mt-2 dropdown-list"
          style={{
            zIndex: 2000,
            width: "360px",
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: dropdownBg,
            left: 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Field */}
          <div
            className="d-flex align-items-center border-bottom px-3 py-2 sticky-top"
            style={{
              top: 0,
              zIndex: 10,
              backgroundColor: dropdownBg,
            }}
          >
            <Search
              size={18}
              className={isDark ? "text-light me-2" : "text-muted me-2"}
            />

            <input
              type="text"
              className={`form-control border-0 shadow-none p-0 bg-transparent ${
                isDark ? "text-white" : "text-dark"
              }`}
              placeholder="Search city or airport"
              value={filter}
              autoFocus
              onChange={(e) => setFilter(e.target.value)}
              style={{ fontSize: "0.95rem" }}
            />
          </div>

          {/* CITY LIST */}
          {filtered.length > 0 ? (
            filtered.map((a) => (
              <div
                key={a.code}
                className="px-3 py-2 d-flex justify-content-between align-items-center border-bottom"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = dropdownHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onClick={() => {
                  const selectedCity = {
                    city: a.city,
                    code: a.code,
                    airport: a.airport,
                  };

                  setCity(selectedCity);

                  localStorage.setItem(
                    label === "From" ? "lastFromCity" : "lastToCity",
                    JSON.stringify(selectedCity)
                  );

                  setShowList(false);
                  setFilter("");
                }}
              >
                <div className="text-truncate">
                  <div
                    className="fw-bold text-truncate"
                    style={{ color: textColor, fontSize: "1rem" }}
                  >
                    {a.city}
                  </div>

                  <div
                    className="small text-truncate"
                    style={{ color: isDark ? "#cbd5e1" : "#6c757d" }}
                  >
                    {a.code}, {a.airport}
                  </div>
                </div>

                <div className="fw-bold" style={{ color: codeColor }}>
                  {a.code}
                </div>
              </div>
            ))
          ) : (
            <div
              className="px-3 py-2 small text-center"
              style={{ color: isDark ? "#9ca3af" : "#6c757d" }}
            >
              No results found
            </div>
          )}
        </div>
      )}

      {/* Responsive CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .dropdown-list {
              width: 100% !important;
              left: 0 !important;
              right: 0 !important;
              border-radius: 0 0 12px 12px;
            }
          }

          @media (min-width: 769px) and (max-width: 992px) {
            .dropdown-list {
              width: 300px !important;
            }
          }

          @media (min-width: 993px) {
            .dropdown-list {
              width: 360px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
