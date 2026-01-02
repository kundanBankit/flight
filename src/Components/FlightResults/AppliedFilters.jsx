import React, { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Sun, Moon, Sunrise } from "lucide-react";
import airlineLogos from "../../utils/airlineLogos";

const AppliedFilters = ({ flights = [], fromCity, toCity, onFilterChange }) => {
  const chipContainerRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  /* ---------------------------------------------------------
   * 1️⃣ Extract Dynamic Data
   * --------------------------------------------------------- */

  const getFare = (f) => f?.fares?.[0]?.baseFare || 0;

  // Airlines
  const airlinesRaw = flights.map((f) => ({
    name: f?.segments?.[0]?.airlineName,
    code: f?.segments?.[0]?.airlineCode,
    price: getFare(f),
  }));

  const dynamicAirlines = [
    ...new Map(airlinesRaw.map((a) => [a.name, a])).values(),
  ];

  // Stops
  const stopsRaw = flights.map((f) => ({
    stops: (f?.segments?.length || 1) - 1,
    price: getFare(f),
  }));

  const stopsMap = {};
  stopsRaw.forEach((s) => {
    if (!stopsMap[s.stops]) stopsMap[s.stops] = [];
    stopsMap[s.stops].push(s.price);
  });

  const dynamicStops = Object.entries(stopsMap).map(
    ([stop, list], idx) => ({
      id: idx + 1,
      stops: Number(stop),
      name: Number(stop) === 0 ? "Non Stop" : `${stop} Stop`,
      price: Math.min(...list),
      checked: false,
    })
  );

  // Price
  const minPrice = Math.min(...flights.map(getFare)) || 0;
  const maxPrice = Math.max(...flights.map(getFare)) || 0;

  /* ---------------------------------------------------------
   * 2️⃣ FILTER STATE
   * --------------------------------------------------------- */

  const [price, setPrice] = useState(maxPrice);

  const [filters, setFilters] = useState({
    priceFilter: { active: false, value: maxPrice },

    popular: [
      // {
      //   id: 1,
      //   name: "Non Stop",
      //   price: dynamicStops.find((s) => s.stops === 0)?.price || minPrice,
      //   checked: false,
      // },
      // {
      //   id: 2,
      //   name: "1 Stop",
      //   price: dynamicStops.find((s) => s.stops === 1)?.price || minPrice,
      //   checked: false,
      // },
      // { id: 3, name: "Refundable Fares", price: minPrice, checked: false },
      // { id: 4, name: "Early Departure", price: minPrice, checked: false },
      // { id: 5, name: "Late Departure", price: minPrice, checked: false },
    ],

    stops: dynamicStops,

    airlines: dynamicAirlines.map((a, idx) => ({
      id: idx + 1,
      name: a.name,
      code: a.code,
      icon: airlineLogos[a.code] || airlineLogos.DEFAULT,
      price: a.price,
      checked: false,
    })),

    departureSlots: [
  { id: 1, label: "6 AM to 12 PM", icon: <Sun size={24} />, checked: false },
  { id: 2, label: "12 PM to 6 PM", icon: <Sun size={24} />, checked: false },
  { id: 3, label: "After 6 PM", icon: <Moon size={24} />, checked: false },
  { id: 4, label: "Before 6 AM", icon: <Sunrise size={24} />, checked: false },
],


 arrivalSlots: [
  { id: 1, label: "Before 6 AM", icon: <Sunrise size={24} />, checked: false },
  { id: 2, label: "6 AM to 12 PM", icon: <Sun size={24} />, checked: false },
  { id: 3, label: "12 PM to 6 PM", icon: <Sun size={24} />, checked: false },
  { id: 4, label: "After 6 PM", icon: <Moon size={24} />, checked: false },
],



    aircraft: [
      { id: 1, name: "Small Aircraft", checked: false },
      { id: 2, name: "Medium Aircraft", checked: false },
      { id: 3, name: "Large Aircraft", checked: false },
    ],
  });



  useEffect(() => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        priceFilter: {
          active: price !== maxPrice,
          value: price,
        },
      };

      onFilterChange(updated);
      return updated;
    });
  }, [price]);



  const handleFilterChange = (section, id) => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        [section]: prev[section].map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        ),
      };

      onFilterChange(updated);

      setTimeout(() => {
        chipContainerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 80);

      return updated;
    });
  };


  const removePriceFilter = () => setPrice(maxPrice);


  let activeChips = [];

  if (filters.priceFilter.active) {
    activeChips.push({
      id: "price",
      section: "priceFilter",
      label: `₹ ${minPrice.toLocaleString()} – ₹ ${price.toLocaleString()}`,
    });
  }

  ["popular", "stops", "airlines", "departureSlots", "arrivalSlots"].forEach(
    (section) =>
      filters[section].forEach((item) => {
        if (item.checked)
          activeChips.push({
            id: item.id,
            section,
            label: item.name || item.label,
          });
      })
  );

 

  const handleClearAll = () => {
    const reset = {
      ...filters,
      priceFilter: { active: false, value: maxPrice },

      popular: filters.popular.map((i) => ({ ...i, checked: false })),
      stops: filters.stops.map((i) => ({ ...i, checked: false })),
      airlines: filters.airlines.map((i) => ({ ...i, checked: false })),
      departureSlots: filters.departureSlots.map((i) => ({ ...i, checked: false })),
      arrivalSlots: filters.arrivalSlots.map((i) => ({ ...i, checked: false })),
    };

    setPrice(maxPrice);
    setFilters(reset);
    onFilterChange(reset);
  };



  const slotBtn = (active) => ({
    padding: "6px 3px",
    borderRadius: "8px",
    border: active ? "2px solid #0078ff" : "1px solid #ccc",
    background: active ? "#e8f3ff" : "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: 500,
  });


   const visibleCount = 4;
  const [showMorePopular, setShowMorePopular] = useState(false);

  const popularToRender = showMorePopular
    ? filters.popular
    : filters.popular.slice(0, visibleCount);

  const remainingCount = filters.popular.length - visibleCount;


  return (
    <div className="applied-filters-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Applied Filters</h5>
        <button className="btn btn-link" onClick={handleClearAll}>
          CLEAR ALL
        </button>
      </div>

      <div ref={chipContainerRef} className="d-flex gap-2 flex-wrap mb-3">
        {activeChips.map((chip) => (
          <span
            key={chip.section + chip.id}
            className="px-3 py-1 rounded-pill"
            style={{ background: "#e8f3ff", cursor: "pointer" }}
            onClick={() =>
              chip.section === "priceFilter"
                ? removePriceFilter()
                : handleFilterChange(chip.section, chip.id)
            }
          >
            {chip.label} ✕
          </span>
        ))}
      </div>

      {/* Popular Filters */}
    {/* <h6>Popular Filters</h6>

      {popularToRender.map((item) => (
        <div key={item.id} className="d-flex justify-content-between mb-2">
          <Form.Check
            type="checkbox"
            checked={item.checked}
            label={item.name}
            onChange={() => handleFilterChange("popular", item.id)}
          />
          <span>₹ {item.price.toLocaleString()}</span>
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className="text-primary fw-semibold mb-3"
          style={{ cursor: "pointer" }}
          onClick={() => setShowMorePopular(!showMorePopular)}
        >
          {showMorePopular ? "Show Less" : `+ ${remainingCount} more`}
        </div>
      )} */}

      {/* Price Slider */}
     <h6 className="mt-4 mb-2">One Way Price</h6>

<div style={{ position: "relative", width: "100%" }}>
  {showTooltip && (
    <div
      style={{
        position: "absolute",
        left: `calc(${((price - minPrice) / (maxPrice - minPrice)) * 100}% - 35px)`,
        top: "-40px",
        background: "#555",
        color: "white",
        padding: "4px 10px",
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: 600,
        zIndex: 10,
      }}
    >
      ₹ {price.toLocaleString()}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "6px solid #555",
          margin: "0 auto",
        }}
      />
    </div>
  )}

  <input
    type="range"
    min={minPrice}
    max={maxPrice}
    step={100}
    value={price}
    onChange={(e) => setPrice(Number(e.target.value))}
    onMouseDown={() => setShowTooltip(true)}
    onMouseUp={() => setShowTooltip(false)}
    className="form-range custom-range-slider"
  />
