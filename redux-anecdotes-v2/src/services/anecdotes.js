import axios from 'axios'
const baseUrl = '/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {

  // Helper stuff just for the json backend, in real life the backend would
  // create the id and votes
  const getId = () => (100000*Math.random()).toFixed(0)
  newObject = {
    content: newObject,
    id: getId(),
    votes: 0
  }

  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, create, update }
