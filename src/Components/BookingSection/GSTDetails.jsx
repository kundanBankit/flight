import React, { useState } from "react";

const GSTDetails = () => {
  const [hasGST, setHasGST] = useState(false);

  // INPUT STATES
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  // ERROR STATES
  const [companyError, setCompanyError] = useState(false);
  const [gstError, setGstError] = useState(false);

  // VALIDATION FUNCTIONS
  const validateCompany = () => {
    if (companyName.trim().length < 2) {
      setCompanyError(true);
    } else {
      setCompanyError(false);
    }
  };

  const validateGST = () => {
    if (gstNumber.trim().length < 5) {
      setGstError(true);
    } else {
      setGstError(false);
    }
  };

  return (
    <div
      className="p-4 mt-4"
      style={{
        borderRadius: "10px",
        border: "1px solid #e2e6ef",
        background: "white",
        boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
      }}
    >
      {/* ===================== GST HEADER ===================== */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <input
          type="checkbox"
          checked={hasGST}
          onChange={() => setHasGST(!hasGST)}
          style={{ width: "18px", height: "18px" }}
        />

        <h6 className="fw-bold m-0">
          I have a GST number{" "}
          <span className="text-muted fw-normal">(Optional)</span>
        </h6>
      </div>

      {/* ===================== GST FIELDS (SHOW ONLY IF CHECKED) ===================== */}
      {hasGST && (
        <div className="row g-3 mt-2">
          {/* COMPANY NAME */}
          <div className="col-md-6">
            <label className="small fw-semibold">Company Name</label>
            <input
              className="form-control"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onBlur={validateCompany}
            />

            {companyError && (
              <div className="text-danger small mt-1">
                Please enter valid company name (Min 2 Char)
              </div>
            )}
          </div>

          {/* GST NUMBER */}
          <div className="col-md-6">
            <label className="small fw-semibold">Registration No</label>
            <input
              className="form-control"
              placeholder="Registration No"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
              onBlur={validateGST}
            />

            {gstError && (
              <div className="text-danger small mt-1">
                Please enter a valid GST Number (Min 5 Char)
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GSTDetails;
