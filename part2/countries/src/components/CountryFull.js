import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const CountryFull = ({ country }) => {
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=${api_key}&units=metric`
      )
      .then(({ data }) => {
        setTemperature(data.main.temp);
        setWind(data.wind.speed);
      });
  });

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <p>
        <strong>languages</strong>
      </p>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />

      <div>
        <h1>Weather in {country.name.common}</h1>
        {temperature && <p>temperature - {temperature} celsius</p>}
        {wind && <p>wind - {wind} m/s</p>}
      </div>
    </div>
  );
};

export default CountryFull;
