const apiConfig = {
  BASE_URL: "https://uat.bankit.in/BANKITMRA_FLIGHT/resources/AESAPI",

  ENDPOINTS: {
    CITY_LIST: "/flights/city-list",
    SEARCH_FLIGHTS: "/flights/search-all",
    REVIEW_FLIGHTS: "/flights/review",
  },

  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  }
};

export default apiConfig;
