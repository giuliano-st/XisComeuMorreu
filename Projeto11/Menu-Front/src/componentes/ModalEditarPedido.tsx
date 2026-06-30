import type { PedidoDados } from "../interfaces/PedidoDados";
import "./modalEditarPedido.css";

interface Props {
    pedido: PedidoDados;
    status: string;
    setStatus: (status: string) => void;
    onSalvar: () => void;
    onCancelar: () => void;
}

export function ModalEditarPedido({
                                      pedido,
                                      status,
                                      setStatus,
                                      onSalvar,
                                      onCancelar
                                  }: Props) {

    return (

        <div className="modal-editar-pedido">

            <h2>Pedido #{pedido.id}</h2>

            <div className="info-pedido">

                <div>
                    <strong>Cliente</strong>
                    <span>{pedido.clienteId.nome}</span>
                </div>

                <div>
                    <strong>Data do Pedido</strong>
                    <span>
                        {new Date(pedido.dataPedido).toLocaleString("pt-BR")}
                    </span>
                </div>

                {pedido.dataEntrega && (
                    <div>
                        <strong>Data da Entrega</strong>
                        <span>
                            {new Date(pedido.dataEntrega).toLocaleString("pt-BR")}
                        </span>
                    </div>
                )}

            </div>

            <hr />

            <h3>Itens</h3>

            <div className="lista-itens">

                {pedido.itensPedido.map((item) => (

                    <div
                        key={item.produtoId.id}
                        className="linha-item"
                    >

                        <span>

                            {item.quantidade} × {item.produtoId.nome}

                        </span>

                        <strong>

                            R$ {(item.quantidade * item.produtoId.preco).toFixed(2)}

                        </strong>

                    </div>

                ))}

            </div>

            <hr />

            <div className="total-pedido">

                <span>Total</span>

                <strong>

                    R$ {pedido.valorTotal.toFixed(2)}

                </strong>

            </div>

            <div className="campo-status">

                <label>Status</label>

                <select
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}
                >
                    <option value="PENDENTE">Pendente</option>
                    <option value="PREPARANDO">Preparando</option>
                    <option value="PRONTO">Pronto</option>
                    <option value="ENTREGUE">Entregue</option>
                    <option value="CANCELADO">Cancelado</option>
                </select>

            </div>

            <div className="botoes-modal">

                <button
                    className="btn-cancelar"
                    onClick={onCancelar}
                >
                    Cancelar
                </button>

                <button
                    className="btn-salvar"
                    onClick={onSalvar}
                >
                    Salvar Alterações
                </button>

            </div>

        </div>

    );

}