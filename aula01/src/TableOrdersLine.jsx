import { NumberFormatter,CurrencyFormatter, DateTimeFormatter } from "./formatters";

const TableOrdersLine = ({ item, handleCancelOrder, handleEvolveOrder }) => {

    return (
        <tr>
            <td>{NumberFormatter.format(item.id,6)}</td>
            <td>{item.data_hora}</td>
            <td>{CurrencyFormatter.format(item.valor_total)}</td>
            <td>{item.endereco_entrega}</td>
            <td>{item.estado}</td>
            <td>{NumberFormatter.format(item.id_cliente, 6)}</td>
            <td>
                <button className="btn btn-outline-info btn-sm me-2">
                    <i className="bi bi-zoom-in"></i>
                </button>
                { (["Cancelado", "Entregue"].includes(item.estado)) &&
                <button className="btn btn-outline-danger btn-sm" tittle="Cancelar Pedido" onClick={() => handleCancelOrder(item.id)}>
                    <i className="bi bi-x-circle"></i>
                </button>
                }
                { (item.estado == "pendente") &&
                <button className="btn btn-outline-success btn-sm me-1" tittle="Progredir Estado" onClick={() => handleEvolveOrder(item.id)}>
                    <i className="bi bi-arrow-right-circle"></i>
                </button>
                }
            </td>
        </tr>
    );
}

export default TableOrdersLine;