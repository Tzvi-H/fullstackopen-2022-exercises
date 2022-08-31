const CountryBasic = ({ country, setCountry }) => {
  return (
    <p>
      {country.name.common}{" "}
      <button onClick={() => setCountry(country)}>show</button>
    </p>
  );
};

export default CountryBasic;
