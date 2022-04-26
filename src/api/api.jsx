const BASE_URL = 'https://fcc-weather-api.glitch.me/';

export const getWeather = async (longitude, latitude) => {
  try {
    const response = await fetch(`${BASE_URL}api/current?lon=${longitude}&lat=${latitude}`);

    return await response.json();
  } catch (error) {
    return [];
  }
};

export const getCoord = async (id, API_KEY) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${id}&key=${API_KEY}`);
    
    // console.log(id, API_KEY);

    return await response.json();
  } catch (error) {
    return [];
  }
};
