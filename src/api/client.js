import apiConfig from "./apiConfig";

const client = {
  async post(endpoint, body) {
    const url = apiConfig.BASE_URL + endpoint;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: apiConfig.DEFAULT_HEADERS,
        body: JSON.stringify(body),
      });

      const json = await response.json();
      return json;

    } catch (error) {
      console.error("API Error =>", error);
      throw error;
    }
  },

  async get(endpoint) {
    const url = apiConfig.BASE_URL + endpoint;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: apiConfig.DEFAULT_HEADERS,
      });

      return response.json();
    } catch (error) {
      console.error("API Error =>", error);
      throw error;
    }
  }
};

export default client;
