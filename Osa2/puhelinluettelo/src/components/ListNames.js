import React, { useState } from 'react'
import services from "../services/Numbers"

const Button = ({ text, person, set }) => {

    return (
        <button onClick={() => {
            if (window.confirm(`Delete ${person.name}?`)) {
                services.deletePerson(person.id).then(response => {
                    services.getAll().then(response => {
                        set(response)
                    })
                })
            }
        }
        }>
            {text}
        </button>
    )
}
const ListPerson = ({ person, setPersons }) => {
    return (
        <>{person.name} {person.number} <Button person={person} text={"delete"} set={setPersons} /></>

    )
}

const ListNames = (props) => {


    return (
        props.persons.filter(person => person.name.toLowerCase().includes(props.newSearch.toLowerCase())).map(person =>

            <p key={person.name}>
                <ListPerson person={person} setPersons={props.setPersons} />
            </p>
        )
    )
}
export default ListNames