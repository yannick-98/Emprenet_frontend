import React, { useState } from 'react'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        setSearchResults([]);
        if (searchQuery.length > 0) {
            fetch(`http://localhost:8000/api/search/${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    setSearchResults(data);
                });
        }
    }

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    return (
        <div>
            <section>
                <input
                    type="text"
                    placeholder="Ingrese su búsqueda"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Buscar</button>
            </section>
        </div>
    )
}

export default Search
