import { useState } from "react";
import airlineLogos from "../../utils/airlineLogos";

export const SegmentTooltip = ({ seg }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        right: "22px",
        top: "22px",
        display: "flex",
        gap: "6px",
        zIndex: 5,
      }}
      // onClick={(e) => e.stopPropagation()}
      onClick={() => setOpen(!open)}
    >
      <button className="btn btn-light btn-sm shadow-sm">✈️</button>
      {seg?.meals?.length > 0 && (
        <button className="btn btn-light btn-sm shadow-sm">🥤</button>
      )}
      <button className="btn btn-light btn-sm shadow-sm">📺</button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "45px",
            right: 0,
            width: "260px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
            padding: "15px",
            zIndex: 999,
          }}
        >
          <div className="d-flex align-items-center gap-2 mb-2">
            <img src={airlineLogos[seg?.airlineCode]} width={35} />
            <div>
              <b>
                {seg?.from} - {seg?.to}
              </b>
              <div className="text-muted small">{seg?.aircraftType}</div>
            </div>
          </div>

          <b className="small">{seg?.fareIdentifier ?? "Fare"}</b>

          <div className="mt-2 small">
            <div className="d-flex gap-2 mb-2">✈️ 3-3 Layout</div>
            {seg?.meals?.length > 0 && (
              <div className="d-flex gap-2 mb-2">🥤 Beverage Available</div>
            )}
            <div className="d-flex gap-2">📺 Streaming Entertainment</div>
          </div>
        </div>
      )}
    </div>
  );
};
