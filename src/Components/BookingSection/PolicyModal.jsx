import React, { useState, useMemo } from "react";
import airlineLogos from "../../utils/airlineLogos";
import { formatHoursOrDays } from "../../utils/formatters";

const PolicyModal = ({ show, onClose, airline, fareRule }) => {
  const [activeTab, setActiveTab] = useState("cancel");

  console.log("📝 PolicyModal fareRule data:", fareRule);

  // -----------------------------
  // EXTRACT ROUTE & RULE DATA SAFELY
  // -----------------------------
  const routeInfo = fareRule?.routes?.[0] || {};
  const routeName = routeInfo?.route || "Route";

  const noShowRules = useMemo(() => {
    return (
      routeInfo?.fareRules?.find((r) => r.ruleType === "NO_SHOW")?.policies ||
      []
    );
  }, [routeInfo]);

  const withNoShowFirst = (rules) => {
    if (noShowRules.length === 0) return rules;
    return [...noShowRules, ...rules];
  };

  const isNoShowPolicy = (p) =>
    noShowRules.some(
      (n) =>
        String(n.startHour) === String(p.startHour) &&
        String(n.endHour) === String(p.endHour)
    );

  const cancellationRules = useMemo(() => {
    return (
      routeInfo?.fareRules?.find((r) => r.ruleType === "CANCELLATION")
        ?.policies || []
    );
  }, [routeInfo]);

  const dateChangeRules = useMemo(() => {
    return (
      routeInfo?.fareRules?.find((r) => r.ruleType === "DATECHANGE")
        ?.policies || []
    );
  }, [routeInfo]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "820px",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          maxHeight: "90vh",
          boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
        }}
      >
        {/* HEADER */}
        <div
          className="d-flex justify-content-between align-items-center p-3"
          style={{ borderBottom: "1px solid #ddd" }}
        >
          <h4 className="fw-bold m-0">Fare rules</h4>
          <button
            className="btn btn-light"
            onClick={onClose}
            style={{ fontSize: "20px" }}
          >
            ✕
          </button>
        </div>

        {/* TABS */}
        <div className="d-flex border-bottom flex-wrap">
          <div
            className={`p-3 fw-semibold ${
              activeTab === "cancel"
                ? "text-primary border-primary border-bottom"
                : "text-muted"
            }`}
            style={{ cursor: "pointer", flex: 1, textAlign: "center" }}
            onClick={() => setActiveTab("cancel")}
          >
            Cancellation Charges
          </div>

          <div
            className={`p-3 fw-semibold ${
              activeTab === "date"
                ? "text-primary border-primary border-bottom"
                : "text-muted"
            }`}
            style={{ cursor: "pointer", flex: 1, textAlign: "center" }}
            onClick={() => setActiveTab("date")}
          >
            Date change charges
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: "20px", overflowY: "auto", maxHeight: "70vh" }}>
          {/* TOP ROW */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <img src={airlineLogos[airline]} width={40} alt="Airline" />
            <h6 className="fw-bold m-0">{routeName}</h6>
          </div>

          {/* ---------------------- */}
          {/* CANCEL TAB CONTENT */}
          {/* ---------------------- */}
          {activeTab === "cancel" && (
            <>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>
                      Time frame
                      <div
                        className="text-muted fst-italic"
                        style={{ fontSize: "12px" }}
                      >
                        (From Scheduled Flight departure)
                      </div>
                    </th>

                    <th>
                      Airline Fee + BANKIT Fee
                      <div
                        className="text-muted fst-italic"
                        style={{ fontSize: "12px" }}
                      >
                        (Per passenger)
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {withNoShowFirst(cancellationRules).map((p, index) => (
                    <tr key={index}>
                      <td>
                        {formatHoursOrDays(p.startHour)} to{" "}
                        {formatHoursOrDays(p.endHour)}*
                      </td>

                      <td>
                        {isNoShowPolicy(p) ? (
                          <>
                            ADULT : Non Refundable
                            <br />
                            <small className="text-muted">{p.policyText}</small>
                          </>
                        ) : (
                          <>
                            ADULT : ₹ {p.amount} + ₹ {p.additionalFee}
                            <br />
                            <small className="text-muted">{p.policyText}</small>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                className="p-3 mt-3"
                style={{
                  background: "#ffe3d5",
                  borderRadius: "6px",
                  border: "1px solid #f5b4b4",
                }}
              >
                <b>*Important:</b>The Airline fee is indicative. BANKIT does not
                guarantee the accuracy of this information. All fees mentioned
                are per passenger. All refunds are subject to Airline approval.
              </div>
            </>
          )}

          {/* ---------------------- */}
          {/* DATE CHANGE TAB */}
          {/* ---------------------- */}
          {activeTab === "date" && (
            <>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>
                      Time frame
                      <div
                        className="text-muted fst-italic"
                        style={{ fontSize: "12px" }}
                      >
                        (From Scheduled Flight departure)
                      </div>
                    </th>

                    <th>
                      Airline Fee + BANKIT Fee + Fare difference
                      <div
                        className="text-muted fst-italic"
                        style={{ fontSize: "12px" }}
                      >
                        (Per passenger)
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {withNoShowFirst(dateChangeRules).map((p, index) => (
                    <tr key={index}>
                      <td>
                        {formatHoursOrDays(p.startHour)} to{" "}
                        {formatHoursOrDays(p.endHour)}*
                      </td>

                      <td>
                        {isNoShowPolicy(p) ? (
                          <>
                            ADULT : Non Changeable
                            <br />
                            <small className="text-muted">{p.policyText}</small>
                          </>
                        ) : (
                          <>
                            ₹ {p.amount} + ₹ {p.additionalFee}
                            <br />
                            <small className="text-muted">{p.policyText}</small>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                className="p-3 mt-3"
                style={{
                  background: "#ffe3d5",
                  borderRadius: "6px",
                  border: "1px solid #f5b4b4",
                }}
              >
                <b>*Important:</b> The Airline fee is indicative. BANKIT does
                not guarantee the accuracy of this information. All fees
                mentioned are per passenger. Date change charges are applicable
                only on selecting the same Airline on a new date. The difference
                in fares between the old and the new booking will also be
                payable by the user. Please refer to the Date Change Charges
                section above for details on the number of allowed free date
                changes, if applicable
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
