import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { Card } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function BookingHistory() {
  const sampleData = [
    {
      name: "Apurva gupta",
      pnr: "WT2EP8",
      mobile: "996652368",
      bookingDate: "2025-10-10 19:55",
      travelDate: "2025-10-16 16:45",
      sector: "DEL -> BOM",
      status: "Success",
      amount: 36500,
      Passengers: [],
    },
    {
      name: "Kundan ohja",
      pnr: "A96WQN",
      mobile: "9854198884",
      bookingDate: "2025-09-23 17:12",
      travelDate: "2025-09-24 09:00",
      sector: "MAA -> BOM",
      status: "Pending",
      amount: 48068.35,
      Passengers: [],
    },
    {
      name: "sankalp sharma",
      pnr: "ASDGH9",
      mobile: "985419884",
      bookingDate: "2025-09-10 20:45",
      travelDate: "2025-09-12 06:00",
      sector: "IXS -> BOM",
      status: "Success",
      amount: 38068.35,
      Passengers: [],
    },
  ];

  const [records, setRecords] = useState(sampleData);
  const [search, setSearch] = useState("");
  const [dateFilterType, setDateFilterType] = useState("Booked Date");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("All");

const applyFilters = () => {
  let filtered = sampleData;

  if (search.trim()) {
    const s = search.trim().toLowerCase();

    filtered = filtered.filter((item) => {
      const name = item.name?.toLowerCase().trim() || "";
      const mobile = item.mobile?.toString().trim() || "";
      const pnr = item.pnr?.toLowerCase().trim() || "";

      return (
        name.includes(s) ||
        mobile.includes(s) ||
        pnr.includes(s)
      );
    });
  }

  if (status !== "All") {
    filtered = filtered.filter((item) => item.status === status);
  }

  const targetField =
    dateFilterType === "Booked Date" ? "bookingDate" : "travelDate";

  if (fromDate) {
    filtered = filtered.filter(
      (item) => new Date(item[targetField]) >= new Date(fromDate)
    );
  }

  if (toDate) {
    filtered = filtered.filter(
      (item) => new Date(item[targetField]) <= new Date(toDate)
    );
  }

  setRecords(filtered);
};


  useEffect(() => {
    applyFilters();
  }, []);

  const downloadExcel = () => {
    const excelData = records.map((row) => ({
      Name: row.name,
      PNR_Number: row.pnr,
      Mobile_Number: row.mobile,
      Booking_Date_Time: formatDateTime(row.bookingDate),
      Travel_Date_Time: formatDateTime(row.travelDate),
      Sector: row.sector,
      Status: row.status,
      Amount: row.amount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Booking_History");

    XLSX.writeFile(workbook, "Booking_History.xlsx");
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "P.M." : "A.M.";

    hours = hours % 12 || 12;

    return `${dd}/${mm}/${yyyy} ${hours}:${minutes} ${ampm}`;
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
        paddingTop: "20px",
      }}
    >
      <div className="container mt-5 pt-4">
        <h5 className="fw-bold mb-3" style={{ color: "white" }}>
          Booked History
        </h5>

        <Card className="shadow-lg border-0 rounded-4">
         <Card.Body className="text-center d-flex flex-column align-items-center">

            <div className="p-3  mb-3" style={{width:"100%" , marginLeft:"6%"}}>
              <div className="row g-3">
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name, Mobile No, PNR"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="col-md-2">
                  <select
                    className="form-select"
                    value={dateFilterType}
                    onChange={(e) => setDateFilterType(e.target.value)}
                  >
                    <option>Booked Date</option>
                    <option>Travel Date</option>
                  </select>
                </div>

                <div className="col-md-2">
                  <input
                    type="date"
                    className="form-control"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>

                <div className="col-md-2">
                  <input
                    type="date"
                    className="form-control"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>

                <div className="col-md-2">
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>All</option>
                    <option>Success</option>
                    <option>Pending</option>
                    <option>Failed</option>
                  </select>
                </div>
              </div>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <button className="btn btn-primary px-4" onClick={applyFilters}>
                  Submit
                </button>

                <button
                  className="btn btn-success px-4 d-flex align-items-center gap-2"
                  onClick={downloadExcel}
                >
                  <Download size={18} /> Download Excel
                </button>
              </div>
            </div>

            {/* TABLE */}
            <div className="table-responsive shadow-sm rounded-3">
              <table className="table table-bordered mb-0">
                <thead className="table-light text-center">
                  <tr>
                    <th>Name</th>
                    <th>PNR Number</th>
                    <th>Mobile Number</th>
                    <th>Booking Date & Time</th>
                    <th>Travel Date & Time</th>
                    <th>Sector</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {records.length > 0 ? (
                    records.map((row, i) => (
                      <tr key={i}>
                        <td>{row.name}</td>

                        {/* FIXED POPUP */}
                        <td style={{ position: "relative", zIndex: 999 }}>
                          <OverlayTrigger
                            trigger="hover"
                            placement="right"
                            overlay={
                              row.Passengers && row.Passengers.length > 0 ? (
                                <Popover
                                  style={{
                                    padding: 0,
                                    maxWidth: "650px",
                                    border: "1px solid #ccc",
                                  }}
                                >
                                  <div
                                    style={{
                                      padding: "10px",
                                      maxHeight: "300px",
                                      overflowY: "auto",
                                    }}
                                  >
                                    <table className="table table-bordered table-sm mb-0">
                                      <thead className="table-light">
                                        <tr>
                                          <th>S.no</th>
                                          <th>Name</th>
                                          <th>PNR</th>
                                          <th>Age</th>
                                          <th>Gender</th>
                                          <th>Food</th>
                                          <th>Booking Status</th>
                                          <th>Current Status</th>
                                        </tr>
                                      </thead>

                                      <tbody>
                                        {row.Passengers.map((p, idx) => (
                                          <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{p.Name}</td>
                                            <td>{row.pnr}</td>
                                            <td>{p.Age}</td>
                                            <td>{p.Gender}</td>
                                            <td>{p.FoodChoice}</td>
                                            <td>{p.BookingStatus}</td>
                                            <td className="fw-bold text-primary">
                                              {p.CurrentStatus}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </Popover>
                              ) : (
                                <Popover>
                                  <div style={{ padding: "10px" }}>
                                    No passenger data found
                                  </div>
                                </Popover>
                              )
                            }
                          >
                            <span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                            >
                              {row.pnr}
                            </span>
                          </OverlayTrigger>
                        </td>

                        <td>{row.mobile}</td>
                        <td>{formatDateTime(row.bookingDate)}</td>
                        <td>{formatDateTime(row.travelDate)}</td>
                        <td>{row.sector}</td>

                        <td
                          className={
                            row.status === "Success"
                              ? "text-success fw-bold"
                              : row.status === "Pending"
                              ? "text-warning fw-bold"
                              : "text-danger fw-bold"
                          }
                        >
                          {row.status}
                        </td>

                        <td>₹ {row.amount.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-3 text-muted">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
