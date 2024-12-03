import PropTypes from 'prop-types';
import TableProductsLine from "./TableProductsLine";

const TableProducts = ({ items, handleDeleteProduct, categories, updateProductCategory }) => {
    // Função para lidar com a alteração da categoria
    const handleCategoryChange = (productId, newCategoryId) => {
        updateProductCategory(productId, newCategoryId);
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Categoria</th> {/* Adicionando coluna para categoria */}
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.map(p => (
                    <TableProductsLine
                        item={p}
                        key={p.id}
                        handleDeleteProduct={handleDeleteProduct}
                        categories={categories} // Passando as categorias para cada linha
                        handleCategoryChange={handleCategoryChange} // Passando a função de alterar categoria
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
