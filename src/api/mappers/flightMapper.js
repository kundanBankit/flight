// src/services/mappers/flightMapper.js

export function mapFlightSearchResponse(data) {
  if (!data?.FlightDetails) {
    return {
      ONWARD: [],
      RETURN: []
    };
  }

  const onwardRaw = data.FlightDetails.ONWARD || [];
  const returnRaw = data.FlightDetails.RETURN || [];

  return {
    ONWARD: onwardRaw.map(mapSingleFlight),
    RETURN: returnRaw.map(mapSingleFlight)
  };
}

/**
 * Maps each ONWARD / RETURN item
 * Handles missing segments, fares, nulls, safely.
 */
function mapSingleFlight(flightItem) {
  const segments = flightItem.flightSegments || [];

  // First + last segment for full journey
  const firstSeg = segments[0] || {};
  const lastSeg = segments[segments.length - 1] || {};

  return {
    // Complete segment list
    segments: segments.map(mapSegment),

    // For summary cards
    departure: firstSeg.departure || {},
    arrival: lastSeg.arrival || {},

    // Total stops = segments - 1 OR fallback from API
    stops: Math.max(0, segments.length - 1, flightItem.stops || 0),

    stopovers: getStopoversFromSegments(segments),

    // Lowest fare from list
    fares: (flightItem.fares || []).map(mapFare)
  };
}

/**
 * Maps a single segment safely
 */
function mapSegment(seg) {
  if (!seg) return {};

  return {
    flightId: seg.flightId || "",
    airlineCode: seg.airlineCode || "",
    airlineName: seg.airlineName || "",
    flightNumber: seg.flightNumber || "",
    equipmentTypeCode: seg.equipmentTypeCode || "",
    aircraftType: seg.aircraftType || "",
    duration: seg.duration || 0,
    stops: seg.stops || 0,
    stopovers: seg.stopovers || [],

    departure: seg.departure || {},
    arrival: seg.arrival || {}
  };
}

/**
 * Maps fare safely
 */
function mapFare(fare) {
  if (!fare) return {};

  const af = fare.adultFare || {};

  return {
    id: fare.id || "",
    fareIdentifier: fare.fareIdentifier || "",
    baseFare: fare.baseFare ?? af.baseFare ?? 0,
    tax: fare.tax ?? af.tax ?? 0,
    totalFare: fare.totalFare ?? af.totalFare ?? 0,
    baggage: fare.baggage || af.baggage || {}
  };
}

/**
 * Extract stopovers from segments
 * Example → CHANGE OF PLANES + layover calculation
 */
function getStopoversFromSegments(segments) {
  if (!Array.isArray(segments) || segments.length <= 1) return [];

  let result = [];

  for (let i = 0; i < segments.length - 1; i++) {
    const current = segments[i];
    const next = segments[i + 1];

    if (current?.arrival && next?.departure) {
      result.push({
        airport: current.arrival.city,
        code: current.arrival.code,
        name: current.arrival.name,
        layoverMinutes: calculateLayoverTime(
          current.arrival.datetime,
          next.departure.datetime
        )
      });
    }
  }

  return result;
}

/**
 * Calculates layover time safely
 */
function calculateLayoverTime(arrival, nextDeparture) {
  try {
    const a = new Date(arrival);
    const d = new Date(nextDeparture);
    return Math.max(0, Math.floor((d - a) / 60000)); // minutes
  } catch (e) {
    return e;
  }
}
