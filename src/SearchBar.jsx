import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, title = '', categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Função para manipular a mudança no campo de pesquisa
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value, selectedCategory); // Passa o termo de busca e a categoria selecionada
  };

  // Função para manipular a seleção da categoria
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    onSearch(searchTerm, value); // Passa o termo de busca atual e a nova categoria
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

      {/* Dropdown de categorias */}
      {categories.length > 0 && (
        <div className="mb-3">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nome}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
