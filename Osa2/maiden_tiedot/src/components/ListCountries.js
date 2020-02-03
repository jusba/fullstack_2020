import React, { useState, useEffect } from 'react'
import axios from 'axios'

const GetFlag = ({ country }) => {

    
    

        axios
          .get(country.flag).then(response => {
            
            return(response)
          })
      
    
}
const ListCountry = ({ country }) => {
    return (
        <>{country.name}</>)
}
const ListOneCountry = ({ country }) => {
    console.log("top kek")
    console.log(country.languages)
    return (
        <>
            <h1>{country.name} </h1>
            <h3>capital {country.capital}</h3>
            <h3>population {country.population}</h3>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.name}>
                        {language.name}
                    </li>
                )}
            </ul>
            <>
            <GetFlag country = {country} />
            </>
        </>
    )
}

const ListNames = (props) => {
    console.log(props.countries, "tää")

    if (Object.keys(props.countries.filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase()))).length === 1) {
        return (
            props.countries.filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase())).map(country =>

                <div key={country.name}>
                    <ListOneCountry country={country} />
                </div>
            )
        )
    }
    if (Object.keys(props.countries.filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase()))).length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    }
    return (
        props.countries.filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase())).map(country =>
            <p key={country.name}>
                <ListCountry country={country} />
            </p>
        )
    )
}
export default ListNames