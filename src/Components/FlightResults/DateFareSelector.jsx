import React, { useState, useMemo, useEffect } from "react";

const DateFareSelector = ({ selectedSearchDate, onDateChange }) => {
  const [dateOffset, setDateOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    selectedSearchDate ? new Date(selectedSearchDate) : null
  );

  const TOTAL_VISIBLE = 8;
  const TOTAL_DAYS = 120;

  const dateFareList = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const list = [];
    for (let i = 0; i < TOTAL_DAYS; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      list.push({ date: d });
    }
    return list;
  }, []);

  const visibleDays = dateFareList.slice(
    dateOffset,
    dateOffset + TOTAL_VISIBLE
  );

  const formatKey = (d) =>
    d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  useEffect(() => {
    if (!selectedSearchDate) return;

    const target = new Date(selectedSearchDate);
    target.setHours(0, 0, 0, 0);

    const index = dateFareList.findIndex(
      (d) => d.date.toDateString() === target.toDateString()
    );

    if (index !== -1) {
      setSelectedDate(target);
      setDateOffset(Math.max(index - 2, 0));
    }
  }, [selectedSearchDate, dateFareList]);

  return (
    <div className="bg-white shadow-sm rounded-3" style={{ padding: "8px 6px" }}>
      <div className="d-flex align-items-center">
        {/* LEFT */}
        <div
          onClick={() => setDateOffset(Math.max(dateOffset - 1, 0))}
          style={{ cursor: "pointer", fontSize: 20 }}
        >
          ❮
        </div>

        {/* DATES */}
        <div className="d-flex flex-grow-1 overflow-hidden">
          {visibleDays.map(({ date }, index) => {
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();

            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedDate(date);
                  onDateChange && onDateChange(date);
                }}
                style={{
                  width: 140,
                  padding: "10px 4px",
                  cursor: "pointer",
                  textAlign: "center",
                  borderBottom: isSelected
                    ? "3px solid #1a73e8"
                    : "3px solid transparent",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: isSelected ? 700 : 600,
                    color: isSelected ? "#1a73e8" : "#000",
                  }}
                >
                  {formatKey(date)}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT */}
        <div
          onClick={() =>
            setDateOffset(
              Math.min(dateOffset + 1, TOTAL_DAYS - TOTAL_VISIBLE)
            )
          }
          style={{ cursor: "pointer", fontSize: 20 }}
        >
          ❯
        </div>
      </div>
    </div>
  );
};

export default DateFareSelector;
