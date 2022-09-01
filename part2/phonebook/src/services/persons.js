import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newPerson) => {
  const response = await axios.post(baseUrl, newPerson);
  return response.data;
};

const remove = async (personId) => {
  const response = await axios.delete(`${baseUrl}/${personId}`);
  return response.data;
};

const personServices = { getAll, create, remove };

export default personServices;
