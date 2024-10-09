import { useEffect, useState } from "react";
import NoItems from "./NoItems";
import TableProducts from "./TableProducts";
import api from './axiosApi';
import Loading from "./Loading";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)


    const productsEndpoint = "obter_produtos";

    const loadProducts = () => {
        setLoading(true)
        api.get(productsEndpoint)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log("Esse é o erro", error);
            })
            .finally(() => {
                setLoading(false)
            });
    }

    useEffect(() => {
        loadProducts();
    }, []);
    
    return (
        <>
            {products.length > 0 ?
                <TableProducts items={products} /> :
                (!loading && <NoItems state={orderState}/>)}
            {loading && <Loading />}
        </>
    );
}

export default Products;