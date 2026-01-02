// reviewFlightMapper.js
// ======================
// Maps the Review API response into a clean UI-friendly format

export function mapReviewResponse(response) {
  if (!response || !response.data) {
    return {
      topFare: {},
      flights: [],
      searchInfo: {},
      bookingId: "",
      conditions: {},
    };
  }

  const data = response.data;
  console.log("💺 Mapping review response:", data);

  return {
    topFare: mapTopFare(data.topLevelTotalFare),
    flights: (data.flights || []).map(mapReviewedFlight),
    searchInfo: mapSearchInfo(data.searchInfo),
    bookingId: data.bookingId || "",
    conditions: mapConditions(data.conditions),
  };
}

/* ========================= TOP LEVEL FARE ========================= */
function mapTopFare(fare) {
  if (!fare) return {};

  return {
    totalTax: fare.TAF || 0,
    baseFare: fare.BF || 0,
    totalFare: fare.TF || 0,
    netFare: fare.NF || 0,
    taxBreakup: fare.taxBreakup || {},
  };
}

/* ========================= MAP FLIGHT ========================= */
function mapReviewedFlight(f) {
  if (!f) return {};

  return {
    segments: (f.segments || []).map(mapSegment),

    totalSegments: f.totalSegments || 0,
    isConnecting: f.isConnecting || false,

    fare: mapFareDetails(f.fareDetails),
  };
}

/* ========================= MAP SEGMENT ========================= */
function mapSegment(seg) {
  if (!seg) return {};

  return {
    segmentId: seg.segmentId || "",
    airlineCode: seg.airlineCode || "",
    airlineName: seg.airlineName || "",
    isLcc: seg.isLcc || false,
    flightNumber: seg.flightNumber || "",
    aircraft: seg.aircraft || "",
    stops: seg.stops || 0,
    duration: seg.durationMinutes || 0,
    connectionTime: seg.connectionTimeMinutes || 0,

    departure: {
      datetime: seg.departure || "",
      city: seg.fromCity || "",
      code: seg.from || "",
      terminal: seg.fromTerminal || "",
    },

    arrival: {
      datetime: seg.arrival || "",
      city: seg.toCity || "",
      code: seg.to || "",
      terminal: seg.toTerminal || "",
    },

    meals: seg.meals || [],
    baggageOptions: seg.baggageOptions || [],
  };
}

/* ========================= MAP FARE DETAILS ========================= */
function mapFareDetails(fd) {
  if (!fd) return {};

  const af = fd.adultFare || {};

  return {
    carrier: fd.carrier || {},
    fareIdentifier: fd.fareIdentifier || "",
    priceId: fd.priceId || "",
    messages: fd.messages || [],

    adultFare: {
      baseFare: af.baseFare || 0,
      totalTax: af.totalTax || 0,
      totalFare: af.totalFare || 0,
      netFare: af.netFare || 0,
      cabinClass: af.cabinClass || "",
      bookingClass: af.bookingClass || "",
      fareBasis: af.fareBasis || "",
      refundableType: af.refundableType || 0,

      baggage: {
        checked: af.includedBaggage?.includedChecked || "",
        cabin: af.includedBaggage?.includedCabin || "",
      },

      taxBreakup: af.taxBreakup || {},
    },
  };
}

/* ========================= SEARCH INFO ========================= */
function mapSearchInfo(s) {
  if (!s) return {};
  return {
    from: s.from || "",
    fromName: s.fromName || "",
    to: s.to || "",
    toName: s.toName || "",
    travelDate: s.travelDate || "",
    cabinClass: s.cabinClass || "",
    searchType: s.searchType || "",
    requestId: s.requestId || "",
    passengers: s.passengers || {},
    modifiers: s.searchModifiers || {},
  };
}

/* ========================= CONDITIONS ========================= */
function mapConditions(c) {
  if (!c) return {};

  return {
    isSeatApplicable: c.isSeatApplicable || false,
    isBlockApplicable: c.isBlockApplicable || false,
    sessionTimeSeconds: c.sessionTimeSeconds || 0,
    sessionCreatedTime: c.sessionCreatedTime || "",
    dobRequired: c.dobRequired || {},
    gstInfo: c.gstInfo || {},
    nameLimits: c.nameLengthLimits || {},
    documentConditions: c.documentConditions || {},
    addOns: c.addOns || {},
    insuranceApplicable: c.insuranceApplicable || false,
  };
}
