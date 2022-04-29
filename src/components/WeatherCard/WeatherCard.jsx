import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import { MoreMenuAdd } from '../MoreMenuAdd/MoreMenuAdd';

export const WeatherCard = ({
  searchResult,
  weather,
  setPlaces,
  places,
 }) => {

  return (
    <Card sx={{ minWidth: 275 }}>
      {weather &&
        <>
          <CardHeader
            sx={{p:1, textAlign: 'left'}}
            action={
              (searchResult) 
                && <MoreMenuAdd
                searchResult={searchResult}
                setPlaces={setPlaces}
                places={places}
            />
              }
            subheader="Current location:"
          />
          <CardContent>
            <Typography
              variant="h4"
              sx={{ mb: 0 }}
              color="text.main"
              component="div"
            >
              {searchResult && weather ? searchResult.structured_formatting.main_text : weather.name}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ fontSize: 64 }}
            >
              {Math.round(weather.main.temp)}°
            </Typography>

            <Box>
              <img
                src={weather.weather[0].icon}
                alt={'weather'}
                style={{ width: 128, height: 128 }}
              />
            </Box>
          </CardContent>
        </>
      }
    </Card>
  );
};
