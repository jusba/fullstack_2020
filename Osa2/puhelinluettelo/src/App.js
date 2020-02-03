import React, { useState, useEffect } from 'react'
import FilterForm from "./components/Filterform"
import NameForm from "./components/NameForm"
import ListNames from "./components/ListNames"
import services from "./services/Numbers"
import Notification from "./components/ErrorMessage"





const App = () => {

  /* Pieni ongelma jäi toimivuuteen, että välillä puhelinnumerolista ei päivity samantien kun siihen lisätään usein. Tuli liian kiire niin en ehtinyt löytää korjausta */

  const [persons, setPersons] = useState(
    []
  )

  useEffect(() => {

    services.getAll().then(responsepersons => {
      setPersons(responsepersons)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState("")
  const [newMessage, setMessage] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }


    if (persons.some(i => i.name === newName)) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the number with a new one?`)) {
        services.updatePerson(persons.find(i => i.name === person.name).id, person).then(response => {
          services.getAll().then(response => {
            setPersons(response)
            setNewNumber("")
            setNewName("")
            setMessage(`Modified ${person.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)

          })
        }).catch(error => {
          setMessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
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
      setMessage(`Added ${person.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setNewName("")
      setNewNumber("")
    }
  }

  const handleDelMessage = (name) =>{
    setMessage(`Deleted ${name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
      <Notification message={newMessage} />
      <FilterForm newSearch={newSearch} handleNewSearch={handleNewSearch} />
      <h3>Add a new number</h3>
      <NameForm addPerson={addPerson} newName={newName} handleNameAdd={handleNameAdd} newNumber={newNumber} handleNumberAdd={handleNumberAdd} />
      <h3>Numbers</h3>
      <ListNames persons={persons} newSearch={newSearch} setPersons={showPersons} deleteMessage = {handleDelMessage} />
    </div>
  )
}
export default App