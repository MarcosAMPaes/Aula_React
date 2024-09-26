const TableProductsLine = ({ item }) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.preco}</td>
            <td>{item.estoque}</td>
        </tr>
    )
}

export default TableProductsLine;