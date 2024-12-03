import React, { useState, useEffect } from 'react';
import api from './axiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from './ProductForm';

const CategoryEdit = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({ nome: '', descricao: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Carregar dados da categoria ao editar
  useEffect(() => {
    api.get(`admin/obter_categoria/${id}`)
      .then(response => {
        setInputs(response.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('admin/atualizar_categoria', { ...inputs, id })
      .then(response => {
        navigate('/categories'); // Redirecionar para a lista de categorias
      })
      .catch(error => {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors); // Exibir erros de validação
        }
      });
  };

  return (
    <div className="container mt-4">
      <h3>Editar Categoria</h3>
      <form onSubmit={handleSubmit}>
        <ProductForm handleChange={handleChange} inputs={inputs} errors={errors} />
        <div className="mb-3">
          <button type="submit" className="btn btn-success">Salvar Alterações</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryEdit;
