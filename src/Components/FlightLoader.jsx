import React from "react";

const FlightLoader = ({
  message ,
  duration , // ⬅️ NEW: dynamic animation duration (seconds)
}) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        left: 0,
        width: "100vw",
        height: "220px",
        zIndex: 3000,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      {/* ✈️ Plane + Ribbon */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "-220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",

          // ⭐ DYNAMIC animation time instead of static 5s
          animation: `flyAndTilt ${duration}s linear forwards`,
          transformOrigin: "center bottom",
        }}
      >
        {/* 🇮🇳 Message Ribbon */}
        <div
          style={{
            position: "relative",
            marginRight: "10px",
            padding: "6px 25px",
            borderRadius: "8px 0 0 8px",
            overflow: "hidden",
            color: "#ffffff",
            fontWeight: "900",
            fontSize: "18px",
            letterSpacing: "0.5px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            background:
              "linear-gradient(to right, rgb(8, 233, 253) 13%, rgb(73, 176, 253) 81%)",
            backgroundSize: "200% 100%",
            animation: "flagWave 3s linear infinite",
            whiteSpace: "nowrap",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
          }}
        >
          {message}
        </div>

        {/* ✈️ Plane Icon */}
        <img
          src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/fliIcon.png"
          alt="Taking off airplane"
          style={{
            width: "auto",
            height: "90px",
            zIndex: 12,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
          }}
        />
      </div>

      {/* 🛣️ Runway */}
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: 0,
          width: "100%",
          height: "50px",
          background: "#333",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.4)",
        }}
      >
        {/* Outer Lines */}
        <div
          style={{
            position: "absolute",
            top: "2px",
            left: 0,
            width: "100%",
            height: "3px",
            background: "#777",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "2px",
            left: 0,
            width: "100%",
            height: "3px",
            background: "#777",
          }}
        ></div>

        {/* Center Dashed Line */}
        <div
          style={{
            position: "absolute",
            top: "25px",
            left: 0,
            width: "100%",
            height: "2px",
            background:
              "repeating-linear-gradient(to right, #fff 0 25px, transparent 25px 50px)",
            // animation: "runwayMove 0.5s linear infinite",
          }}
        ></div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes flagWave {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 0%; }
            100% { background-position: 0% 0%; }
          }

          @keyframes flyAndTilt {
            0% {
              transform: translateX(-220px) translateY(0px) scale(1) rotate(0deg);
            }
            20% {
              transform: translateX(500px) translateY(0px) scale(0.98) rotate(-3deg);
            }
            40% {
              transform: translateX(900px) translateY(-80px) scale(0.92) rotate(-6deg);
            }
            60% {
              transform: translateX(1300px) translateY(-160px) scale(0.86) rotate(-8deg);
            }
            80% {
              transform: translateX(1700px) translateY(-240px) scale(0.86) rotate(-8deg);
            }
            100% {
              transform: translateX(120vw) translateY(-300px) scale(0.8) rotate(0deg);
            }
          }

          @keyframes runwayMove {
            from { background-position: 0 0; }
            to { background-position: 50px 0; }
          }
        `}
      </style>
    </div>
  );
};

export default FlightLoader;
