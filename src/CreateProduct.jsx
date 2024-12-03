import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { useState, useEffect } from 'react';
import api from './axiosApi';
import FormButtons from './FormButtons';
import handleChange from './handleChange';
import parseErrors from './parseErrors';
import Loading from './Loading';

const CreateProduct = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // Carregar categorias ao montar o componente
    useEffect(() => {
        api.get('/admin/obter_categorias')
            .then(response => {
                console.log(response.data);
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Erro ao carregar categorias:", error);
                console.log(response.data)
            });
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        // Validação: Verificar se a categoria foi selecionada
        if (!inputs.id_categoria) {
            setErrors(prev => ({
                ...prev,
                id_categoria: 'Por favor, selecione uma categoria.'
            }));
            setLoading(false);
            return;
        }
        const insertProductEndpoint = 'admin/inserir_produto';
        const formData = new FormData();

        // Adiciona todos os campos do formulário
        Object.entries(inputs).forEach(([key, value]) => {
            formData.append(key, value);
        });
        console.log(formData);

        // Adiciona a imagem, caso exista
        if (file) {
            formData.append('imagem', file);
        }

        try {
            console.log(formData);
            const response = await api.post(insertProductEndpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status === 201) {
                navigate('/products');
            } else {
                console.log(response);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const parsedErrors = parseErrors(error.response.data);
                setErrors(parsedErrors);
            } else {
                console.error('Erro inesperado:', error);
            }
        } finally {
            setLoading(false);
        }
    }

    function localHandleChange(event) {
        handleChange(event, inputs, setInputs);
    }

    function handleFileChange(event) {
        console.log("Arquivo selecionado:", event.target.files[0]);
        setFile(event.target.files[0]);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Inclusão de Produto</h1>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete="off" className="mb-3">
            <ProductForm
                handleChange={localHandleChange}
                inputs={inputs}
                errors={errors}
                handleFileChange={handleFileChange}
                categories={categories}
            />
                <FormButtons cancelTarget="/products" />
            </form>
            {loading && <Loading />}
        </>
    );
}

export default CreateProduct;
