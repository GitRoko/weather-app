import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Grid } from '@mui/material';
import { getWeather, getCoord } from './api/api';
import SearchPlaces from './components/SearchPlaces/SearchPlaces'
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { MiniCard } from './components/MiniCard/MiniCard';

const GOOGLE_MAPS_API_KEY = 'AIzaSyA3r60x5APqgULIlYTx6MB3o3VW_3F7fsk';

function App() {
  const [autoLocation, setAutoLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [places, setPlaces] = useState([]);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }

        setAutoLocation(location);
      });
    }
  }, []);

  // console.log('autoLocation', autoLocation);

  useEffect(() => {
    if (autoLocation) {
      getWeather(autoLocation.longitude, autoLocation.latitude)
        .then(data => setWeather(data));
    }
  }, [autoLocation]);

  // console.log('getWeather autoLoc', weather);

  useEffect(() => {
    if (coords) {
      getWeather(coords.results[0].geometry.location.lng, coords.results[0].geometry.location.lat)
        .then(data => setWeather(data));
    }
  }, [coords]);

  // console.log('getWeather coords', weather);

  useEffect(() => {
    if (searchResult) {
      getCoord(searchResult.place_id, GOOGLE_MAPS_API_KEY)
        .then(data => setCoords(data));
    }
  }, [searchResult]);

  // console.log('searchResult', searchResult);

  return (
    <Container maxWidth="xs">
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item xs>
          <SearchPlaces
            GMAP_KEY_API={GOOGLE_MAPS_API_KEY}
            setSearchResult={setSearchResult}
            searchResult={searchResult}
            setCoords={setCoords}
          />
        </Grid>
        <Grid item xs>
          {(places.length > 0) && places.map((place, i) => (
            <MiniCard
              key={i + 100}
              miniCardPlace={place}
              setPlaces={setPlaces}
              miniCardPlaces={places}
            />
          ))}
        </Grid>
        <Grid item xs>
          <WeatherCard
            searchResult={searchResult}
            weather={weather}
            setPlaces={setPlaces}
            places={places}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
