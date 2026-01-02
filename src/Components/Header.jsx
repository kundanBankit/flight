import React from "react";
import { NavLink } from "react-router-dom";
import finoLogo from "/images/FindiBankit.png";

export default function Header() {
  return (
    <header
      style={{
        background: "transparent",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    >
      <nav
        className="navbar navbar-expand-lg"
        style={{
          background: "rgba(255, 255, 255, 0.1)", // light frosted glass
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "0.75rem 1.5rem",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={finoLogo}
              alt="Logo"
              style={{
                height: "45px",
                width: "auto",
                borderRadius: "8px",
                objectFit: "contain",
                color: "black",
              }}
            />
          </NavLink>

          <div className="d-flex gap-3 align-items-center text-white">
            <span>List Your Property</span>
            <span>My Trips</span>
            <button className="btn btn-primary rounded-pill px-3">
              Login / Create Account
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
