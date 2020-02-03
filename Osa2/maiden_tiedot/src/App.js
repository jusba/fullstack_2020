import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from "./components/Filterform"
import ListCountries from "./components/ListCountries"

function App() {

  const [countries, setCountries] = useState(
    []
  )
  
  const [newSearch, setSearch] = useState("")

  useEffect(() => {

    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        
        setCountries(response.data)
      })
  }, [])
  
  const handleNewSearch = (event) => {
    
    setSearch(event.target.value)
  }
  const showOne = (country) =>{
    setSearch(country)    

  }
  
  


  
  return (
    <div>
      <FilterForm newSearch={newSearch} handleNewSearch={handleNewSearch} />  
      <ListCountries countries={countries} newSearch = {newSearch} setSearch = {showOne}/>
      
    </div>  
  );
}

export default App;
