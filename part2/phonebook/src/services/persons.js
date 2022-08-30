import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  return await axios.get(baseUrl);
};

const personServices = { getAll };

export default personServices;
