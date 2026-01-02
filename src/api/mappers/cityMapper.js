// src/services/mappers/cityMapper.js
export function mapCityListResponse(apiData) {
  if (!Array.isArray(apiData)) return [];

  return apiData.map(a => ({
    city: a.cityName,
    airport: a.airPortName,
    code: a.airPortCode
  }));
}
