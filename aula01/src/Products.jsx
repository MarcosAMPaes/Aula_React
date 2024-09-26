import { useEffect, useState } from "react";
import NoProducts from "./NoProducts";
import TableProducts from "./TableProducts";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const productsApi = "http://127.0.0.1:8000/admin/obter_produtos";

    const loadProducts = () => {
        axios.get(productsApi)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log("Esse é o erro", error);
            });
    }

    useEffect(() => {
        loadProducts();
    }, []);
    
    return (
        products.length > 0 ?
            <TableProducts items={products} /> :
            <NoProducts />
    );
}

export default Products;