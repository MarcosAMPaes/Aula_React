import TableProductsLine from "./TableProductsLine"

const TableProducts = ({ items, handleExcludeProduct }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Código</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.map(p => <TableProductsLine item={p} key={p.id} handleExcludeProduct={handleExcludeProduct} />)}
            </tbody>
        </table>
    )
}

export default TableProducts;