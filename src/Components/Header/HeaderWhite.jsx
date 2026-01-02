import React from "react";
import { NavLink } from "react-router-dom";
import { Globe, ChevronDown } from "lucide-react";
import finoLogo from "/images/FindiBankit.png"; // replace with your own logo

export default function HeaderWhite() {
  return (
    <header
      style={{
        background: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
      }}
    >
      <nav
        className="navbar navbar-expand-lg"
        style={{
          padding: "0.6rem 2rem",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* 🅰️ Left: Logo */}
          <div className="d-flex align-items-center gap-4">
            <NavLink to="/" className="navbar-brand d-flex align-items-center">
              <img
                src={finoLogo}
                alt="Logo"
                style={{ height: "38px", width: "auto", objectFit: "contain" }}
              />
            </NavLink>

            {/* 🧭 Navigation Icons */}
            <ul
              className="d-flex align-items-center list-unstyled mb-0 gap-4"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              <li className="text-primary fw-semibold">
                <i className="bi bi-airplane-fill me-1"></i> Flights
              </li>
              <li className="text-dark">
                <i className="bi bi-building me-1"></i> Hotels
              </li>
              <li className="text-dark">
                <i className="bi bi-house-door me-1"></i> Homestays
              </li>
              <li className="text-dark">
                <i className="bi bi-umbrella me-1"></i> Holidays
              </li>
              <li className="text-dark">
                <i className="bi bi-train-front me-1"></i> Trains
              </li>
              <li className="text-dark">
                <i className="bi bi-bus-front me-1"></i> Buses
              </li>
              <li className="text-dark">
                <i className="bi bi-taxi-front me-1"></i> Cabs
              </li>
              <li className="text-dark">
                <i className="bi bi-passport me-1"></i> Visa
              </li>
              <li className="text-dark">
                <i className="bi bi-credit-card me-1"></i> Forex
              </li>
              <li className="text-dark">
                <i className="bi bi-shield-check me-1"></i> Insurance
              </li>
            </ul>
          </div>

          {/* 🧍‍♂️ Right Side */}
          <div className="d-flex align-items-center gap-4">
            {/* Login Button */}
            <button
              className="btn d-flex align-items-center gap-2 rounded-pill px-3 py-1"
              style={{
                background: "#e9f6ec",
                color: "#00754a",
                border: "1px solid #cde7d1",
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  background: "#00b386",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                m
              </div>
              Login or Create Account
            </button>

            {/* Country */}
            <div className="d-flex align-items-center gap-1 text-dark">
              <span style={{ fontSize: "0.85rem", color: "#555" }}>
                Country
              </span>
              <img
                src="https://flagcdn.com/w20/in.png"
                alt="India"
                className="mx-1"
              />
              <span style={{ fontWeight: "500" }}>India</span>
              <ChevronDown size={14} className="text-primary" />
            </div>

            {/* Currency */}
            <div className="d-flex align-items-center gap-1 text-dark">
              <span style={{ fontSize: "0.85rem", color: "#555" }}>
                Currency
              </span>
              <span style={{ fontWeight: "500" }}>INR</span>
              <ChevronDown size={14} className="text-primary" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
