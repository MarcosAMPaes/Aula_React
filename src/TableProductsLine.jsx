import { Link } from 'react-router-dom';
import { NumberFormatter, CurrencyFormatter } from './formatters';

const TableProductsLine = ({ item, handleExcludeProduct }) => {
    const getImagePath = (product) => {
        const backendUrl = "http://127.0.0.1:8000/static/img/produtos";
        return `${backendUrl}/${String(product.id).padStart(4, '0')}.jpg`;
    };
    return (
        <tr>
            <td>
                <div className="d-flex align-items-center">
                    <img 
                        src={getImagePath(item)} 
                        className="img-thumbnail" 
                        style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                    />
                    {item.nome}
                </div>
            </td>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{CurrencyFormatter.format(item.preco)}</td>
            <td>{NumberFormatter.format(item.estoque, 6)}</td>
            <td>
                <button className="btn btn-outline-danger btn-sm" title="Excluir Produto" onClick={() => handleExcludeProduct(item.id)}>
                    <i className="bi bi-x-circle"></i>
                </button>
                <Link className="btn btn-outline-info btn-sm ms-1" title="Alterar Produto" to={`/products/${item.id}`}>
                    <i className="bi bi-pencil-square"></i>
                </Link>
            </td>
        </tr>
    )
}

export default TableProductsLine;