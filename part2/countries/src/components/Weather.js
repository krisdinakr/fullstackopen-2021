import axios from 'axios';
import { useEffect, useState } from 'react';

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({
    request: {},
    location: {},
    current: {},
    forecast: {},
    temperature: {},
  });

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital,
      units: "m",
    };

    axios.get("http://api.weatherstack.com/current", params).then(response => setWeather(response.data))
  }, [country]);

  return (
    <div>
      <h3><b>Weather in {country.capital}</b></h3>
      <p><b>temperature: </b>{weather.current.temperature} Celcius</p>
      <img src={weather.current.weather_icons} alt="weather_icon" />
      <p><b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
};

export default Weather;
