import client from "./client";
import apiConfig from "./apiConfig";
import { mapCityListResponse } from "./mappers/cityMapper";
import { mapFlightSearchResponse } from "./mappers/flightMapper";

const flightService = {
  // -------------------------
  //  CITY LIST API
  // -------------------------
  async getCityList() {
    const res = await client.get(apiConfig.ENDPOINTS.CITY_LIST);

    if (res.status !== "00") return [];

    return mapCityListResponse(res.data);
  },

  // -------------------------
  //  FLIGHT SEARCH API
  // -------------------------
  async searchFlights(payload) {
    const res = await client.post(apiConfig.ENDPOINTS.SEARCH_FLIGHTS, payload);

    return mapFlightSearchResponse(res.data);
  },

  // -------------------------
  //  FLIGHT REVIEW API
  // -------------------------

  async fetchReviewDetails(payload) {
    const res = await client.post(apiConfig.ENDPOINTS.REVIEW_FLIGHTS, payload);

    console.log("💺 FlightService API response:", res);

    return res;
  },

  async fetchFareRules(priceId) {
    const payload = {
      agentId: "AG2190",
      vendor: "TRIPJACK",
      id: priceId, // ⭐ PRICE ID DYNAMIC
      flowType: "SEARCH",
    };

    const res = await client.post("/flights/farerule", payload);

    return res?.data;
  },


  async fetchSeatMap(bookingId) {
  const payload = {
    agentId: "AG2190",       // static
    vendor: "TRIPJACK",      // static
    bookingId: bookingId     // dynamic from mapped data
  };

  const res = await client.post("/flights/seatmap", payload);

  console.log("Seat Map API Response:", res);
  return res;
}



};

export default flightService;
