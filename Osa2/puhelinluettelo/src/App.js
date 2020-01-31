import React, { useState } from 'react'
import FilterForm from "./components/Filterform"

const ListPerson = ({person}) => {
  return(
    <>{person.name} {person.number}</>)
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setSearch] = useState("")
  


  

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if(persons.some(i => i.name === newName )){
      window.alert(`${newName} is already added to phonebook`)  
    }
    else{
      setPersons(persons.concat(person))
      setNewName("")
      setNewNumber("")
    } 
    
  }
  const handleNameAdd = (event) => {
    setNewName(event.target.value)
    {console.log(newName)}
  }
  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber)
  }
  
  const handleNewSearch = (event) =>{
    console.log(event.target.value)
    
    setSearch(event.target.value)
    
  }


  return (
    
    <div>
      <h2>Phonebook</h2>
      <FilterForm newSearch = {newSearch} handleNewSearch = {handleNewSearch}/>
      <h3>Add a new number</h3>
      <NameForm addPerson = {AddPerson} newName = {newName} handleNameAdd = {handleNewName} newNumber = {newNumber} handleNumberAdd/>
      <h3>Numbers</h3>
      {persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person => 
        
        <p key = {person.name}>
        <ListPerson person = {person}/>   
       </p>
      )
      }

      
    </div>
  )

}

export default App