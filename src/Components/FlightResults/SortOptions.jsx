// SortOptions.jsx
import React, { useState, useRef, useEffect } from "react";
import { IndianRupee, Zap, Star, ListFilter, Check } from "lucide-react";

const SortOptions = ({ onSortChange }) => {
  const [active, setActive] = useState("CHEAPEST");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOtherSort, setSelectedOtherSort] = useState(null);

  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  const options = [
    {
      key: "CHEAPEST",
      label: "CHEAPEST",
      price: "₹6,569",
      duration: "02h 50m",
      icon: <IndianRupee size={18} />,
    },
    {
      key: "NON_STOP_FIRST",
      label: "NON STOP FIRST",
      price: "₹6,569",
      duration: "02h 50m",
      icon: <Zap size={18} />,
    },
    {
      key: "YOU_MAY_PREFER",
      label: "YOU MAY PREFER",
      price: "₹7,221",
      duration: "02h 35m",
      icon: <Star size={18} />,
    },
    {
      key: "OTHER_SORT",
      label: "Other Sort",
      icon: <ListFilter size={18} />,
    },
  ];

  const otherSortOptions = [
    "Discounted Price",
    "Early Departure",
    "Late Departure",
    "Early Arrival",
    "Late Arrival",
  ];

  // ⭐ DROPDOWN POSITION
  const openDropdown = () => {
    if (triggerRef.current && containerRef.current) {
      const btn = triggerRef.current.getBoundingClientRect();
      const cont = containerRef.current.getBoundingClientRect();

      setDropdownStyle({
        position: "absolute",
        top: btn.bottom - cont.top + 6,
        left: btn.left - cont.left,
        width: btn.width,
        zIndex: 99999,
      });

      setDropdownOpen(true);
    }
  };

  // ⭐ OUTSIDE CLICK LISTENER
  useEffect(() => {
    const handleClickOutside = (e) => {
      const dropdown = document.getElementById("sort-dropdown");

      if (
        dropdownOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        dropdown &&
        !dropdown.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // ⭐ SORT MESSAGE LOGIC
  const getSortMessage = () => {
    if (selectedOtherSort) return selectedOtherSort;

    switch (active) {
      case "CHEAPEST":
        return "Lowest fares";
      case "NON_STOP_FIRST":
        return "Fewesr Stops";
      case "YOU_MAY_PREFER":
        return "Popularity (based on price, duration & convenience)";
      default:
        return "Lowest fares";
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="container d-flex flex-column bg-white p-2 rounded shadow-sm mt-1"
        style={{ position: "relative" }}
      >
        {/* SORT OPTIONS ROW */}
        <div
          className="d-flex justify-content-between mt-2 hide-scrollbar"
          style={{
            gap: "12px",
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {options.map((opt) => {
            const isOther = opt.key === "OTHER_SORT";
            const isActive =
              active === opt.key ||
              (isOther && active === "OTHER_SORT" && selectedOtherSort);

            return (
              <div
                key={opt.key}
                ref={isOther ? triggerRef : null}
                onClick={() => {
                  if (isOther) {
                    dropdownOpen ? setDropdownOpen(false) : openDropdown();
                  } else {
                    setActive(opt.key);
                    setSelectedOtherSort(null);
                    setDropdownOpen(false);
                    if (onSortChange) onSortChange(opt.key);
                  }
                }}
                className={`d-flex flex-column px-3 py-2 border rounded-3 ${
                  isActive ? "border-primary bg-primary bg-opacity-10" : "bg-light"
                }`}
                style={{
                  minWidth: "220px",
                  cursor: "pointer",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <div className="d-flex align-items-center mb-1">
                  <div
                    className={`me-2 ${
                      isActive ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {opt.icon}
                  </div>
                  <strong
                    style={{
                      color: isActive ? "#0078ff" : "#333",
                      fontSize: "14px",
                    }}
                  >
                    {opt.label}
                  </strong>
                </div>

                <p
                  className="mb-0"
                  style={{
                    fontSize: "13px",
                    color: "#555",
                    visibility: opt.price ? "visible" : "hidden",
                  }}
                >
                  {opt.price ? `${opt.price} | ${opt.duration}` : ""}
                </p>

                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: "3px",
                      width: "100%",
                      backgroundColor: "#0078ff",
                      borderRadius: "0 0 5px 5px",
                    }}
                  ></div>
                )}

                {isOther && selectedOtherSort && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#0078ff",
                      marginTop: "4px",
                      fontWeight: "500",
                    }}
                  >
                    {selectedOtherSort}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* SORTED TEXT (Dynamic Message) */}
        <div
          className="mt-3 text-left"
          style={{ fontWeight: "bold", color: "black" }}
        >
          <p>Flights sorted by {getSortMessage()} on this route</p>
        </div>

        {/* ⭐ DROPDOWN */}
        {dropdownOpen && (
          <div
            id="sort-dropdown"
            style={{
              ...dropdownStyle,
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              padding: "6px 0",
            }}
          >
            {otherSortOptions.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setSelectedOtherSort(item);
                  setActive("OTHER_SORT");
                  setDropdownOpen(false);
                  if (onSortChange) onSortChange(item);
                }}
                className="d-flex align-items-center justify-content-between px-3 py-2"
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedOtherSort === item ? "#f0f8ff" : "transparent",
                }}
              >
                <span>{item}</span>
                {selectedOtherSort === item && <Check size={16} color="#0078ff" />}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default SortOptions;
