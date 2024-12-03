import React from 'react';
import FormInput from './FormInput'; 

const CategoryForm = ({ handleSubmit, handleChange, inputs, errors }) => {
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 mb-3">
            <FormInput 
              type="text"
              field="nome"
              label="Nome"
              value={inputs?.nome || ''}
              onChange={handleChange}
              error={errors?.nome}
              autofocus={true}
            />
          </div>
          <div className="col-12 mb-3">
            <FormInput 
              type="text"
              field="descricao"
              label="Descrição"
              value={inputs?.descricao || ''}
              onChange={handleChange}
              error={errors?.descricao}
            />
          </div>
          <div className="col-12 mb-3">
            <button type="submit" className="btn btn-success">Salvar Alterações</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
