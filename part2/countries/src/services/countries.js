import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all";

const getAll = async () => {
  const countries = await axios.get(baseUrl);
  return countries.data;
};

const countriesService = { getAll };

export default countriesService;
