import React, { useState } from 'react';

const SearchBar = ({ onSearch, title = ''}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-container mt-2">
      <h5>{title}</h5>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={`Pesquisar por ${title}...`}
          aria-label={`Pesquisar por ${title}...`}
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="input-group-text" id="basic-addon2">
          <i className="bi bi-search"></i>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
