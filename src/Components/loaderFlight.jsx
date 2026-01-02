import React from "react";
// Import the new flight image (assuming it's saved as 'flight-icon.png' in your assets folder)
// import FlightIcon from './flight-icon.png';

// Use a placeholder URL for the image from your previous prompt for now:
import FlightIcon from "../assets/icons/flightImage.png";

// Define keyframes for the two animation stages: middle and exit.
const GlobalFlightStyles = () => (
  <style>
    {`
      @keyframes flyToMiddle {
        0% { transform: translateX(calc(-100% - 220px)) translateY(0) scale(1) rotate(0deg); }
        100% { transform: translateX(calc(50vw - 110px)) translateY(-100px) scale(1) rotate(0deg); }
      }

      @keyframes flyToTopAndOut {
        0% { transform: translateX(calc(50vw - 110px)) translateY(-100px) scale(1) rotate(0deg); opacity: 1; }
        100% { transform: translateX(calc(50vw - 110px)) translateY(calc(-100vh - 100px)) scale(0.8) rotate(0deg); opacity: 0; }
      }

      @keyframes flagWave {
        0% { background-position: 0% 0%; }
        50% { background-position: 100% 0%; }
        100% { background-position: 0% 0%; }
      }
    `}
  </style>
);

const FlightLoader = ({
  message,
  status, // 'loading', 'complete'
}) => {
  if (status === 'hidden') return null;

  const animationName = status === 'complete' ? 'flyToTopAndOut' : 'flyToMiddle';
  const animationDuration = status === 'complete' ? '1s' : '2s'; // Adjust durations as needed

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        left: 0,
        width: "100vw",
        height: "calc(100vh - 80px)", // Cover the rest of the screen
        zIndex: 3000,
        overflow: "hidden", // Prevent scroll bars during animation
        pointerEvents: status === 'complete' ? 'none' : 'auto', // Disable interaction during exit
      }}
    >
      <GlobalFlightStyles />

      {/* ✈️ Plane + Ribbon Container */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          // Use CSS variables for dynamic animation properties
          animation: `${animationName} ${animationDuration} linear forwards`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          // Initial position off-screen left
          transform: 'translateX(calc(-100% - 220px))', 
        }}
      >
        {/* 🇮🇳 Message Ribbon */}
        <div
          style={{
            marginRight: "10px",
            padding: "6px 25px",
            borderRadius: "8px 0 0 8px",
            color: "#ffffff",
            fontWeight: "900",
            background:
              "linear-gradient(to right, rgb(8, 233, 253) 13%, rgb(73, 176, 253) 81%)",
            backgroundSize: "200% 100%",
            animation: "flagWave 3s linear infinite",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
          }}
        >
          {message}
        </div>

        {/* ✈️ Plane Icon using your provided image */}
        <img
          src={FlightIcon}
          alt="Taking off airplane"
          style={{
            width: "auto",
            height: "90px",
            zIndex: 12,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
          }}
        />
      </div>
      {/* Note: Runway removed as the flight goes top, feel free to add a "sky" background instead */}
    </div>
  );
};

export default FlightLoader;
