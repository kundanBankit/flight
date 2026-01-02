import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PassengerDetails() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/review-booking");
  };

  return (
    <Card className="shadow-lg border-0 rounded-4 p-4">
      <h4 className="mb-4 text-center text-primary fw-bold">Passenger Details</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Enter passenger name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" placeholder="Enter age" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>

        <div className="text-end">
          <Button variant="info" onClick={handleNext}>
            Continue to Review
          </Button>
        </div>
      </Form>
    </Card>
  );
}
