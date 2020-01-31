import React, { useState } from 'react'
const ListPerson = ({ person }) => {
    return (
        <>{person.name} {person.number}</>)
}

const ListNames = (props) => {
    return (
        props.persons.filter(person => person.name.toLowerCase().includes(props.newSearch.toLowerCase())).map(person =>

            <p key={person.name}>
                <ListPerson person={person} />
            </p>
        )
    )
}
export default ListNames