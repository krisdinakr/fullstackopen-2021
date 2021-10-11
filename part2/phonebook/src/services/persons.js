/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = (newContactObj) => {
  const request = axios.post(baseUrl, newContactObj);
  return request.then(response => response.data);
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

const update = (id, newContactObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newContactObj);
  return request.then(response => response.data);
}

export default { getAll, create, remove, update }