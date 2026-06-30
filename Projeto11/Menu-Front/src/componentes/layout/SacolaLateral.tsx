import type { ItemPedidoDados } from "../../interfaces/ItemPedidoDados.ts";
import type { ClienteDados } from "../../interfaces/ClienteDados.ts";
import { usePedidoMutate } from "../../hooks/usePedidoMutate.ts";
import { useNavigate } from "react-router-dom";

interface SacolaLateralProps {
    sacola: ItemPedidoDados[];
    setSacola: React.Dispatch<React.SetStateAction<ItemPedidoDados[]>>;
}

export const SacolaLateral = ({ sacola, setSacola }: SacolaLateralProps) => {
    const { mutate: enviarPedido } = usePedidoMutate();
    const navigate = useNavigate();

    const clienteLogado: ClienteDados | null =
        JSON.parse(localStorage.getItem("usuario") || "null");

    const valorSubtotal = sacola.reduce((acc, item) => acc + (item.produtoId.preco * item.quantidade), 0);
    const taxaServico = valorSubtotal > 0 ? valorSubtotal * 0.10 : 0;
    const valorTotal = valorSubtotal + taxaServico;

    const alterarQuantidade = (produtoId: number, quantidadeNova: number) => {
        if (quantidadeNova <= 0) {
            setSacola(atual => atual.filter(item => item.produtoId.id !== produtoId));
            return;
        }
        setSacola(atual => atual.map(item =>
            item.produtoId.id === produtoId ? { ...item, quantidade: quantidadeNova } : item
        ));
    };

    const handleFinalizarPedido = () => {
        if (sacola.length === 0) return alert("Sua sacola está vazia!");
        if (!clienteLogado) return alert("Sessão expirada. Por favor, faça login novamente.");

        const novoPedido = {
            clienteId: clienteLogado.id,

            status: "PENDENTE",

            dataPedido: new Date().toISOString(),

            dataEntrega: null,

            itensPedido: sacola.map(item => ({
                pedidoId: null,
                produtoId: item.produtoId.id,
                quantidade: item.quantidade
            }))
        };

        // @ts-ignore
        enviarPedido(novoPedido, {
            onSuccess: () => {
                alert("Pedido enviado para a cozinha com sucesso!");
                setSacola([]);
                navigate("/meus-pedidos");
            },
            onError: () => {
                alert("Erro ao processar o pedido. Tente novamente.");
            }
        });
    };

    return (
        <aside className="painel-lateral" style={{ width: '360px', padding: '20px', borderLeft: '1px solid #ddd', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0, backgroundColor: '#fff' }}>
            <h2>Sua Sacola</h2>

            <div className="itens-sacola" style={{ flex: 1, overflowY: 'auto', marginTop: '15px' }}>
                {sacola.length === 0 ? (
                    <p style={{ color: '#888', textAlign: 'center', marginTop: '50px' }}>Você ainda não escolheu nada.</p>
                ) : (
                    sacola.map((item) => (
                        <div key={item.produtoId.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
                            <div style={{ maxWidth: '60%' }}>
                                <h4 style={{ margin: 0, fontSize: '15px' }}>{item.produtoId.nome}</h4>
                                <span style={{ fontSize: '13px', color: '#2ec4b6', fontWeight: 'bold' }}>
                                    R$ {(item.produtoId.preco * item.quantidade).toFixed(2)}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button onClick={() => alterarQuantidade(item.produtoId.id!, item.quantidade - 1)} style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>-</button>
                                <span style={{ fontWeight: 'bold', minWidth: '15px', textAlign: 'center' }}>{item.quantidade}</span>
                                <button onClick={() => alterarQuantidade(item.produtoId.id!, item.quantidade + 1)} style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>+</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {sacola.length > 0 && (
                <div className="resumo-valores" style={{ borderTop: '2px solid #f5f5f5', paddingTop: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
                        <span>Subtotal:</span>
                        <span>R$ {valorSubtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px', color: '#888' }}>
                        <span>Taxa de Serviço (10%):</span>
                        <span>R$ {taxaServico.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', marginBottom: '15px' }}>
                        <span>Total:</span>
                        <span>R$ {valorTotal.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleFinalizarPedido}
                        style={{ width: '100%', padding: '14px', backgroundColor: '#2ec4b6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Confirmar e Enviar Pedido
                    </button>
                </div>
            )}
        </aside>
    );
};