import React, { useState, useEffect } from 'react';
import api from './axiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from './ProductForm';
import CategoryForm from './CategoryForm';

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

    const formData = new FormData();
    Object.entries(inputs).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Enviar os dados como FormData
    api.post('admin/alterar_categoria', formData)
    .then(response => {
      navigate('/categories');
    })
    .catch(error => {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Erro na requisição:", error);
      }
    });
  };

  return (
    <div className="container mt-4">
      <h3>Editar Categoria</h3>
        <CategoryForm handleSubmit={handleSubmit} handleChange={handleChange} inputs={inputs} errors={errors} />
    </div>
  );
};

export default CategoryEdit;
