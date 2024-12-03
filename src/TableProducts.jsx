import PropTypes from 'prop-types';
import TableProductsLine from "./TableProductsLine";

const TableProducts = ({ items, handleDeleteProduct, categories }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.map((p) => (
                    <TableProductsLine
                        key={p.id} 
                        item={p}
                        handleDeleteProduct={handleDeleteProduct}
                        categories={categories}
                    />
                ))}
            </tbody>
        </table>
    );
}

TableProducts.propTypes = {
    items: PropTypes.array.isRequired,
    handleDeleteProduct: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired, // Passando categorias como prop
    updateProductCategory: PropTypes.func.isRequired // Passando a função para atualizar a categoria
};

export default TableProducts;