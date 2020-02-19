import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log("settoken")
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async newObject => {
  console.log(newObject)
  const blog = 
    {
      user: newObject.id,
      likes: newObject.likes +1,
      author: newObject.author,
      title: newObject.title,
      url: newObject.url
    }
  
  const response = axios.put(`/api/blogs/${newObject.id}`,blog)
  return(response.data)
  
}

const create = async newObject => {
  console.log(newObject)
  console.log(token)
  const config = {
    headers: { Authorization: token }  
  }
  const response = await axios.post(baseUrl, newObject, config)
  return (response.data)

}

export default { getAll, create, update, setToken }