import { useState, useEffect } from "react";
import type { PedidoDados, ItemPedido, Cliente } from "../interfaces/PedidoDados";
import { useProdutoDados } from "../hooks/useProdutoDados.ts";
import { usePedidoMutate } from "../hooks/usePedidoMutate.ts";
import "./formularioPedido.css";

interface FormularioProps {
    pedidoInicial?: PedidoDados | null;
    onSubmit?: (dados: PedidoDados) => void;
}

export function FormularioPedido({ pedidoInicial, onSubmit }: FormularioProps) {
    const [clienteId, setClienteId] = useState<number>(pedidoInicial?.clienteId?.id || 0);
    const [clienteNome, setClienteNome] = useState<string>(pedidoInicial?.clienteId?.nome || "");
    const [status, setStatus] = useState<string>(pedidoInicial?.status || "PENDENTE");
    const [itensPedido, setItensPedido] = useState<ItemPedido[]>(pedidoInicial?.itensPedido || []);

    const { data: produtos } = useProdutoDados();
    const [produtoSelecionadoId, setProdutoSelecionadoId] = useState<string>("");
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState<number>(1);

    const { mutate: cadastrarPedido } = usePedidoMutate();

    useEffect(() => {
        if (pedidoInicial) {
            setClienteId(pedidoInicial.clienteId.id);
            setClienteNome(pedidoInicial.clienteId.nome);
            setStatus(pedidoInicial.status);
            setItensPedido(pedidoInicial.itensPedido);
        }
    }, [pedidoInicial]);

    const adicionarItem = () => {
        if (!produtoSelecionadoId) return alert("Selecione um produto!");

        const produtoEncontrado = produtos?.find(p => p.id === Number(produtoSelecionadoId));
        if (!produtoEncontrado) return;

        const itemExistente = itensPedido.find(item => item.produtoId.id === produtoEncontrado.id);
        if (itemExistente) {
            setItensPedido(itensPedido.map(item =>
                item.produtoId.id === produtoEncontrado.id
                    ? { ...item, quantidade: item.quantidade + quantidadeSelecionada }
                    : item
            ));
        } else {
            const novoItem: ItemPedido = {
                produtoId: produtoEncontrado,
                quantidade: quantidadeSelecionada
            };
            setItensPedido([...itensPedido, novoItem]);
        }

        setProdutoSelecionadoId("");
        setQuantidadeSelecionada(1);
    };

    const removerItem = (produtoId?: number) => {
        setItensPedido(itensPedido.filter(item => item.produtoId.id !== produtoId));
    };

    function enviarFormulario(event: React.FormEvent) {
        event.preventDefault();

        if (itensPedido.length === 0) {
            return alert("Adicione pelo menos um item ao pedido!");
        }

        const clienteObjeto: Cliente = {
            id: clienteId,
            nome: clienteNome || `Cliente #${clienteId}`
        };

        const pedido: PedidoDados = {
            ...(pedidoInicial?.id && { id: pedidoInicial.id }),
            clienteId: clienteObjeto,
            itensPedido,
            status,
            valorTotal: pedidoInicial?.valorTotal || 0,
            dataPedido: pedidoInicial?.dataPedido || new Date().toISOString()
        };

        if (onSubmit) {
            onSubmit(pedido);
        } else {
            cadastrarPedido(pedido);
            limparCampos();
        }
    }

    const limparCampos = () => {
        setClienteId(0);
        setClienteNome("");
        setStatus("PENDENTE");
        setItensPedido([]);
    };

    return (
        <form className="formulario" onSubmit={enviarFormulario}>
            <h2>{pedidoInicial ? `Editar Pedido #${pedidoInicial.id}` : "Novo Pedido"}</h2>

            {!pedidoInicial ? (

                <div className="grupo-input">

                    <input
                        type="number"
                        placeholder="ID do Cliente"
                        value={clienteId || ""}
                        onChange={(e) => setClienteId(Number(e.target.value))}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Nome do Cliente"
                        value={clienteNome}
                        onChange={(e) => setClienteNome(e.target.value)}
                    />

                </div>

            ) : (

                <div className="pedido-info">

                    <strong>Cliente</strong>

                    <span>{clienteNome}</span>

                </div>

            )}

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="PENDENTE">Pendente</option>
                <option value="PREPARANDO">Preparando</option>
                <option value="PRONTO">Pronto</option>
                <option value="ENTREGUE">Entregue</option>
                <option value="CANCELADO">Cancelado</option>
            </select>

            <hr />
            <h3>Adicionar Itens</h3>

            <div className="adicionar-itens-container">
                <select
                    value={produtoSelecionadoId}
                    onChange={(e) => setProdutoSelecionadoId(e.target.value)}
                >
                    <option value="">Selecione um Produto...</option>
                    {produtos?.filter(p => p.disponibilidade).map(p => (
                        <option key={p.id} value={p.id}>{p.nome} - R$ {p.preco.toFixed(2)}</option>
                    ))}
                </select>

                <input
                    type="number"
                    min="1"
                    value={quantidadeSelecionada}
                    onChange={(e) => setQuantidadeSelecionada(Number(e.target.value))}
                />

                <button type="button" className="btn-adicionar" onClick={adicionarItem}>
                    + Adicionar
                </button>
            </div>

            <div className="lista-itens-adicionados">
                <h4>Itens do Pedido atual:</h4>
                {itensPedido.length === 0 ? (
                    <p className="aviso-vazio">Nenhum item adicionado ainda.</p>
                ) : (
                    <ul>
                        {itensPedido.map((item, index) => (
                            <li key={index}>
                                {item.quantidade}x {item.produtoId.nome}
                                <button
                                    type="button"
                                    className="btn-remover-item"
                                    onClick={() => removerItem(item.produtoId.id)}
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <hr />

            <button type="submit">
                {pedidoInicial ? "Salvar Alterações" : "Fechar e Enviar Pedido"}
            </button>
        </form>
    );
}