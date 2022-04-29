import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import { getWeather, getCoord } from './api/api';
import SearchPlaces from './components/SearchPlaces/SearchPlaces'
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { MiniCard } from './components/MiniCard/MiniCard';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const GOOGLE_MAPS_API_KEY = 'AIzaSyA3r60x5APqgULIlYTx6MB3o3VW_3F7fsk';

function App() {
  const [autoLocation, setAutoLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesPlaces, setPagesPlaces] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        setAutoLocation(location);
      });
    }

    setPlaces(JSON.parse(localStorage.getItem('localPlaces')));
    
  }, []);

  useEffect(() => {
    if (autoLocation) {
      getWeather(autoLocation.lng, autoLocation.lat)
        .then(data => setWeather(data));
    }
  }, [autoLocation]);

  useEffect(() => {
    console.log('searchResult', searchResult)
    if (searchResult) {
      getCoord(searchResult.place_id, GOOGLE_MAPS_API_KEY)
        .then(data => {
          const loc = {
            lng: data.results[0].geometry.location.lng,
            lat: data.results[0].geometry.location.lat,
          }
          setCoords(loc);
        });
    }
  }, [searchResult]);
  
  useEffect(() => {

    if (coords) {
      getWeather(coords.lng, coords.lat)
        .then(data => {
          if (data.name === "Shuzenji") {
            setCoords(coords);
          } else {
            setWeather(data);
          }
        })
    }

  }, [coords]);

  useEffect(() => {
    if (places.length > 5) {
      let nesteddArr = [];
      let arr = [];
      places.forEach((item, i) => {
        if (nesteddArr.length <= 5) {
          nesteddArr = [...nesteddArr, item];
        }
        if (nesteddArr.length === 5 || i === places.length - 1) {
          arr = [...arr, nesteddArr];
          nesteddArr = [];
        }
      });

      setPagesPlaces(arr);
    }
  }, [places]);
  
  const handleChange = (event, value) => {
    setPage(value);
  };

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
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={0.5}
            
          >

            {(places.length > 0 && places.length <= 5)
              && places.map((place, i) => (
                <MiniCard
                  key={i + 100}
                  miniCardPlace={place}
                  setPlaces={setPlaces}
                  miniCardPlaces={places}
                />
              ))}

            {(pagesPlaces.length > 0) &&
              <>
                {pagesPlaces[page - 1].map((place, i) => (
                  <MiniCard
                    key={i + 100}
                    miniCardPlace={place}
                    setPlaces={setPlaces}
                    miniCardPlaces={places}
                  />
                ))}
                <Box sx={{ mx: 'auto' }}>

                <Pagination
                  count={pagesPlaces.length}
                  page={page}
                  onChange={handleChange}
                />
                </Box>
              </>}

          </Stack>
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
