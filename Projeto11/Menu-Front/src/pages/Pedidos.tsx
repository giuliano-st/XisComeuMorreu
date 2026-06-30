import { useState } from "react";
import { usePedidoDados } from "../hooks/usePedidoDados.ts";
import type { PedidoDados } from "../interfaces/PedidoDados.ts";
import { usePedidoDeletar } from "../hooks/usePedidoDeletar.ts";
import { usePedidoAtualizar } from "../hooks/usePedidoEditar.ts";
import { Navbar } from "../componentes/layout/Navbar.tsx";
import { FormularioPedido } from "../componentes/FormularioPedido.tsx";
import { CartaoPedido } from "../componentes/CartaoPedido.tsx";
import { useNavigate } from "react-router-dom";
import {ModalEditarPedido} from "../componentes/ModalEditarPedido.tsx";
import "./Pedidos.css";

const Pedidos = () => {
    const { data } = usePedidoDados();
    const [modalAberto, setModalAberto] = useState(false);
    const [tipoAcao, setTipoAcao] = useState<"cadastrar" | "editar" | "deletar" | "detalhes" | null>(null);
    const navigate = useNavigate();

    const [pedidoSelecionado, setPedidoSelecionado] =
        useState<PedidoDados | null>(null);

    const { mutate: deletarPedido, isPending: isDeletando } = usePedidoDeletar();
    const { mutate: editarPedido } = usePedidoAtualizar();

    const abrirEdicao = (pedido: PedidoDados) => {
        setTipoAcao("editar");
        setPedidoSelecionado(pedido);
        setModalAberto(true);
    };

    const abrirDelecao = (pedido: PedidoDados) => {
        setTipoAcao("deletar");
        setPedidoSelecionado(pedido);
        setModalAberto(true);
    };

    const abrirDetalhes = (pedido: PedidoDados) => {
        setTipoAcao("detalhes");
        setPedidoSelecionado(pedido);
        setModalAberto(true);
    };

    const handleMudarStatus = (pedido: PedidoDados, novoStatus: string) => {
        if (!pedido.id) return;

        const pedidoAtualizado: PedidoDados = {
            ...pedido,
            status: novoStatus
        };

        editarPedido(pedidoAtualizado, {
            onSuccess: () => {
                alert(`Status do pedido #${pedido.id} alterado para "${novoStatus}"!`);
            },
            onError: () => {
                alert("Erro ao alterar o status do pedido.");
            }
        });
    };

    const fecharModal = () => {
        setModalAberto(false);
        setTipoAcao(null);
        setPedidoSelecionado(null);
    };

    const handleConfirmarDelecao = () => {
        if (pedidoSelecionado?.id) {
            deletarPedido(pedidoSelecionado.id, {
                onSuccess: () => {
                    fecharModal();
                    alert("Pedido excluído com sucesso!");
                }
            });
        }
    };

    const handleEditar = (dadosEditados: PedidoDados) => {
        if (pedidoSelecionado?.id) {
            editarPedido({ id: pedidoSelecionado.id, ...dadosEditados }, {
                onSuccess: () => {
                    fecharModal();
                    alert("Pedido atualizado com sucesso!");
                }
            });
        }
    };

    return (
        <>
            <Navbar />

            <main className="container">
                <h1>Gerenciamento de Pedidos</h1>

                {modalAberto && (
                    <div className="overlay">
                        <div className="modal">
                            <button className="fechar" onClick={fecharModal}>X</button>

                            {tipoAcao === "cadastrar" && (
                                <>
                                    <h2>Registrar Novo Pedido</h2>
                                    <FormularioPedido/>
                                </>
                            )}

                            {tipoAcao === "editar" && (
                                <>
                                    <h2>Editar Pedido #{pedidoSelecionado?.id}</h2>
                                    <ModalEditarPedido
                                        pedido={pedidoSelecionado}
                                        status={pedidoSelecionado.status}
                                        setStatus={(novoStatus) =>
                                            setPedidoSelecionado({
                                                ...pedidoSelecionado,
                                                status: novoStatus
                                            })
                                        }
                                        onSalvar={() => handleEditar(pedidoSelecionado)}
                                        onCancelar={fecharModal}
                                    />
                                </>
                            )}

                            {tipoAcao === "detalhes" && pedidoSelecionado && (
                                <div className="modal-detalhes">
                                    <h2>Detalhes do Pedido #{pedidoSelecionado.id}</h2>

                                    <div className="detalhes-info">
                                        <p><strong>Cliente:</strong> {pedidoSelecionado.clienteId.nome}</p>
                                        <p><strong>Status:</strong> <span
                                            className={`status-${pedidoSelecionado.status.toLowerCase()}`}>{pedidoSelecionado.status}</span>
                                        </p>
                                        <p><strong>Data do
                                            Pedido:</strong> {new Date(pedidoSelecionado.dataPedido).toLocaleString('pt-BR')}
                                        </p>
                                        {pedidoSelecionado.dataEntrega && (
                                            <p><strong>Data de
                                                Entrega:</strong> {new Date(pedidoSelecionado.dataEntrega).toLocaleString('pt-BR')}
                                            </p>
                                        )}

                                        <hr/>
                                        <h3>Itens do Pedido</h3>
                                        <ul className="lista-itens-detalhes">
                                            {pedidoSelecionado.itensPedido.map((item) => (
                                                <li key={item.id}>
                                                    {item.quantidade}x {item.produtoId.nome} —
                                                    R$ {(item.produtoId.preco * item.quantidade).toFixed(2)}
                                                </li>
                                            ))}
                                        </ul>
                                        <hr/>

                                        <p className="total-pedido"><strong>Valor Total (c/
                                            10%):</strong> R$ {pedidoSelecionado.valorTotal.toFixed(2)}</p>
                                    </div>

                                    <button className="btn-cancelar" onClick={fecharModal}>Fechar</button>
                                </div>
                            )}

                            {tipoAcao === "deletar" && (
                                <div className="modal-deletar">
                                    <h2>Excluir Pedido</h2>
                                    <p>Tem certeza que deseja cancelar/excluir o pedido
                                        de <strong>{pedidoSelecionado?.clienteId.nome}</strong>?</p>
                                    <div className="botoes-alerta">
                                        <button className="btn-confirmar-delete" onClick={handleConfirmarDelecao}
                                                disabled={isDeletando}>
                                            {isDeletando ? "Excluindo..." : "Sim, excluir"}
                                        </button>
                                        <button className="btn-cancelar" onClick={fecharModal}>Cancelar</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <section className="grade-cartoes">
                    {data?.map((pedido) => (
                        <CartaoPedido
                            key={pedido.id}
                            pedido={pedido}
                            onVerDetalhes={() => abrirDetalhes(pedido)}
                            onEditar={() => abrirEdicao(pedido)}
                            onDeletar={() => abrirDelecao(pedido)}
                            onMudarStatus={(novoStatus) => handleMudarStatus(pedido, novoStatus)}
                        />
                    ))}
                </section>
                <button
                    type="button"
                    className="btn-menu"
                    onClick={() => navigate("/")}
                >
                    Voltar para o Menu
                </button>
            </main>
        </>
    );
};

export default Pedidos;