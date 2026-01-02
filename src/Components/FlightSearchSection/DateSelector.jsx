import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "react-date-range";
import {
  format,
  addMonths,
  startOfToday,
  isBefore,
  isAfter,
  isSameDay,
} from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateSelector({
  label,
  date,
  setDate,
  isReturn,
  theme = "light",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const today = startOfToday();
  const maxDate = addMonths(today, 4);
  const isDark = theme === "dark";

  const popupBg = isDark ? "#0d1117" : "#ffffff";
  const headerBg = isDark ? "#161b22" : "#f8f9fa";
  const borderColor = isDark ? "#30363d" : "#dee2e6";
  const mutedColor = isDark ? "#c9d1d9" : "#6c757d";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
  };

  const renderDayContent = (day) => {
    const isDisabled = isBefore(day, today) || isAfter(day, maxDate);
    const isSelected = date && isSameDay(day, date);

    return (
      <div
        className={`d-flex flex-column align-items-center justify-content-center day-cell ${
          isSelected ? "selected-day" : ""
        }`}
        style={{
          fontSize: "0.7rem",
          textAlign: "center",
          width: "100%",
          padding: "6px 0",
          lineHeight: "1.4",
          cursor: isDisabled ? "not-allowed" : "pointer",
          borderRadius: "6px",
          backgroundColor: isSelected
            ? isDark
              ? "#1f6feb"
              : "#e0f3ff"
            : "transparent",
          border: isSelected
            ? isDark
              ? "1px solid #58a6ff"
              : "1px solid #007bff"
            : "1px solid transparent",
          transition: "0.15s ease",
        }}
        onMouseEnter={(e) => {
          if (!isDisabled && !isSelected) {
            e.currentTarget.style.backgroundColor = isDark
              ? "#ffffffff"
              : "#f0f9ff";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected)
            e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#000",
            opacity: isDisabled ? 0.4 : 1,
          }}
        >
          {format(day, "d")}
        </span>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className="col-6 col-md-3 col-lg-2 p-3 position-relative"
      style={{
        cursor: "pointer",
        minWidth: "160px",
        backgroundColor: "transparent",
      }}
    >
      <div onClick={() => setOpen(!open)} className="border-end">
        <small style={{ color: mutedColor }}>{label}</small>

        {date ? (
          <>
            <div
              className="fw-bold fs-6"
              style={{ color: isDark ? "#ffffff" : "#0f0e0e" }}
            >
              {format(date, "dd MMM yy")}
            </div>
            <small style={{ color: mutedColor }}>
              {format(date, "EEEE")}
            </small>
          </>
        ) : (
          <div style={{ color: mutedColor }}>
            {isReturn ? "Tap to add date" : "Select date"}
          </div>
        )}
      </div>

      {open && (
        <div
          className="position-absolute rounded-4 shadow-lg mt-2"
          style={{
            zIndex: 3000,
            left: "-267px",
            backgroundColor: popupBg,
            width: "auto",
            border: `1px solid ${borderColor}`,
            maxHeight: "65vh",
            maxWidth: "95vw",
            overflowY: "auto",
            overflowX: "scroll",
            transform: "scale(0.9)",
            transformOrigin: "top left",
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom"
            style={{
              backgroundColor: headerBg,
              borderColor: borderColor,
              color: isDark ? "#fff" : "#000",
            }}
          >
            <div className="fw-semibold">
              {isReturn ? "Select return date" : "Select departure date"}
            </div>
            <button
              className="btn btn-sm rounded-pill"
              onClick={() => setOpen(false)}
              style={{
                backgroundColor: isDark ? "#238636" : "#f8f9fa",
                color: isDark ? "#fff" : "#000",
                border: "none",
              }}
            >
              Close
            </button>
          </div>

          <div
            className="px-2 pb-2"
            style={{
              backgroundColor: popupBg,
              color: "#000",
              minWidth: "650px",
            }}
          >
            <Calendar
              date={date || new Date()}
              onChange={handleSelect}
              months={2}
              direction="horizontal"
              showMonthAndYearPickers={false}
              color={isDark ? "#58a6ff" : "#0d6efd"}
              minDate={today}
              maxDate={maxDate}
              dayContentRenderer={renderDayContent}
            />
          </div>

          <div
            className="px-4 py-2 border-top d-flex justify-content-end align-items-center"
            style={{
              backgroundColor: headerBg,
              borderColor: borderColor,
            }}
          >
            <small style={{ color: mutedColor }}>
              Select your preferred date
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
