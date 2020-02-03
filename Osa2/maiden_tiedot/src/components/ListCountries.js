import React, {useState} from 'react'


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