</div>

<div className="d-flex justify-content-between">
  <span>₹ {minPrice.toLocaleString()}</span>
  <span>₹ {maxPrice.toLocaleString()}</span>
</div>

 {/* STOPS */}
      <h6 className="mt-4 mb-2">Stops From {fromCity}</h6>
      {filters.stops.map((item) => (
        <div key={item.id} className="d-flex justify-content-between mb-2">
          <Form.Check
            type="checkbox"
            label={item.name}
            checked={item.checked}
            onChange={() => handleFilterChange("stops", item.id)}
          />
          <span>₹ {item.price.toLocaleString()}</span>
        </div>
      ))}

{/* DEPARTURE TIME */}
{/* DEPARTURE TIME */}
<h6 className="mt-4 mb-2">Departure From {fromCity}</h6>

<div
  className="d-flex flex-wrap"
  style={{
    gap: "10px",
    justifyContent: "space-between",
  }}
>
  {filters.departureSlots.map((slot) => (
    <div
      key={slot.id}
      onClick={() => handleFilterChange("departureSlots", slot.id)}
      style={{
        width: "70px",          // ⭐ VERY SMALL → Fits 4 in row
        height: "80px",
        padding: "10px",
        borderRadius: "12px",
        border: slot.checked ? "2px solid #0077ff" : "1px solid #d0d0d0",
        background: slot.checked ? "#eaf3ff" : "#fff",
        textAlign: "center",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 500,
      }}
    >
      <div style={{ marginBottom: "6px" }}>{slot.icon}</div>
      <div style={{ fontSize: "11px", lineHeight: "13px" }}>{slot.label}</div>
    </div>
  ))}
