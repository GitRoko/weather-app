import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { MoreMenu } from '../MoreMenu/MoreMenu';



const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export const MiniCard = ({
  searchResult,
  weather,
}) => {

  return (
    <Paper
      sx={{
        mx: 'auto',
        maxWidth: 400,
      }}
    >
      {weather &&       
      <Grid container wrap="nowrap" spacing={0}>
        <Grid item alignSelf="center">
          {/* <Box spacing={0}> */}
            <img
              src={weather.weather[0].icon}
              alt={'weather'}
              style={{ width: 40, height: 32, }}
            />
          {/* </Box> */}
        </Grid>
        <Grid item xs zeroMinWidth alignSelf="center">
          <Typography noWrap>
          {searchResult && weather ? searchResult.structured_formatting.main_text : weather.name}
          </Typography>
        </Grid>
        <Grid item alignSelf="center">
          <Typography>
            {weather && Math.round(weather.main.temp)}°
          </Typography>
        </Grid>
        <Grid item>
          <MoreMenu />
        </Grid>
      </Grid>}
    </Paper>
  );
}
