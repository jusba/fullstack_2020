import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content:content, votes: 0 }
  console.log(object)
  const response = await axios.post(baseUrl, object)
  return response.data
}
const update = async newObject => {
  const anecdote = {
    content: newObject.content,
    votes: newObject.votes +1,
    id: newObject.id
  }
  const response = await axios.put(`http://localhost:3001/anecdotes/${newObject.id}`,anecdote)
  return(response.data)
}


export default { getAll, createNew, update }