import React, { useState } from 'react';
import api from './axiosApi';
import { useNavigate } from 'react-router-dom';

// Formulário específico para categorias
const CategoryForm = ({ handleChange, inputs, errors }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome da Categoria</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    className={`form-control ${errors?.nome ? 'is-invalid' : ''}`}
                    value={inputs.nome}
                    onChange={handleChange}
                />
                {errors?.nome && <div className="invalid-feedback">{errors.nome}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="descricao" className="form-label">Descrição</label>
                <textarea
                    id="descricao"
                    name="descricao"
                    className={`form-control ${errors?.descricao ? 'is-invalid' : ''}`}
                    value={inputs.descricao}
                    onChange={handleChange}
                />
                {errors?.descricao && <div className="invalid-feedback">{errors.descricao}</div>}
            </div>
        </>
    );
};

const CategoryCreate = () => {
    const [inputs, setInputs] = useState({ nome: '', descricao: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar se os campos estão preenchidos
        if (!inputs.nome || !inputs.descricao) {
            setErrors({
                nome: !inputs.nome ? 'O nome da categoria é obrigatório.' : '',
                descricao: !inputs.descricao ? 'A descrição é obrigatória.' : '',
            });
            return;
        }

        // Criar um FormData para enviar os dados como multipart/form-data
        const formData = new FormData();
        formData.append('nome', inputs.nome);
        formData.append('descricao', inputs.descricao);

        // Enviar dados para o backend
        api.post('admin/inserir_categoria', formData)
            .then(response => {
                console.log('Categoria criada com sucesso');
                navigate('/categories'); // Redireciona para a lista de categorias
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors); // Exibir erros de validação
                } else {
                    console.error('Erro desconhecido:', error); // Caso o erro seja diferente
                }
            });
    };

    return (
        <div className="container mt-4">
            <h3>Criar Nova Categoria</h3>
            <form onSubmit={handleSubmit}>
                <CategoryForm handleChange={handleChange} inputs={inputs} errors={errors} />
                <div className="mb-3">
                    <button type="submit" className="btn btn-success">Criar Categoria</button>
                </div>
            </form>
        </div>
    );
};

export default CategoryCreate;
