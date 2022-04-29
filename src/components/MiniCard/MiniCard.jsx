import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { MoreMenuDelete } from '../MoreMenuDelete/MoreMenuDelete';
import { getWeather, getCoord } from '../../api/api';
import { Oval } from 'react-loader-spinner';


const GOOGLE_MAPS_API_KEY = 'AIzaSyA3r60x5APqgULIlYTx6MB3o3VW_3F7fsk';

export const MiniCard = ({
  miniCardPlace,
  miniCardPlaces,
  setPlaces,
}) => {
  const [placeCoords, setPlaceCoords] = useState(null);
  const [placeWeather, setPlaceWeather] = useState(null);

  useEffect(() => {
    if (miniCardPlace) {
      getCoord(miniCardPlace.place_id, GOOGLE_MAPS_API_KEY)
        .then(data => setPlaceCoords(data));
    }
  }, [miniCardPlace]);

  useEffect(() => {
    if (placeCoords) {
      getWeather(placeCoords.results[0].geometry.location.lng, placeCoords.results[0].geometry.location.lat)
        .then(data => {
          if (data.name === "Shuzenji") {
            setPlaceCoords(placeCoords);
          } else {
            setPlaceWeather(data);
          }
        })
      // .then(data => setPlaceWeather(data));
    }
  }, [placeCoords]);

  return (
    <Paper
      sx={{
        mx: 'auto',
        my: 1,
        width: '100%',
      }}
    >
      <Grid container wrap="nowrap" spacing={0}>
        {placeWeather ? (
          <>
          <Grid item alignSelf="center">
          <img
            src={placeWeather.weather[0].icon}
            alt={'weather'}
            style={{ width: 40, height: 32, }}
          />
          </Grid>
          <Grid item xs zeroMinWidth alignSelf="center">
            <Typography noWrap>
            {miniCardPlace && placeWeather ? miniCardPlace.structured_formatting.main_text : placeWeather.name}
            </Typography>
          </Grid>
          <Grid item alignSelf="center">
            <Typography>
              {placeWeather && Math.round(placeWeather.main.temp)}°
            </Typography>
          </Grid>
          <Grid item>
            <MoreMenuDelete
              setPlaces={setPlaces}
              miniCardPlaces={miniCardPlaces}
              miniCardPlace={miniCardPlace}
            />         
          </Grid>
          </>
          ) : (
          <Oval
            ariaLabel="loading-indicator"
            margin='0 auto'
            height={30}
            width={30}
            strokeWidth={5}
            strokeWidthSecondary={1}
            color="#000"
            secondaryColor="#fff"
          />
        )}

      </Grid>
    </Paper>
  );
}
