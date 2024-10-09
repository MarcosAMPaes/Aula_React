import { useEffect, useState } from "react";
import api from './axiosApi';
import TableOrders from "./TableOrders";
import NoOrders from "./NoOrders";
import ModalConfirm from "./ModalConfirm";
import Loading from "./Loading";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [orderState, setOrderState] = useState("pendente")
    const [selectdOrderId, setSelectedOrderid] = useState(0)
    const [loading, setLoading] = useState(true)

    const loadOrders = (state) => {
        setLoading(true)
        const ordersEndpoint = `obter_pedidos_por_estado/${state}`;
        api.get(ordersEndpoint)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log("Esse é o erro", error);
            })
            .finally(() => {
                setLoading(false)
            });
    }

    const cancelOrder = (orderId) => {
        setLoading(true)
        api.post(`alterar_pedido/${orderId}`)
            .then((response) => {
                loadOrders(orderState);
            })
            .catch((error) => {
                console.log("Erro ao cancelar pedido", error);
            })
            .finally(() => {
                setLoading(false)
            });
    }

    const evolveOrder = (orderId) => {
        setLoading(true)
        api.post(`evoluir_pedido/${orderId}`)
            .then((response) => {
                loadOrders(orderState);
            })
            .catch((error) => {
                console.log("Erro ao evoluir pedido", error);
            })
            .finally(() => {
                setLoading(false)
            });
    }

    const handleCancelOrder = (orderId) => {
        setSelectedOrderid(orderId)
        const modal = new bootstrap.Modal(document.getElementById('modalCancelOrder'));
        modal.show()
    }

    
    const handleEvolveOrder = (orderId) => {
        setSelectedOrderid(orderId)
        const modal = new bootstrap.Modal(document.getElementById('modalEvolverOrder'));
        modal.show()
    }
    useEffect(() => {
        loadOrders(orderState);
    }, [orderState]);
    
    return (
        <>
            <div className="form-floating my-3">
                <select id="orderState" value={orderState} onChange={(event) => setOrderState(event.target.value)} className="form-control">
                    <option value="carrinho">Carrinho</option>
                    <option value="pendente">Pendente</option>
                    <option value="pago">Pago</option>
                    <option value="faturado">Faturado</option>
                    <option value="separado">Separado</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregue">Entregue</option>
                    <option value="cancelado">Cancelado</option>
                </select>
                <label htmlFor="orderState" className="form-label">
                    Buscar pedidos por estado:
                </label>
            </div>
            {
                orders.length > 0 ?
                    <>
                        <ModalConfirm modalId="modalCancelOrder" question="Deseja realmente cancelar o pedido ?" confirmAction={ () => cancelOrder(selectdOrderId)} />
                        <ModalConfirm modalId="modalEvolveOrder" question="Deseja realmente evoluir o pedido ?" confirmAction={ () => evolveOrder(selectdOrderId)} />
                        <TableOrders items={orders} handleCancelOrder= {handleCancelOrder} handleEvolveOrder = {handleEvolveOrder}/>
                    </>
                :
                    (!loading && <NoOrders state={orderState}/>)
            }

            {loading && <Loading />}
            
        </>
    );
}

export default Orders;