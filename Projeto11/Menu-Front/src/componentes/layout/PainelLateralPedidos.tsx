import { usePedidoDados } from "../../hooks/usePedidoDados.ts";
import "./PainelLateralPedidos.css";
import {useNavigate} from "react-router-dom";

export const PainelLateralPedidos = () => {
    const { data: pedidos, isLoading } = usePedidoDados();
    const navigate = useNavigate();

    if (isLoading) return <aside className="painel-lateral"><h3>Carregando pedidos...</h3></aside>;

    return (
        <aside className="painel-lateral">
            <h2>Pedidos Recentes</h2>
            <div className="lista-rolante-pedidos">
                {pedidos?.length === 0 ? (
                    <p>Nenhum pedido no momento.</p>
                ) : (
                    pedidos?.map((pedido) => (
                        <div key={pedido.id} className={`cartao-mini-pedido status-${pedido.status.toLowerCase()}`}>
                            <div className="mini-pedido-header">
                                <strong>#{pedido.id}</strong>
                                <span className="badge-status">{pedido.status}</span>
                            </div>
                            <p><strong>Cliente:</strong> {pedido.clienteId.nome}</p>
                            <p><strong>Total:</strong> R$ {pedido.valorTotal.toFixed(2)}</p>
                            <small>{new Date(pedido.dataPedido).toLocaleTimeString('pt-BR')}</small>
                        </div>
                    ))
                )}
            </div>
            <button
                type="button"
                className="btn-mais"
                onClick={() => navigate("/pedidos")}
            >
                Ver mais
            </button>
        </aside>
    );
};