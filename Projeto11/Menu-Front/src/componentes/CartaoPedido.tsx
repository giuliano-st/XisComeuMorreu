import type { PedidoDados } from "../interfaces/PedidoDados";
import "./cartaoPedido.css";

interface CartaoPedidoProps {
    pedido: PedidoDados;

    onVerDetalhes?: () => void;
    onEditar?: () => void;
    onDeletar?: () => void;
    onMudarStatus?: (novoStatus: string) => void;

    modoCliente?: boolean;
}

export function CartaoPedido({
                                 pedido,
                                 onVerDetalhes,
                                 onEditar,
                                 onDeletar,
                                 onMudarStatus,
                                 modoCliente = false
                             }: CartaoPedidoProps) {

    const obterClasseStatus = (status: string) => {
        switch (status.toUpperCase()) {
            case "PENDENTE": return "status-pendente";
            case "PREPARANDO": return "status-preparando";
            case "PRONTO": return "status-pronto";
            case "ENTREGUE": return "status-entregue";
            default: return "status-cancelado";
        }
    };

    return (
        <div className="recibo-card">

            <div className="recibo-topo">
                <span className="recibo-id">CUPOM Nº #{pedido.id}</span>
                <span className={`recibo-status ${obterClasseStatus(pedido.status)}`}>
                    {pedido.status}
                </span>
            </div>

            <div className="recibo-linhas-decorativas"></div>

            <div className="recibo-corpo">
                <p><strong>CLIENTE:</strong> {pedido.clienteId.id} - {pedido.clienteId.nome || "Não Informado"}</p>
                <p><strong>DATA:</strong> {new Date(pedido.dataPedido).toLocaleString("pt-BR")}</p>

                <div className="recibo-divisor">----------------------------------------</div>

                <div className="recibo-itens-titulo">
                    <span>ITEM</span>
                    <span>QTD x VL</span>
                </div>

                <ul className="recibo-lista-itens">
                    {pedido.itensPedido.map((item, index) => (
                        <li key={index} className="recibo-item">
                            <span className="item-nome">{item.produtoId.nome}</span>
                            <span className="item-valores">
                                {item.quantidade} x R$ {item.produtoId.preco.toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="recibo-divisor">----------------------------------------</div>

                <div className="recibo-total">
                    <span>TOTAL (c/ 10% Garçom):</span>
                    <strong>R$ {pedido.valorTotal?.toFixed(2)}</strong>
                </div>
            </div>

            <div className="recibo-linhas-decorativas"></div>

            {!modoCliente && (
                <div className="recibo-acoes">

                    <div className="grupo-botoes-status">

                        <select
                            value={pedido.status}
                            onChange={(e) =>
                                onMudarStatus?.(e.target.value)
                            }
                            className="select-status-rapido"
                        >
                            <option value="PENDENTE">Pendente</option>
                            <option value="PREPARANDO">Preparando</option>
                            <option value="PRONTO">Pronto</option>
                            <option value="ENTREGUE">Entregue</option>
                            <option value="CANCELADO">Cancelado</option>
                        </select>

                    </div>

                    <div className="grupo-botoes-crud">

                        <button
                            className="btn-recibo btn-detalhes"
                            onClick={onVerDetalhes}
                        >
                            👁️
                        </button>

                        <button
                            className="btn-recibo btn-editar"
                            onClick={onEditar}
                        >
                            ✏️
                        </button>

                        <button
                            className="btn-recibo btn-deletar"
                            onClick={onDeletar}
                        >
                            🗑️
                        </button>

                    </div>

                </div>
            )}
            {modoCliente && pedido.dataEntrega && (
                <div
                    style={{
                        marginTop: "15px",
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#2ec4b6"
                    }}
                >
                    Entregue em{" "}
                    {new Date(pedido.dataEntrega).toLocaleString("pt-BR")}
                </div>
            )}
            {modoCliente && !pedido.dataEntrega && (
                <div
                    className={`recibo-status ${obterClasseStatus(pedido.status)}`}
                    style={{
                        marginTop: "15px",
                        textAlign: "center"
                    }}
                >
                    Status atual: {pedido.status}
                </div>
            )}
        </div>
    );
}