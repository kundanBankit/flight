import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CardLayoutResults({ children }) {
  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{
        marginTop: "0px",
        marginBottom: "80px",
        width: "auto",
      }}
    >
      {/* ✅ Auto-sized card container */}
      {/* <div
        className=" shadow-lg rounded-4 p-1 border"
        style={{
          width: "auto",          // fixed width for consistent layout
          height: "auto",           // auto height
          minHeight: "280px",       // minimum base height
          transition: "all 0.3s ease", // smooth height expansion
          position: "relative",
          backgroundColor: "#E2EBF1",
        }}
      > */}
        {children}
      {/* </div> */}
    </div>
  );
}
