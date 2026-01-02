// Updated HeaderTransparent.jsx with My Trips dropdown
import React from "react";
import { ChevronDown } from "lucide-react";
import finoLogo from "/images/FindiBankit.png";
import bookingHistoryIcon from "../../assets/icons/Booking History.png";
import myTripIcon from "../../assets/icons/My Trip.png";
import flightIcon from "../../assets/icons/Flight.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function HeaderTransparent() {

  const navigate = useNavigate();   // ✅ YEH SABSE IMPORTANT LINE




  return (
    <>
      <style>{`
        .myTrips-trigger:hover + .myTrips-dropdown,
        .myTrips-dropdown:hover {
          display: block !important;
        }

        .myTrips-item:hover {
          background: #00baff !important;
          color: white !important;
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
    backgroundColor: "#021022",
              backdropFilter: "blur(4px)",
          transition: "all 0.3s ease",
        }}
      >
        <nav
          className="d-flex justify-content-between align-items-center px-4 py-2"
          style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 500 }}
        >
          {/* Left Section */}
          <div className="d-flex align-items-center gap-4">
            <img
              src={finoLogo}
              alt="Logo"
               onClick={() => navigate("/flight-search")}

              style={{
                height: "38px",
                width: "auto",
                backgroundColor: "#fff",
                borderRadius: "6px",
                padding: "2px",
              }}
            />

            <div className="d-flex align-items-center gap-4">
              {/* Booking History */}
           <div
  className="d-flex align-items-center gap-2"
  style={{ cursor: "pointer" }}
  onClick={() => navigate("/booking-history")}
>
  <img src={bookingHistoryIcon} height={30} alt="Booking History" />
  <div>
    <div className="fw-semibold text-white">Booking History</div>
    <div style={{ fontSize: "0.7rem", color: "#ccc" }}>
      View your past bookings
    </div>
  </div>
</div>



              <div className="vr bg-white opacity-25 mx-3"></div>

              {/* Flight Tracker */}
              <div
                className="position-relative"
                style={{ cursor: "pointer" }}
  onClick={() => navigate("/airlines-markup")}  // 👉 Yahan tum apna route set kar dena
              >
                <div className="d-flex align-items-center gap-2">
                  <img src={flightIcon} height={30} alt="Flight Tracker" />
                  <div>
                    <div className="fw-semibold text-white">Mark Up</div>
                    <div style={{ fontSize: "0.7rem", color: "#ccc" }}>
                      Check Flight Status
                    </div>
                  </div>
                </div>
              </div>

              <div className="vr bg-white opacity-25 mx-3"></div>

              {/* My Trips with Dropdown */}
              <div
                className="position-relative"
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center gap-2 myTrips-trigger">
                  <img src={myTripIcon} height={30} alt="My Trips" />
                  <div>
                    <div className="fw-semibold text-white">My Trips</div>
                    <div style={{ fontSize: "0.7rem", color: "#ccc" }}>
                      Manage your bookings
                    </div>
                  </div>
                </div>

                {/* Dropdown */}
                <div
                  className="myTrips-dropdown position-absolute p-2 shadow-lg"
                  style={{
                    left: "0",
                    width: "220px",
                    background: "#fff",
                    borderRadius: "12px",
                    display: "none",
                    zIndex: 99999,
                  }}
                >
                  <Link
                    to="/my-trips/upcoming"
                    className="py-2 px-3 myTrips-item mb-2 d-block text-decoration-none"
                    style={{
                      borderRadius: "7px",
                      background: "#fff",
                      color: "#666",
                      fontWeight: 600,
                    }}
                  >
                    Upcoming Bookings
                  </Link>

                  <Link
                    to="/my-trips/completed"
                    className="py-2 px-3 myTrips-item mb-2 d-block text-decoration-none"
                    style={{
                      borderRadius: "7px",
                      background: "#fff",
                      color: "#666",
                      fontWeight: 600,
                    }}
                  >
                    Completed Bookings
                  </Link>

                  <Link
                    to="/my-trips/cancelled"
                    className="py-2 px-3 myTrips-item d-block text-decoration-none"
                    style={{
                      borderRadius: "7px",
                      background: "#fff",
                      color: "#666",
                      fontWeight: 600,
                    }}
                  >
                    Cancelled Bookings
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3">
            {/* <button
              className="btn text-white rounded-pill px-3 py-1"
              style={{
                background: "linear-gradient(to right, #08e9fd, #49b0fd)",
                fontWeight: 600,
              }}
            >
              Login or Create Account
            </button> */}

            <div
              className="d-flex align-items-center gap-1 bg-dark rounded px-2 py-1"
              style={{ fontSize: "0.8rem", color: "#ddd" }}
            >
              <img
                src="https://flagcdn.com/w20/in.png"
                alt="India"
                className="me-1"
              />
              INR | English
              <ChevronDown size={14} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
