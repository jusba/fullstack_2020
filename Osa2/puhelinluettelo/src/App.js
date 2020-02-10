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
    services.getAll().then(responsepersons => {
      console.log("settaa")
      setPersons(responsepersons)
    })
    
    console.log(persons)
    console.log(newName)

    if (persons.some(i => i.name === newName)) {
      
      if (window.confirm(`${person.name} is already added to phonebook, replace the number with a new one?`)) {
        
        services.updatePerson(persons.find(i => i.name === person.name).id, person).then(response => {
          
          services.getAll().then(response => {
            setPersons(response)
            setNewNumber("")
            setNewName("")
            handleMessage(`Modified ${person.name}`)
          })
        }).catch(error => {
          handleMessage(`Information of ${person.name} has already been removed from server`)
        })
      }


    }
    /*
    if (persons.some(i => i.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }*/
    else if (person.name.length<1 || person.number.length<1){
      handleMessage(`Name or number empty`)
    }
    else {
      handleMessage(`Added ${person.name}`)
      
      services.create(person).catch(error => {
        handleMessage(error.response.data.error)
      })
      services.getAll().then(responsepersons => {

        setPersons(responsepersons)
      })
      

      setNewName("")
      setNewNumber("")
    }
  }
  const handleMessage = (text) => {
    setMessage(text)
      setTimeout(() => {
        setMessage(null)
      }, 5000)  
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