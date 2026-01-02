import React from "react";
import ImportantInformation from "./ImportantInformation";

const BookingLayout = ({ left, right }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: `
          linear-gradient(
            to bottom,
            #021021 0%,
            #021021 10%,
            #092444ff 20%,
            #0c2f4eff 25%,
            #1a406aff 32%,
            #14355bff 40%,
            #E5EEF4 40%,
            #E5EEF4 100%
          )
        `,
          padding: "40px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "95%",
            margin: "auto",
            gap: "25px",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT COLUMN */}
          <div
            style={{
              flex: 2,
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            {left}
          </div>

          {/* RIGHT COLUMN - OWN SCROLL */}
          <div 
          style={{
                flex: 1,
                maxHeight: "100vh",
                // overflowY: "scroll",
                padding: "10px",
                borderRadius: "10px",
              }}>
            <div
              style={{
                flex: 1,
                borderRadius: "10px",
                maxHeight: "95vh",
                background: "white",
                padding: "10px",
              }}
            >
              {right}
            </div>
            <div>
              <ImportantInformation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingLayout;
