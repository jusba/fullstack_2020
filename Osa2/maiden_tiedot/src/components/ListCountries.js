import React, {useState} from 'react'
import axios from 'axios'

/*Esimerkissä mainittu api ei ilmeisesti toiminu tällä hetkellä joten kokeilin jotain, muuta mikä osoittautui xml pohjaseks. En kuitenkaan ehdi tutkia enempää kun aika loppuu :( */

const api_key = ""
const Button = ({ onClick, text, country}) => {
   
    console.log(onclick)
    return(
      <button onClick={() => onClick(country)}>
      {text}
      </button>
    )  
}

const ListCountry = ({ country, onClick}) => {
    
    
    return (
        <>
        <>{country.name} </><Button text = {"show"} onClick = {onClick} country = {country.name}/>
        </>
        )
}
const ListOneCountry = ({ country }) => {
    
    const request = axios.get(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${api_key}&q=${country.capital}&num_of_days=1`)
    
    request.then(response => console.log(response))
    
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
            <img src = {country.flag} alt = "flag" width="200" height="150"/>
            <h2>Weather</h2>
            
            
        </>
    )
}


const ListNames = (props) => {
    

    if (Object.keys(props.countries.filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase()))).length === 1) {
        
        return (
            props.countries.filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase())).map(country  =>
                
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
                <ListCountry country={country} onClick = {props.setSearch} />
            </p>
        )
    )
}
export default ListNames