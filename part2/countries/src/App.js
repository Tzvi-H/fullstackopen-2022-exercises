import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import CountryFull from "./components/CountryFull";
import countriesService from "./services/countries";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [filter, setFilter] = useState("");

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().startsWith(filter.toLowerCase());
  });

  useEffect(() => {
    countriesService.getAll().then((countries) => setCountries(countries));
  }, []);

  return (
    <div>
      <Filter setFilter={setFilter} filter={filter} />
      {country ? (
        <CountryFull country={country} />
      ) : (
        <Countries countries={filteredCountries} setCountry={setCountry} />
      )}
    </div>
  );
};

export default App;
