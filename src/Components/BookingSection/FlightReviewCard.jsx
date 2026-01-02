import airlineLogos from "../../utils/airlineLogos";
import small_bag from "../../assets/Images/small_bag.png";
import big_bag from "../../assets/Images/big_bag.avif";
import {
  formatDuration,
  formatTime,
  formatDateShort,
} from "../../utils/formatters";
import { SegmentTooltip } from "./SegmentTooltip";


const FlightReviewCard = ({
  flightMapped,
  handleFareRule,
  loadingFare,
  extraBaggage,
  setShowBaggageModal,
  calculateTotalDuration,
  getFirstLastSegment,
  extractKg,
}) => {
  const segments = flightMapped.segments || [];
  if (!segments.length) return null;

  const { first, last } = getFirstLastSegment(segments);
  const totalDuration = calculateTotalDuration(segments);
  const stops = segments.length - 1;

  const baggage =
    flightMapped?.fareDetails?.adultFare?.includedBaggage || {};

  return (
    <div
      className="card mb-4"
      style={{
        borderRadius: "10px",
        border: "1px solid #e8e8e8",
        padding: "20px 0px",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* ================= TITLE ================= */}
      <div
        className="d-flex justify-content-between align-items-start px-4"
        style={{ borderLeft: "4px solid green" }}
      >
        <div>
          <h4 className="fw-bold m-0">
            {first?.fromCity} → {last?.toCity}
          </h4>

          <div className="d-flex align-items-center gap-2 mt-2">
            <span
              style={{
                background: "#ffe9c2",
                padding: "4px 10px",
                fontSize: "14px",
                borderRadius: "6px",
                fontWeight: 600,
              }}
            >
              {formatDateShort(first?.departure)}
            </span>

            <span className="text-muted">
              {stops === 0
                ? "Non Stop"
                : `${stops} Stop${stops > 1 ? "s" : ""}`}
              {" • "}
              {formatDuration(totalDuration)}
            </span>
          </div>
        </div>

        <div className="text-end">
          <span
            style={{
              background: "#26d05e",
              color: "#fff",
              padding: "4px 10px",
              fontSize: "12px",
              borderRadius: "6px",
              fontWeight: 600,
            }}
          >
            CANCELLATION FEES APPLY
          </span>

          <br />
          <span
            className="text-primary fw-semibold small"
            style={{ cursor: "pointer" }}
            onClick={handleFareRule}
          >
            {loadingFare ? "Loading..." : "View Fare Rules"}
          </span>
        </div>
      </div>

      {/* ================= SEGMENTS ================= */}
      {segments.map((seg, index) => (
        <div key={index} style={{ position: "relative" }}>
          <div
            className="m-3 p-3"
            style={{
              background: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #eee",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Airline row */}
            <div className="d-flex align-items-center gap-3 pb-2 mt-2">
              <img src={airlineLogos[seg.airlineCode]} width={40} alt="" />
              <b>{seg.airlineName}</b>
              <span className="text-muted">
                {seg.airlineCode} {seg.flightNumber}
              </span>
              <span
                style={{
                  background: "#eef2f3",
                  padding: "2px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                }}
              >
                {seg.aircraftType}
              </span>
            </div>

            {/* Time & city row */}
            <div className="d-flex mt-3">
              <div className="mx-2 d-flex flex-column justify-content-between">
                <div className="fw-bold fs-5">
                  {formatTime(seg.departure)}
                </div>
                <div className="fw-bold fs-5">
                  {formatTime(seg.arrival)}
                </div>
              </div>

              <div
                className="m-2 py-1"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ border: "2px solid #999", borderRadius: "50%", padding: "4px" }} />
                <div style={{ height: "7vh", borderLeft: "2px dotted #999" }} />
                <div style={{ border: "2px solid #999", borderRadius: "50%", padding: "4px" }} />
              </div>

              <div className="mx-2 d-flex flex-column justify-content-between">
                <div>
                  <div className="fw-semibold">{seg.fromCity}</div>
                  <div className="text-muted small">{seg.fromAirport} {seg?.fromTerminal != "" ? ", " : " "} {seg?.fromTerminal}</div>
                </div>

                <div className="text-muted small">
                  {formatDuration(seg.durationMinutes)}
                </div>

                <div>
                  <div className="fw-semibold">{seg?.toCity}</div>
                  <div className="text-muted small">{seg?.toAirport} {seg?.toTerminal != "" ? ", " : " "} {seg?.toTerminal}</div>
                </div>
              </div>
            </div>

            {/* BAGGAGE */}
            <div className="d-flex gap-4 mt-3 p-2" style={{ borderTop: "1px solid #ddd" }}>
              <div>
                <img src={small_bag} height={30} /> <b>Cabin:</b>{" "}
                {extractKg(baggage.includedCabin)} Kg / Adult
              </div>
              <div>
                <img src={big_bag} height={30} /> <b>Check-In:</b>{" "}
                {extractKg(baggage.includedChecked)} Kg / Adult
              </div>
            </div>

            <SegmentTooltip seg={seg} />
          </div>

          {/* LAYOVER */}
          {seg.connectionTimeMinutes > 0 && (
            <div style={{ display: "flex", gap: "18px", margin: "20px 28px" }}>
              <div
                style={{
                  borderLeft: "2px dotted #999",
                  height: "45px",
                  marginLeft: "80px",
                }}
              />
              <div>
                <div style={{ color: "#c97a00", fontWeight: 700, fontSize: "15px" }}>
                  Change of planes
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600 }}>
                  {formatDuration(seg.connectionTimeMinutes)}{" "}
                  <span style={{ fontWeight: 400 }}>
                    Layover in {seg.toCity}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* ADD BAGGAGE */}
      <div
        className="d-flex justify-content-between align-items-center p-3 m-3"
        style={{
          background: "#ebf7ff",
          borderRadius: "6px",
          border: "1px solid #b6dcff",
        }}
      >
        <img
          src={extraBaggage?.kg > 5 ? big_bag : small_bag}
          style={{ height: 40 }}
          alt=""
        />

        <span className="small">
          {extraBaggage ? (
            <>
              <b>{extraBaggage.kg} KGs</b> extra baggage added for{" "}
              <b>₹{extraBaggage.price}</b>. Total check-in is now{" "}
              <b>
                {extractKg(baggage.includedChecked) + extraBaggage.kg} KGs
              </b>.
            </>
          ) : (
            <>Got excess baggage? Buy extra check-in baggage at fab rates!</>
          )}
        </span>

        <span
          className="text-primary fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => setShowBaggageModal(true)}
        >
          {extraBaggage ? "CHANGE BAGGAGE" : "ADD BAGGAGE"}
        </span>
      </div>
    </div>
  );
};

export default FlightReviewCard;
