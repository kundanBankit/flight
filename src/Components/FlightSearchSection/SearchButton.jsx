import React from "react";

export default function SearchButton({ handleSearch }) {
  return (
    <div
  className="text-center mt-4"
  style={{
    position: "absolute",
    zIndex: 10, //  correct camelCase
    justifySelf: "center", //  string value
    alignSelf: "center", //  string value
    paddingTop: "25px", //  string with units
  }}
>

      <button
        onClick={handleSearch}
        className="rounded-pill fw-bold text-white border-0 shadow"
        style={{
          background:
            "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)", // deep-blue gradient
          fontSize: "18px",
          padding: "12px 60px",
          letterSpacing: "1px",
          boxShadow: "0px 6px 12px rgba(37, 99, 235, 0.4)",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow =
            "0px 8px 14px rgba(37, 99, 235, 0.6)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow =
            "0px 6px 12px rgba(37, 99, 235, 0.4)")
        }
      >
        SEARCH
      </button>
    </div>
  );
}
