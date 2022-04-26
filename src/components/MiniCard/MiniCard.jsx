import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { MoreMenuDelete } from '../MoreMenuDelete/MoreMenuDelete';
import { getWeather, getCoord } from '../../api/api';

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
        .then(data => setPlaceWeather(data));
    }
  }, [placeCoords]);

  return (
    <Paper
      sx={{
        mx: 'auto',
        maxWidth: 400,
        my: 1,
      }}
    >
      {placeWeather &&       
      <Grid container wrap="nowrap" spacing={0}>
        <Grid item alignSelf="center">
          {/* <Box spacing={0}> */}
            <img
              src={placeWeather.weather[0].icon}
              alt={'weather'}
              style={{ width: 40, height: 32, }}
            />
          {/* </Box> */}
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
      </Grid>}
    </Paper>
  );
}
