import React from "react";

const ReviewTravellerModal = ({ show, onClose, travellers, onConfirm }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(2px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          borderRadius: "14px",
          padding: "30px",
          position: "relative",
          boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
          animation: "fadeIn 0.2s ease-out",
        }}
      >
        {/* Close Button */}
        <div
          style={{
            position: "absolute",
            top: "18px",
            right: "22px",
            cursor: "pointer",
            fontSize: "26px",
            color: "#555",
            fontWeight: "600",
          }}
          onClick={onClose}
        >
          ✕
        </div>

        {/* Heading */}
        <h3 className="fw-bold mb-2" style={{ color: "#1d3557" }}>
          Review Traveller Details
        </h3>

        <p className="text-muted" style={{ fontSize: "14px", lineHeight: "20px" }}>
          Please ensure these details exactly match your government ID / passport.
          Incorrect entries may lead to penalties or denied boarding.
        </p>

        <hr style={{ margin: "20px 0", opacity: 0.2 }} />

        {/* Traveller List */}
        {travellers.map((t, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #e0e6ed",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "15px",
              background: "#f8fafc",
            }}
          >
            <h6 className="fw-bold mb-3" style={{ color: "#264653" }}>
              ADULT {index + 1}
            </h6>

            <div className="mb-2 d-flex justify-content-between">
              <span className="text-muted">First Name</span>
              <b>{t.firstName || "-"}</b>
            </div>

            <div className="mb-2 d-flex justify-content-between">
              <span className="text-muted">Last Name</span>
              <b>{t.lastName || "-"}</b>
            </div>

            <div className="mb-2 d-flex justify-content-between">
              <span className="text-muted">Gender</span>
              <b>{t.gender || "-"}</b>
            </div>

            {t.nationality && (
              <>
                <hr style={{ margin: "12px 0", opacity: 0.1 }} />

                <div className="mb-2 d-flex justify-content-between">
                  <span className="text-muted">Nationality</span>
                  <b>{t.nationality}</b>
                </div>

                <div className="mb-2 d-flex justify-content-between">
                  <span className="text-muted">Passport No.</span>
                  <b>{t.passport}</b>
                </div>

                <div className="mb-2 d-flex justify-content-between">
                  <span className="text-muted">Date of Birth</span>
                  <b>{t.dob}</b>
                </div>

                <div className="mb-2 d-flex justify-content-between">
                  <span className="text-muted">Expiry Date</span>
                  <b>{t.expiry}</b>
                </div>

                <div className="mb-0 d-flex justify-content-between">
                  <span className="text-muted">Issued At</span>
                  <b>{t.issueAt}</b>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Bottom Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary px-4"
            style={{ borderRadius: "25px" }}
            onClick={onClose}
          >
            ← EDIT
          </button>

          <button
            className="btn btn-primary px-4"
            
            style={{
              borderRadius: "25px",
              background: "linear-gradient(90deg,#1d5cf5,#0b43c9)",
              border: "none",
            }}
           onClick={() => { 
   console.log("Modal Confirm Clicked");
   onConfirm();
}}>
            CONFIRM ✓
          </button>
        </div>
      </div>

      {/* Keyframes Animation */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}
      </style>
    </div>
  );
};

export default ReviewTravellerModal;
