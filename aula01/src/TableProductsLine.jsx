import { NumberFormatter,CurrencyFormatter } from "./formatters";

const TableProductsLine = ({ item }) => {
    return (
        <tr>
            <td>{NumberFormatter.format(item.id,6)}</td>
            <td>{item.nome}</td>
            <td>{CurrencyFormatter.format(item.preco)}</td>
            <td>{item.estoque}</td>
        </tr>
    )
}

export default TableProductsLine;