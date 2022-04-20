const BASE_URL = 'https://fcc-weather-api.glitch.me/';

export const getWeather = async (longitude, latitude) => {
  try {
    const response = await fetch(`${BASE_URL}api/current?lon=${longitude}&lat=${latitude}`);

    return await response.json();
  } catch (error) {
    return [];
  }
};
