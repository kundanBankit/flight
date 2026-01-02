import React, { useRef, useState, useEffect } from "react";

const MealsComponent = ({ meals }) => {
  console.log("mealscomponent :", meals);
 
  const [filter, setFilter] = useState("all");
  const [, setSelectedMeals] = useState([]);
 
  // FILTER HANDLER
  const filteredMeals = meals.filter(m => {
    if(filter === "all") return true;
    if(filter === "veg") return m.code?.includes("V");
    if(filter === "nonveg") return m.code?.includes("N");
  });
 
  return (
    <div style={{ height: "700px", overflowY: "auto", paddingRight: "10px" }}>
     
      <div className="d-flex gap-3 mb-3">
        <button onClick={()=>setFilter("veg")} className={`btn ${filter==="veg"?"btn-success":"btn-outline-success"}`}>Veg</button>
        <button onClick={()=>setFilter("nonveg")} className={`btn ${filter==="nonveg"?"btn-danger":"btn-outline-danger"}`}>Non Veg</button>
        <button onClick={()=>setFilter("all")} className={`btn ${filter==="all"?"btn-primary":"btn-outline-primary"}`}>All</button>
      </div>
 
      <div className="row g-3">
        {filteredMeals.map((m, i) => (
          <div className="col-md-6" key={i}>
            <div className="p-3 d-flex gap-3 align-items-center" style={{
              border: "1px solid #e2e2e2",
              borderRadius: "8px",
              background: "#fff",
            }}>
             
              {/* IMAGE FROM CODE (example mapping rule) */}
              <img
                src={`https://imgak.mmtcdn.com/flights/assets/media/dt/ancillaries/meals/${m.code.startsWith("V") ? "veg" : "non-veg"}/${m.code}_SG.webp`}
                width="100"
                height="100"
                style={{ borderRadius: "6px", objectFit: "cover" }}
              />
 
              <div className="d-flex flex-column w-100">
                <b style={{ fontSize: "15px" }}>{m.description}</b>
                <span style={{ fontWeight: 600 }}>₹ {m.amount}</span>
 
                <button
                  onClick={() => setSelectedMeals(prev => [...prev, m])}
                  className="btn"
                  style={{
                    background: "white",
                    border: "1px solid #1a73e8",
                    color: "#1a73e8",
                    borderRadius: "25px",
                    padding: "6px 22px",
                    fontWeight: "600",
                    alignSelf: "flex-end",
                  }}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
 
    </div>
  );
};
 
export default MealsComponent;
 
/* ======================================================
   SECTION
====================================================== */
const Section = ({ title, items, selectedMeals, setSelectedMeals }) => {
  if (items.length === 0) return null;

  return (
    <>
      <h6 className="fw-bold mt-4 mb-2">{title}</h6>
      <div className="row g-3">
        {items.map((m, i) => {
          const meal = selectedMeals[m.title];
          const qty = meal?.qty || 0;

          const add = () =>
            setSelectedMeals((p) => ({
              ...p,
              [m.title]: { price: m.price, qty: 1 },
            }));

          const inc = () =>
            setSelectedMeals((p) => ({
              ...p,
              [m.title]: { ...p[m.title], qty: p[m.title].qty + 1 },
            }));

          const dec = () =>
            setSelectedMeals((p) => {
              const q = p[m.title].qty - 1;
              if (q <= 0) {
                const copy = { ...p };
                delete copy[m.title];
                return copy;
              }
              return {
                ...p,
                [m.title]: { ...p[m.title], qty: q },
              };
            });

          return (
            <div className="col-md-6" key={i}>
              <div
                className="p-3 d-flex gap-3 align-items-center"
                style={{
                  border: "1px solid #e2e2e2",
                  borderRadius: 8,
                  background: "#fff",
                }}
              >
                <img
                  src={m.img}
                  width="90"
                  height="90"
                  style={{ borderRadius: 6, objectFit: "cover" }}
                />

                <div className="d-flex flex-column w-100">
                  <b>{m.title}</b>
                  <div className="fw-bold text-muted">₹ {m.price}</div>

                  {/* ADD / COUNTER */}
                  {qty === 0 ? (
                    <button style={addBtn} onClick={add}>
                      ADD
                    </button>
                  ) : (
                    <div style={counter}>
                      <button style={counterBtn} onClick={dec}>
                        −
                      </button>
                      <span>{qty}</span>
                      <button style={counterBtn} onClick={inc}>
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

/* ======================================================
   STYLES
====================================================== */
const addBtn = {
  alignSelf: "flex-end",
  border: "1px solid #1a73e8",
  background: "#fff",
  color: "#1a73e8",
  borderRadius: "20px",
  padding: "4px 20px",
  fontWeight: 600,
};

const counter = {
  alignSelf: "flex-end",
  display: "flex",
  alignItems: "center",
  gap: 12,
  border: "1px solid #1a73e8",
  borderRadius: "20px",
  padding: "4px 14px",
  color: "#1a73e8",
  fontWeight: 700,
};

const counterBtn = {
  border: "none",
  background: "transparent",
  padding: 0,
  margin: 0,
  fontSize: "18px",
  fontWeight: "700",
  color: "#1a1b1d",
  cursor: "pointer",
  outline: "none",
  boxShadow: "none",
};
