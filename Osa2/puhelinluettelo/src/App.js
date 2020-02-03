import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from "./components/Filterform"
import NameForm from "./components/NameForm"
import ListNames from "./components/ListNames"
import services from "./services/Numbers"





const App = () => {


  
  const [persons, setPersons] = useState(
    []
  )

  useEffect(() => {
    
    services.getAll().then(responsepersons => {
      setPersons(responsepersons)
    })
  },[] )

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    
    if (persons.some(i => i.name === newName)) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the number with a new one?`)) {
        services.updatePerson(persons.filter(i => i.name === person.name)[0].id, person).then(response => {
            services.getAll().then(response => {
                setPersons(response)
            })
        })
    }
    }
    /*
    if (persons.some(i => i.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }*/
    
    else {
      
      services.create(person)
      services.getAll().then(responsepersons => {
        
        setPersons(responsepersons)
      })
      setNewName("")
      setNewNumber("")
    }
  }
  
  const handleNameAdd = (event) => {
    setNewName(event.target.value)
    { console.log(newName) }
  }
  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber)
  }

  const handleNewSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }
  const showPersons = (personsList) => {
    setPersons(personsList)  
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm newSearch={newSearch} handleNewSearch={handleNewSearch} />
      <h3>Add a new number</h3>
      <NameForm addPerson={addPerson} newName={newName} handleNameAdd={handleNameAdd} newNumber={newNumber} handleNumberAdd={handleNumberAdd} />
      <h3>Numbers</h3>
      <ListNames persons={persons} newSearch={newSearch} setPersons = {showPersons}/>
    </div>
  )
}
export default App