import React, { useEffect, useState } from 'react';
import './App.css';
import { getWeather } from './api/api';

function App() {
  const [geolocationUser, setGeolocationUser] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
  
        setGeolocationUser(location);
      });
    }
  }, []);

  // console.log('geolocationUser', geolocationUser);

  useEffect(() => {
     if (geolocationUser) {
      getWeather(geolocationUser.longitude, geolocationUser.latitude)
        .then(data => setWeather(data));
    }
  }, [geolocationUser]);

  console.log('weather', weather);

  return (
    <div className="App">
      <h1>Weather app</h1>
      <p>Main branch</p>
    </div>
  );
}

export default App;
