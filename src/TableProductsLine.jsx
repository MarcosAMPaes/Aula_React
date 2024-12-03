import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NumberFormatter, CurrencyFormatter } from './formatters';

const TableProductsLine = ({ item, handleDeleteProduct, categories, handleCategoryChange }) => {
    return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{item.nome}</td>
            <td>{CurrencyFormatter.format(item.preco)}</td>
            <td>{NumberFormatter.format(item.estoque, 6)}</td>
            <td>
                {/* Select de categoria */}
                <select
                    value={item.id_categoria} // Valor inicial é a categoria atual
                    onChange={(e) => handleCategoryChange(item.id, e.target.value)} // Atualiza a categoria
                    className="form-select form-select-sm"
                    aria-label="Selecione a categoria"
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.nome}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <button className="btn btn-outline-danger btn-sm" title="Excluir" onClick={() => handleDeleteProduct(item.id)}>
                    <i className="bi bi-trash"></i>
                </button>
                <Link to={`/products/${item.id}`} className="btn btn-outline-primary btn-sm ms-2" title="Alterar">
                    <i className="bi bi-pencil"></i>
                </Link>
            </td>
        </tr>
    );
}

TableProductsLine.propTypes = {
    item: PropTypes.object.isRequired,
    handleDeleteProduct: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired, // Recebe as categorias como prop
    handleCategoryChange: PropTypes.func.isRequired // Função para atualizar a categoria
};

export default TableProductsLine;
