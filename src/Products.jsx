import { useEffect, useState } from "react";
import NoProducts from "./NoProducts";
import TableProducts from "./TableProducts";
import api from "./axiosApi";
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";
import SearchBar from './SearchBar';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProductId, setSelectedProductId] = useState(0);

    const loadProducts = () => {
        setLoading(true);
        const productsEndpoint = "obter_produtos";
        api.get(productsEndpoint)
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const excludeProduct = (ProductId) => {
        setLoading(true);
        api.post("excluir_produto", {"id_produto": ProductId})
            .then(response => {
                if (response.status === 204)
                    loadProducts()
            })
            .catch(error => {
                console.error('Erro ao excluir o produto:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleExcludeProduct = (ProductId) => {
        setSelectedProductId(ProductId);
        const modal = new bootstrap.Modal(document.getElementById('modalExcludeProduct'));
        modal.show();
    }

    const handleSearch = (searchTerm) => {
        const filtered = products.filter((product) =>
            product.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };


    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <SearchBar onSearch={handleSearch} title = "Produtos"/>
            {filteredProducts.length > 0 ?
            <>
                <ModalConfirm modalId="modalExcludeProduct" question="Deseja realmente excluir o Produto?" confirmAction={() => excludeProduct(selectedProductId)}
                    />
                <TableProducts items={filteredProducts} handleExcludeProduct={handleExcludeProduct}/>
            </>:
                (!loading && <NoProducts />)}
            {loading && <Loading />}
        </>
    );
}

export default Products;