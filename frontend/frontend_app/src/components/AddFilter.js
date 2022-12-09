import React, { useState } from 'react';


export function AddFilter(props) {
    const [filter, setFilter] = useState({})

    const handleTextChange = (event) => {
        setFilter(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.addFilter(filter)
        setFilter({})
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="object"
                aria-label="Add Filter Here"
                placeholder="Add Filter Here"
                // value={filter}
                onChange={handleTextChange}
            />
            <input type="submit" value="Add" />
        </form>
    );
}
