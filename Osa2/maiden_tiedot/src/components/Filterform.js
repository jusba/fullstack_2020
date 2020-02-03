import React from 'react'
/* eslint-disable */


const FilterForm = (props) => {
    return (
        <form onSubmit={console.log("toimii")}>
            <div>
                find countries: <input
                    value={props.newSearch}
                    onChange={props.handleNewSearch}
                />
            </div>
        </form>
    )
}

export default FilterForm