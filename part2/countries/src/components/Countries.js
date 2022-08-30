import CountryBasic from "./CountryBasic";
import CountryFull from "./CountryFull";

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return countries.map((country) => (
      <CountryBasic key={country.name.official} country={country} />
    ));
  } else if (countries.length === 1) {
    return <CountryFull country={countries[0]} />;
  } else if (countries.length === 0) {
    return <p>no matches found</p>;
  }
};

export default Countries;