</div>

{/* ARRIVAL TIME */}
<h6 className="mt-4 mb-2">Arrival at {toCity}</h6>

<div
  className="d-flex flex-wrap"
  style={{
    gap: "10px",
    justifyContent: "space-between",
  }}
>
  {filters.arrivalSlots.map((slot) => (
    <div
      key={slot.id}
      onClick={() => 
        handleFilterChange("arrivalSlots", slot.id)}
      
      style={{
        width: "70px",          // ⭐ Same small width
        height: "80px",
        padding: "10px",
        borderRadius: "12px",
        border: slot.checked ? "2px solid #0077ff" : "1px solid #d0d0d0",
        background: slot.checked ? "#eaf3ff" : "#fff",
        textAlign: "center",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 500,
      }}
    >
      <div style={{ marginBottom: "6px" }}>{slot.icon}</div>
      <div style={{ fontSize: "11px", lineHeight: "13px" }}>{slot.label}</div>
    </div>
  ))}
</div>





      {/* Airlines */}
      <h6 className="mt-4 mb-2">Airlines</h6>
      {filters.airlines.map((item) => (
        <div key={item.id} className="d-flex justify-content-between mb-2">
          <div className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              checked={item.checked}
              onChange={() => handleFilterChange("airlines", item.id)}
            />
            <img
              src={item.icon}
              alt=""
              style={{ width: 22, height: 22, margin: "0 8px" }}
            />
            {item.name}
          </div>
          <span>₹ {item.price}</span>
        </div>
      ))}

      {/* Aircraft */}
      <h6 className="mt-4 mb-2">Aircraft Size</h6>
      {filters.aircraft.map((item) => (
        <div key={item.id} className="d-flex justify-content-between mb-2">
          <Form.Check
            type="checkbox"
            label={item.name}
            checked={item.checked}
            onChange={() => handleFilterChange("aircraft", item.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default AppliedFilters;
