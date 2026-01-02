import React, { useState, useEffect } from "react";
import { BorderRight } from "react-bootstrap-icons";
import small_bag from "../../assets/Images/small_bag.png";
import big_bag from "../../assets/Images/big_bag.avif";

const BaggageModal = ({
  show,
  onClose,
  flight,
  onSelectBaggage,
  segments
}) => {

  console.log("🧳 BaggageModal flight data:", flight);

  const baggageOptions = segments?.[0]?.baggageOptions?.map((b) => ({
      kg: b.description,
      price: `₹ ${b.amount}`,
    })) || [];

  const includedBaggage = flight?.fares?.[0]?.baggage?.checkIn || "15 Kg";

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [errorIndex, setErrorIndex] = useState(null);

  const handleAdd = (index) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
      setErrorIndex(null);
    } else if (selectedIndex !== index) {
      setErrorIndex(index);
    }
  };

  const handleRemove = () => {
    setSelectedIndex(null);
    setErrorIndex(null);
  };

  useEffect(() => {
    if (errorIndex !== null) {
      const timer = setTimeout(() => {
        setErrorIndex(null);
      }, 5000); // ⏱️ 5 seconds

      return () => clearTimeout(timer);
    }
  }, [errorIndex]);

  if (!show) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h4 className="fw-bold m-0">Add Extra Baggage</h4>
          <button className="btn btn-light" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
          <div style={routeBox}>
            <h6 className="fw-bold m-0">
              {flight.departure?.code} - {flight.arrival?.code}
            </h6>
            <span className="text-primary small fw-semibold">
              Selection pending
            </span>
          </div>

          <p className="mb-4">
            Included Check-in baggage per person –{" "}
            <span className="text-primary fw-bold">{includedBaggage}</span>
          </p>

          {/* BAGGAGE LIST */}
          <div
            style={{
              maxHeight: "45vh", // adjust as needed
              overflowY: "auto",
              paddingRight: "6px",
            }}
          >
            {baggageOptions.map((item, i) => {
              const isSelected = selectedIndex === i;
              const getKg = (kg) => Number(String(kg).match(/\d+/)?.[0] || 0);

              return (
                <div
                  key={i}
                  className="py-3"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    {/* LEFT */}
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={getKg(item.kg) <= 5 ? small_bag : big_bag}
                        width={35}
                      />

                      <h6 className="m-0">{item.kg}</h6>
                    </div>

                    {/* RIGHT */}
                    <div
                      className="d-flex align-items-center gap-3"
                      style={{ position: "relative" }}
                    >
                      <b>{item.price}</b>

                      {isSelected ? (
                        <div style={qtyBox}>
                          <span style={qtyBtn} onClick={handleRemove}>
                            –
                          </span>
                          <span className="fw-bold">1</span>
                          <span style={plusBox} onClick={() => handleAdd(i)}>
                            +
                          </span>
                        </div>
                      ) : (
                        <div style={addBox} onClick={() => handleAdd(i)}>
                          <span className="me-3">Add</span>
                          <span style={plusBox}>+</span>
                        </div>
                      )}

                      {/* ❌ LEFT SIDE POPUP ERROR */}
                      {errorIndex === i && (
                        <div style={errorPopup}>
                          {/* Shadow / border arrow */}
                          <span style={errorArrowShadow} />
                          {/* White arrow */}
                          <span style={errorArrow} />
                          <span style={errorIcon}>!</span>
                          Sorry, you cannot select more than 1 BAGGAGE
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        {selectedIndex !== null && (
          <div className="d-flex justify-content-between align-items-center px-4 py-3 border-top">
            <span className="fw-semibold">1 of 1 Baggage(s) Selected</span>
            <div>
              <span className="fw-bold " style={{ fontSize: "18px" }}>
                Added to fare {baggageOptions[selectedIndex].price}{" "}
              </span>

              <button
  className="btn btn-primary px-4 rounded-5"
  onClick={() => {
    const selected = baggageOptions[selectedIndex];

    const kg = Number(
      String(selected.kg).match(/\d+/)?.[0] || 0
    );
    const price = Number(
      String(selected.price).replace(/[^\d]/g, "")
    );

    onSelectBaggage({ kg, price });
  }}
>
  DONE
</button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaggageModal;

/* ---------------- STYLES ---------------- */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "15px",
  top: "50px",
};

const modalStyle = {
  width: "65%",
  maxWidth: "900px",
  background: "white",
  borderRadius: "12px",
  overflow: "hidden",
  maxHeight: "90vh",
  boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
  display: "flex",
  flexDirection: "column",
};

const routeBox = {
  background: "#e6f2ff",
  borderLeft: "5px solid #1a73e8",
  borderRadius: "6px",
  padding: "12px",
  maxWidth: "320px",
  marginBottom: "12px",
};

const addBox = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "6px 14px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const plusBox = {
  background: "#eee",
  padding: "4px 8px",
  borderRadius: "4px",
  fontWeight: "bold",
};

const qtyBox = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "6px 14px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const qtyBtn = {
  fontWeight: "bold",
  cursor: "pointer",
};

/* 🔴 POPUP ERROR (LEFT SIDE) */
const errorPopup = {
  position: "absolute",
  right: "110%",
  top: "50%",
  transform: "translateY(-50%)",
  background: "#fff",
  // border: "1px solid #f44336",
  // color: "#d32f2f",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "13px",
  whiteSpace: "nowrap",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  zIndex: 10,
};

/* Outer arrow = shadow / border */
const errorArrowShadow = {
  position: "absolute",
  right: "-8px",
  top: "50%",
  transform: "translateY(-50%)",
  width: 0,
  height: 0,
  borderTop: "8px solid transparent",
  borderBottom: "8px solid transparent",
  borderLeft: "8px solid rgba(0,0,0,0.15)", // shadow color
};

/* Inner arrow = popup background */
const errorArrow = {
  position: "absolute",
  right: "-7px",
  top: "50%",
  transform: "translateY(-50%)",
  width: 0,
  height: 0,
  borderTop: "7px solid transparent",
  borderBottom: "7px solid transparent",
  borderLeft: "7px solid #ffffff",
};

const errorIcon = {
  background: "#f44336",
  color: "#fff",
  borderRadius: "50%",
  width: "16px",
  height: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "bold",
};
