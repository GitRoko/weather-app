import React, { useEffect, useState } from 'react';
import './App.css';
import { getWeather, getCoord } from './api/api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

const GOOGLE_MAPS_API_KEY = 'AIzaSyA3r60x5APqgULIlYTx6MB3o3VW_3F7fsk';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

function App() {
  const [autoLocation, setAutoLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

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

  console.log('geolocationUser', autoLocation);

  useEffect(() => {
    if (coords) {
      getWeather(coords.results[0].geometry.location.lng, coords.results[0].geometry.location.lat)
        .then(data => setWeather(data));
    }
    
  }, [coords]);

  console.log('weather', weather);

  // Autocomplite with google places
  // const [value, setValue] = React.useState(null);
  // const [inputValue, setInputValue] = React.useState('');
  // const [options, setOptions] = React.useState([]);
  // const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    if (value) {
      getCoord(value.place_id, GOOGLE_MAPS_API_KEY)
        .then(data => setCoords(data));
    }
      
      return () => {
        active = false;
      };
    }, [value, inputValue, fetch]);
    
    console.log(coords);
  // `https://maps.googleapis.com/maps/api/geocode/json?place_id=${value.place_id}&key=${GOOGLE_MAPS_API_KEY}`

  return (
    <Autocomplete
      // id="google-map-demo"
      sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      // filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      // filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}

export default App;
