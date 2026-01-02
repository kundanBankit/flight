import React, { useState } from "react";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

export default function AirlinesMarkup() {
  const [data, setData] = useState([
    { id: 1, flightType: "International", feeType: "Per %", markup: "6 %" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [flightType, setFlightType] = useState("");
  const [markupType, setMarkupType] = useState("");
  const [markupValue, setMarkupValue] = useState("");

  const [editItem, setEditItem] = useState(null);

  const handleOpenAdd = () => {
    setEditItem(null);
    setFlightType("");
    setMarkupType("");
    setMarkupValue("");
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setFlightType(item.flightType);
    setMarkupType(item.feeType);
    setMarkupValue(parseInt(item.markup));
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    setData((prev) => prev.filter((x) => x.id !== deleteId));
    setShowDeletePopup(false);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const handleSubmit = () => {
    let value = parseInt(markupValue);
    if (value > 10) value = 10;

    const newRecord = {
      id: editItem ? editItem.id : Date.now(),
      flightType,
      feeType: markupType,
      markup: value + " %",
    };

    if (editItem) {
      setData((prev) => prev.map((x) => (x.id === editItem.id ? newRecord : x)));
    } else {
      setData((prev) => [...prev, newRecord]);
    }

    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div
      style={{
        background: `
          linear-gradient(
            to bottom,
            #021021 0%,
            #021021 10%,
            #092444 20%,
            #0c2f4e 25%,
            #1a406a 32%,
            #14355b 40%,
            #E5EEF4 40%,
            #E5EEF4 100%
          )`,
        minHeight: "100vh",
        paddingTop: "110px",
      }}
    >
      <div className="container">
        <Card className="shadow-lg border-0" style={{ borderRadius: "15px", overflow: "hidden" }}>
          
          <div
            style={{
              background: "#f8f9fa",
              padding: "20px 25px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #d8d8d8",
            }}
          >
            <h4 style={{ fontWeight: "700", margin: 0 }}>Airlines Markup</h4>

            <div
              style={{
                background: "#1c75bc",
                padding: "10px 30px",
                borderRadius: "6px",
                color: "#fff",
                width: "200px",
                textAlign: "center",
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              Airline
            </div>

            <Button
              style={{
                fontWeight: "700",
                background: "#198754",
                padding: "8px 28px",
                borderRadius: "8px",
              }}
              onClick={handleOpenAdd}
            >
              Add
            </Button>
          </div>

          {showSuccess && (
            <div className="text-center mt-3" style={{ color: "green", fontWeight: "600" }}>
              Mark Up has been successfully deleted
            </div>
          )}

          <Card.Body style={{ padding: 0 }}>
            <Table bordered responsive className="text-center mb-0">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#3c8dbc", color: "white" }} rowSpan="2">
                    Type of Flight
                  </th>
                  <th style={{ backgroundColor: "#3c8dbc", color: "white" }} colSpan="2">
                    Service Fee
                  </th>
                  <th style={{ backgroundColor: "#3c8dbc", color: "white" }} rowSpan="2">
                    Action
                  </th>
                </tr>

                <tr>
                  <th style={{ backgroundColor: "#3c8dbc", color: "white" }}>Type</th>
                  <th style={{ backgroundColor: "#3c8dbc", color: "white" }}>Add Mark Up</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.flightType}</td>
                    <td>{item.feeType}</td>
                    <td>{item.markup}</td>

                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(item)}
                      >
                        <PencilSquare size={18} />
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash size={18} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Airlines Markup</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table bordered>
            <thead>
              <tr>
                <th style={{ background: "#3c8dbc", color: "white" }}>Type of Flight</th>
                <th style={{ background: "#3c8dbc", color: "white" }}>Mark Up Type</th>
                <th style={{ background: "#3c8dbc", color: "white" }}>Add Mark Up %</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <Form.Select value={flightType} onChange={(e) => setFlightType(e.target.value)}>
                    <option value="">Select</option>
                    <option>Domestic</option>
                    <option>International</option>
                  </Form.Select>
                </td>

                <td>
                  <Form.Select value={markupType} onChange={(e) => setMarkupType(e.target.value)}>
                    <option value="">Select</option>
                    <option>Per %</option>
                    <option>Flat</option>
                  </Form.Select>
                </td>

                <td>
                  <Form.Control
                    type="number"
                    value={markupValue}
                    onChange={(e) => setMarkupValue(e.target.value)}
                    placeholder="0"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button
            style={{ background: "#1c75bc", padding: "8px 30px", fontWeight: "700" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeletePopup} onHide={() => setShowDeletePopup(false)} centered>
        <Modal.Body className="text-center">
          <h5 className="mb-3">Alert</h5>
          <p>Are you sure you want to delete the mark up?</p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button variant="secondary" onClick={() => setShowDeletePopup(false)}>
              No
            </Button>

            <Button variant="danger" onClick={confirmDelete}>
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
