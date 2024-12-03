import { useEffect, useState } from "react";
import NoProducts from "./NoProducts";
import TableProducts from "./TableProducts";
import api from "./axiosApi";
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";
import { NavLink } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(0);
    const [loading, setLoading] = useState(true);

    // Carregar produtos e categorias
    const loadProductsAndCategories = () => {
        setLoading(true);

        // Carregar produtos
        const productsEndpoint = "admin/obter_produtos";
        const categoriesEndpoint = "admin/obter_categorias"; // Endpoint para obter categorias

        Promise.all([
            api.get(productsEndpoint),
            api.get(categoriesEndpoint)
        ])
        .then(([productsResponse, categoriesResponse]) => {
            setProducts(productsResponse.data);
            setCategories(categoriesResponse.data); // Salvar categorias no estado
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    // Função para excluir produto
    const deleteProduct = (productId) => {
        setLoading(true);
        api.postForm("admin/excluir_produto", {"id_produto": productId})
            .then(response => {
                if (response.status === 204)
                    loadProductsAndCategories();
            })
            .catch(error => {
                console.error('Erro ao excluir produto:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Função para mudar categoria de um produto
    const updateProductCategory = (productId, newCategoryId) => {
        setLoading(true);
        api.postForm("admin/alterar_categoria_produto", {
            id_produto: productId,
            id_categoria: newCategoryId
        })
            .then(response => {
                if (response.status === 200) {
                    loadProductsAndCategories();
                }
            })
            .catch(error => {
                console.error('Erro ao alterar categoria do produto:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Exibir modal de exclusão
    const handleDeleteProduct = (productId) => {
        setSelectedProductId(productId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteProduct'));
        modal.show();
    }

    useEffect(() => {
        loadProductsAndCategories();
    }, []);

    return (
        <>
            <NavLink to="/products/create" className="btn btn-primary my-3">Novo Produto</NavLink>
            {products.length > 0 ? (
                <>
                    <ModalConfirm modalId="modalDeleteProduct" question="Deseja realmente excluir o produto?" confirmAction={() => deleteProduct(selectedProductId)} />
                    <TableProducts 
                        items={products} 
                        handleDeleteProduct={handleDeleteProduct} 
                        categories={categories} // Passando as categorias para a tabela
                        updateProductCategory={updateProductCategory} // Passando a função de atualizar categoria
                    />
                </>
            ) : (
                !loading && <NoProducts />
            )}
            {loading && <Loading />}
        </>
    );
}

export default Products;
