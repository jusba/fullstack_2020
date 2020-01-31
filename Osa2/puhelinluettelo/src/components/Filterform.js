import React, { useState } from 'react'
/* eslint-disable */

const addPerson = (event) => {
    event.preventDefault()
    console.log

}
const FilterForm = (props) => {
    return (
        <form onSubmit={console.log("toimii")}>
            <div>
                filter shown with: <input
                    value={props.newSearch}
                    onChange={props.handleNewSearch}
                />
            </div>
        </form>
    )
}

export default FilterForm