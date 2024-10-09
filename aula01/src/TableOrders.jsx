import TableOrdersLine from "./TableOrdersLine";

const TableOrders = ({ items, handleCancelOrder, handleEvolveOrder }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Endereço</th>
                    <th>Estado</th>
                    <th>Cliente</th>
                    <th> Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.map(o => <TableOrdersLine item={o} key={o.id} handleCancelOrder={handleCancelOrder} handleEvolveOrder= {handleEvolveOrder}/>)}
            </tbody>
        </table>
    );
}

export default TableOrders;