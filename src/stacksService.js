import axios from "axios";

// URL for our node express running locally
//const BASE_URL = "http://localhost:3005";
const BASE_URL = "https://flashcards-katiewahlstrom.herokuapp.com";

const getStacks = () => {
  return axios.get(`${BASE_URL}/api/stacks`);
};

const getStack = (stackId) => {
  return axios.get(`${BASE_URL}/api/stacks/${stackId}`);
};

const createStack = (stack) => {
  return axios.post(`${BASE_URL}/api/stacks`, stack);
};

const updateStack = (stackId, stack) => {
  return axios.put(`${BASE_URL}/api/stacks/${stackId}`, stack);
};

const deleteStack = (stackId) => {
  return axios.delete(`${BASE_URL}/api/stacks/${stackId}`);
};

export { getStacks, createStack, updateStack, deleteStack, getStack };
