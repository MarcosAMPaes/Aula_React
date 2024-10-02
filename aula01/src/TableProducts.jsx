import TableProductsLine from "./TableProductsLine";

const TableProducts = ({ items }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                </tr>
            </thead>
            <tbody>
                {items.map(p => <TableProductsLine item={p} key={p.id} />)}
            </tbody>
        </table>
    )
}

export default TableProducts;