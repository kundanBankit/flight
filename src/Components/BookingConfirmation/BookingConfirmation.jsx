import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BookingConfirmation() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Card className="shadow-lg border-0 rounded-4 p-4 text-center">
      <h4 className="text-success fw-bold mb-3">Booking Confirmed 🎉</h4>
      <p className="text-muted">
        Your flight has been successfully booked. A confirmation email has been
        sent to your registered email address.
      </p>

      <div className="border rounded-3 p-3 my-3">
        <h6 className="fw-semibold mb-1">Booking ID: WH20251113</h6>
        <small className="text-muted">Flight: IndiGo - 6E 123</small>
        <br />
        <small className="text-muted">Date: 25 Nov 2025 | Seat: 12A</small>
      </div>

      <Button variant="info" onClick={handleHome}>
        Back to Home
      </Button>
    </Card>
  );
}
