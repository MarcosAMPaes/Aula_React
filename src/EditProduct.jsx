import { useNavigate, useParams } from 'react-router-dom'; 
import FormButtons from './FormButtons';
import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import api from './axiosApi';
import Loading from "./Loading";
import handleChange from './HandleChange';
 
const EditProduct = () => { 
    const [inputs, setInputs] = useState({}); 
    const [errors, setErrors] = useState({}); 
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(undefined); 
    const navigate = useNavigate(); 

    function localHandleChange(e) { 
        handleChange(e, inputs, setInputs); 
    }

    function handleSubmit(e) { 
        e.preventDefault();
        api.post("/alterar_produto", inputs)
        .then(() => {
            navigate("/products");
        })
        .catch(error => {
            console.error("Erro ao alterar o produto:", error);
            setErrors(error.response?.data);
        });
    }

    function loadProductById(id) {
        api.get(`obter_produto/${id}`)
        .then(response => {
            setInputs(response.data);
        })
        .catch(error => {
            console.error('Erro ao obter o produto:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }
 
    const idProduto = useParams().id; 
    if (!idProduto) { 
        navigate("/products"); 
    }
    
    useEffect(() => {
        setInputs({...inputs, id: idProduto});
        loadProductById(idProduto);
    }, [idProduto]);


    return ( 
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Alteração do Produto</h1>
                <form action="" onSubmit={handleSubmit} noValidate autoComplete='off'>
                    <ProductForm handleChange={localHandleChange} inputs={inputs} errors={errors} isNew={false}/>
                    <FormButtons cancelTarget="/products"/>
                </form>
                {loading && <Loading/>}
            </div>
        </> 
    ); 
} 
 
export default EditProduct;