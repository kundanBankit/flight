import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, useLocation } from "react-router-dom";

export default function MainNavigation() {
  const steps = [
    { name: "Flight Search", path: "/flight-search" },
    { name: "Flight Results", path: "/flight-results" },
    { name: "Passenger Details", path: "/booking-details" },
    { name: "Review Booking", path: "/review-travellers" },
    { name: "Booking Confirmation", path: "/booking-confirmation" },
  ];
// /booking-details

  const location = useLocation();
  const activeStep =
    steps.findIndex((s) => location.pathname.startsWith(s.path)) + 1 || 1;


const isSearchPage = location.pathname === "/flight-search";

  return (
  <div
  className="d-flex flex-column align-items-center"
  style={{
    background: isSearchPage ? "transparent" : `
      linear-gradient(
        to bottom,
        #021021 0%,
        #021021 10%,
        #092444 20%,
        #0c2f4e 25%,
        #1a406a 32%,
        #14355b 40%,
        #E5EEF4 40%,
        #E5EEF4 100%
      )`,
    minHeight: "100vh",
    paddingTop: "80px"
  }}
>
      {/*  Step Navigation Bar */}
      <div
        className="bg-white shadow-lg rounded-4 py-3 px-3 px-md-5 border"
        style={{
          width: "100%",
          maxWidth: "950px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center flex-wrap position-relative w-100"
          style={{
            rowGap: "30px",
          }}
        >
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < activeStep;
            const isActive = stepNumber === activeStep;

            return (
              <div
                key={index}
                className="d-flex flex-column align-items-center position-relative flex-fill text-center"
                style={{
                  minWidth: "90px",
                  flex: "1 1 120px",
                }}
              >
                {/* Connector Line (visible on all devices now) */}
                {index < steps.length - 1 && (
                  <div
                    className="position-absolute  translate-middle-y"
                    style={{
                      width: "100%",
                      maxWidth: "140px",
                      height: "2px",
                      marginTop: "12%",
                      marginLeft: "100%",
                      borderBottom: `2px dashed ${
                        isCompleted ? "#0BABE4" : "#ccc"
                      }`,
                      zIndex: 1,
                    }}
                  ></div>
                )}

                {/* Step Circle */}
                <div
                  className="rounded-circle fw-bold d-flex justify-content-center align-items-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: isActive
                      ? "#0BABE4"
                      : isCompleted
                      ? "#0BABE4"
                      : "#f8f9fa",
                    color:
                      isActive || isCompleted ? "#fff" : "#6c757d",
                    border: `2px solid ${
                      isActive || isCompleted ? "#0BABE4" : "#ccc"
                    }`,
                    transition: "all 0.3s ease",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {stepNumber}
                </div>

                {/* Step Label */}
                <div
                  className="mt-2 text-center"
                  style={{
                    fontSize: "14px",
                    color:
                      isActive || isCompleted ? "#0BABE4" : "#6c757d",
                    fontWeight: isActive ? 700 : 400,
                    maxWidth: "120px",
                    lineHeight: "1.2",
                  }}
                >
                  {step.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/*  Page Content Closer to Stepper */}
      <div
        className="mt-3 mt-md-4"
        style={{
          width: "-webkit-fill-available",
          background: "transparent",
          position: "relative",
          zIndex: 1,
          marginTop: "-5px", // thoda closer
        }}
      >
        <Outlet />
      </div>

      {/*  Responsive Fixes */}
      <style>
        {`
          /* 📱 Small Devices */
          @media (max-width: 576px) {
            .bg-white.shadow-lg.rounded-4 {
              padding: 14px !important;
            }
            .rounded-circle {
              width: 34px !important;
              height: 34px !important;
              font-size: 13px !important;
            }
            .text-center div {
              font-size: 12px !important;
            }
            .d-flex.flex-column.align-items-center.position-relative.flex-fill {
              min-width: 80px !important;
            }
          }

          /* 💻 Tablet View */
          @media (min-width: 577px) and (max-width: 992px) {
            .rounded-circle {
              width: 36px !important;
              height: 36px !important;
              font-size: 14px !important;
            }
            .position-absolute.top-50.start-100.translate-middle-y {
              max-width: 100px !important;
            }
          }

          /* 🖥️ Desktop Hover Effect */
          @media (min-width: 993px) {
            .rounded-circle:hover {
              transform: scale(1.1);
              box-shadow: 0 0 10px rgba(11, 171, 228, 0.4);
            }
          }
        `}
      </style>
    </div>
  );
}
