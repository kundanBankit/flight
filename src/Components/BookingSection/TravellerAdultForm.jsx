import React, { useState, useEffect } from "react";
import { FaUser, FaPlaneDeparture, FaTrash } from "react-icons/fa";
import "../../styles/TravellerAdultForm.css"

const TravellerAdultForm = ({
  number,
  onRemove,
  canRemove,
  selectedCountry,
  setSelectedCountry,
  triggerValidation,
  setTravellerValid,
  getData,
  isActive,
  onToggle,
}) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    dob: "",
    passport: "",
    expiry: "",
    nationality: "",
    issueAt: "",
    country: selectedCountry,
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      getData(updated);
      return updated;
    });
  };

  const validate = () => {
    const err = {};

    if (!form.firstName.trim()) err.firstName = "First name is required.";
    else if (!/^[A-Za-z ]+$/.test(form.firstName))
      err.firstName = "Only alphabets allowed.";

    if (!form.lastName.trim()) err.lastName = "Last name is required.";
    else if (!/^[A-Za-z ]+$/.test(form.lastName))
      err.lastName = "Only alphabets allowed.";

    if (!form.gender) err.gender = "Please select gender.";

    if (!form.mobile.trim()) err.mobile = "Mobile number is required.";
    else if (!/^[6-9]\d{9}$/.test(form.mobile))
      err.mobile = "Enter valid 10-digit number.";

    if (!form.email.trim()) err.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Enter a valid email.";

    if (selectedCountry !== "India") {
      if (!form.dob.trim()) err.dob = "DOB is required.";
      if (!form.passport.trim()) err.passport = "Passport number required.";
      if (!form.expiry.trim()) err.expiry = "Expiry date required.";
      if (!form.nationality.trim()) err.nationality = "Nationality required.";
      if (!form.issueAt.trim()) err.issueAt = "Issue place required.";
    }

    setErrors(err);
    setTravellerValid(Object.keys(err).length === 0);
  };

  useEffect(() => {
    if (triggerValidation) validate();
  }, [triggerValidation]);

  return (
    <div
  className={`traveller-card  mb-4 ${isActive ? "active" : ""}`}
> <div className="traveller-header" onClick={onToggle}>
    {/* Avatar */}
    <div
      style={{
        width: "42px",
        height: "42px",
        background: "#4F6BFF",
        color: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        fontSize: "15px",
      }}
    >
      {(form.firstName ? form.firstName.charAt(0) : "A") +
        (form.lastName ? form.lastName.charAt(0) : number)}
    </div>

    {/* Traveller Name + Info */}
    <div style={{ flexGrow: 1 }}>
      <h5 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
        {form.firstName && form.lastName
          ? `${form.firstName} ${form.lastName}`
          : `Adult ${number}`}
      </h5>
      <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
        {form.gender && form.country
          ? `${form.gender} • ${form.country}`
          : "Click to add traveller details"}
      </p>
    </div>

    {/* DELETE BUTTON IN HEADER */}
    {canRemove && (
      <button
        onClick={(e) => {
          e.stopPropagation(); // stops collapse toggle when removing
          onRemove();
        }}
        style={{
          background: "#ffe5e5",
          border: "1px solid #ffb3b3",
          color: "#cc0000",
          borderRadius: "6px",
          padding: "4px 8px",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        🗑
      </button>
    )}

    {/* Arrow */}
    <span
      style={{
        fontSize: "18px",
        transition: "0.3s",
        transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      ▼
    </span>
  </div>


      {/* FORM */}
      {isActive && (
        <>
          <div className="row g-3 p-3">
            {/* FIRST NAME */}
            <div className="col-md-6">
              <label className="small fw-semibold">First Name</label>
              <input
                className="form-control"
                value={form.firstName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z ]*$/.test(value)) {
                    updateField("firstName", value);
                    if (value.trim() !== "") {
                      setErrors((prev) => ({ ...prev, firstName: "" }));
                    }
                  }
                }}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <small className="text-danger">{errors.firstName}</small>
              )}
            </div>

            {/* LAST NAME */}
            <div className="col-md-6">
              <label className="small fw-semibold">Last Name</label>
              <input
                className="form-control"
                value={form.lastName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z ]*$/.test(value)) {
                    updateField("lastName", value);
                    if (value.trim() !== "") {
                      setErrors((prev) => ({ ...prev, lastName: "" }));
                    }
                  }
                }}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <small className="text-danger">{errors.lastName}</small>
              )}
            </div>

            {/* GENDER */}
            <div className="col-md-6">
              <label className="small fw-semibold">Gender</label>
              <div className="d-flex mt-1">
                <button
                  className={`btn btn-sm w-50 ${
                    form.gender === "Male"
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => {
                    updateField("gender", "Male");
                    setErrors((prev) => ({ ...prev, gender: "" }));
                  }}
                >
                  MALE
                </button>

                <button
                  className={`btn btn-sm w-50 ms-2 ${
                    form.gender === "Female"
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => {
                    updateField("gender", "Female");
                    setErrors((prev) => ({ ...prev, gender: "" }));
                  }}
                >
                  FEMALE
                </button>
              </div>

              {errors.gender && (
                <small className="text-danger">{errors.gender}</small>
              )}
            </div>

            {/* COUNTRY */}
            <div className="col-md-6">
              <label className="small fw-semibold">Country</label>
              <select
                className="form-select"
                value={form.country}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  updateField("country", e.target.value);
                }}
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            {/* MOBILE */}
            <div className="col-md-6">
              <label className="small fw-semibold">Mobile Number</label>
              <input
                className="form-control"
                value={form.mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    updateField("mobile", value);
                    if (/^[6-9]\d{9}$/.test(value)) {
                      setErrors((prev) => ({ ...prev, mobile: "" }));
                    }
                  }
                }}
                placeholder="Enter mobile no."
                maxLength={10}
              />
              {errors.mobile && (
                <small className="text-danger">{errors.mobile}</small>
              )}
            </div>

            {/* EMAIL */}
            <div className="col-md-6">
              <label className="small fw-semibold">Email</label>
              <input
                className="form-control"
                value={form.email}
                onChange={(e) => {
                  const value = e.target.value;
                  updateField("email", value);
                  if (/^\S+@\S+\.\S+$/.test(value)) {
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }
                }}
                placeholder="Enter email"
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>

            {/* FREQUENT FLYER */}
            <div className="col-12 mt-2 d-flex align-items-center gap-2">
              <FaPlaneDeparture color="#2b5cce" />
              <h6 className="fw-bold small m-0">
                Frequent Flyer Number
                <span className="text-muted"> (Optional)</span>
              </h6>
            </div>

            <div className="col-md-6">
              <label className="small fw-semibold">
                Frequent Flyer Airline
              </label>
              <select className="form-select">
                <option>IndiGo</option>
                <option>Air India</option>
                <option>SpiceJet</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="small fw-semibold">Frequent Flyer Number</label>
              <input className="form-control" placeholder="e.g. 123456789" />
            </div>
          </div>

          {/* INTERNATIONAL */}
          {selectedCountry !== "India" && (
            <div
              className="p-3 mt-3"
              style={{
                borderRadius: "10px",
                background: "#f8fbff",
                border: "1px solid #d9e6f2",
              }}
            >
              <h6 className="fw-bold mb-3">Passport Details</h6>

              <div className="row g-3">
                {/* DOB */}
                <div className="col-md-6">
                  <label className="small fw-semibold">Date of Birth*</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.dob}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateField("dob", value);
                      if (value.trim() !== "") {
                        setErrors((prev) => ({ ...prev, dob: "" }));
                      }
                    }}
                  />
                  {errors.dob && (
                    <small className="text-danger">{errors.dob}</small>
                  )}
                </div>

                {/* PASSPORT */}
                <div className="col-md-6">
                  <label className="small fw-semibold">Passport Number*</label>
                  <input
                    className="form-control"
                    value={form.passport}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      if (/^[A-Z0-9]*$/.test(value)) {
                        updateField("passport", value);
                        if (value.trim() !== "") {
                          setErrors((prev) => ({ ...prev, passport: "" }));
                        }
                      }
                    }}
                    placeholder="Enter Passport Number"
                  />
                  {errors.passport && (
                    <small className="text-danger">{errors.passport}</small>
                  )}
                </div>

                {/* EXPIRY */}
                <div className="col-md-6">
                  <label className="small fw-semibold">Expiry Date*</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.expiry}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateField("expiry", value);
                      if (value.trim() !== "") {
                        setErrors((prev) => ({ ...prev, expiry: "" }));
                      }
                    }}
                  />
                  {errors.expiry && (
                    <small className="text-danger">{errors.expiry}</small>
                  )}
                </div>

                {/* NATIONALITY */}
                <div className="col-md-6">
                  <label className="small fw-semibold">Nationality*</label>
                  <input
                    className="form-control"
                    value={form.nationality}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateField("nationality", value);
                      if (value.trim() !== "") {
                        setErrors((prev) => ({ ...prev, nationality: "" }));
                      }
                    }}
                    placeholder="Enter Nationality"
                  />
                  {errors.nationality && (
                    <small className="text-danger">{errors.nationality}</small>
                  )}
                </div>

                {/* ISSUE AT */}
                <div className="col-md-6">
                  <label className="small fw-semibold">Issue At*</label>
                  <input
                    className="form-control"
                    value={form.issueAt}
                    onChange={(e) => updateField("issueAt", e.target.value)}
                    placeholder="Enter issue place"
                  />
                  {errors.issueAt && (
                    <small className="text-danger">{errors.issueAt}</small>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      
    </div>
  );
};

export default TravellerAdultForm;
