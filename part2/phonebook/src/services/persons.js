import axios from "axios";

// const baseUrl = "http://localhost:3001/api/persons";
// const baseUrl = "https://sheltered-retreat-70457.herokuapp.com/api/persons";

const baseUrl = "/api/persons";

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

const update = async (person) => {
  const response = await axios.put(`${baseUrl}/${person.id}`, person);
  return response.data;
};

const personServices = { getAll, create, remove, update };

export default personServices;
