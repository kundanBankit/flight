import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ReviewBooking() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/booking-confirmation");
  };

  return (
    <Card className="shadow-lg border-0 rounded-4 p-4">
      <h4 className="mb-4 text-center text-primary fw-bold">Review Booking</h4>

      <div className="border rounded-3 p-3 mb-3">
        <h6 className="fw-semibold mb-1">Flight: IndiGo - 6E 123</h6>
        <small className="text-muted d-block">
          Delhi → Mumbai | 10:00 AM - 12:15 PM
        </small>
        <small className="text-muted">Date: 25 Nov 2025</small>
      </div>

      <div className="border rounded-3 p-3 mb-3">
        <h6 className="fw-semibold mb-1">Passenger: Rahul Sharma</h6>
        <small className="text-muted">Age: 29 | Gender: Male</small>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <span className="fw-bold fs-5">Total: ₹4,250</span>
        <Button variant="success" onClick={handleConfirm}>
          Confirm Booking
        </Button>
      </div>
    </Card>
  );
}
