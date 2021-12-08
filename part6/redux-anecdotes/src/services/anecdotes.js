import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const getId = () => (100000 * Math.random()).toFixed(0)

const create = async (content) => {
  const object = {
    content,
    votes: 0,
    id: getId()
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id) => {
  const targetObject = await axios.get(`${baseUrl}/${id}`);
  const newObject = {
    ...targetObject.data,
    votes: targetObject.data.votes + 1
  }
  const response = await axios.patch(`${baseUrl}/${id}`, newObject)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update };
