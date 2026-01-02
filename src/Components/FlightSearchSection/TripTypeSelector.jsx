export default function TripTypeSelector({ tripType, setTripType }) {
  const options = [
    { key: "oneway", label: "One Way" },
    { key: "round", label: "Round Trip" },
    // { key: "multi", label: "Multi City" },
  ];

  return (
    <div className="d-flex justify-content-start gap-4 mt-5 mb-4 flex-wrap">
      {options.map((opt) => (
        <label key={opt.key} className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="tripType"
            value={opt.key}
            checked={tripType === opt.key}
            onChange={() => setTripType(opt.key)}
          />
          <span className="fw-semibold">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
