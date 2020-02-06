import axios from 'axios'
const baseUrl = '/api/persons'


const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const deletePerson = (id) => {
    console.log(`${baseUrl}${id}`)
    const request = axios.delete(`/api/persons/${id}`)
    
    return request.then(response => response.data)
}
const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)    
}
 



export default { create, getAll, deletePerson, updatePerson }