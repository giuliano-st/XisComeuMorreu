import { useState } from "react";
import { useProdutoDados } from "../hooks/useProdutoDados.ts";
import type { ProdutoDados } from "../interfaces/ProdutoDados.ts";
import type { ItemPedidoDados } from "../interfaces/ItemPedidoDados.ts";
import { Navbar } from "../componentes/layout/Navbar.tsx";
import { CartaoProduto } from "../componentes/CartaoProduto.tsx";
import { SacolaLateral } from "../componentes/layout/SacolaLateral.tsx";
import { ModalDetalhesProduto } from "../componentes/modais/ModalDetalhesProduto.tsx";
import "../pages/Menu.css";

const CardapioCliente = () => {
    const { data: produtos } = useProdutoDados();
    const [sacola, setSacola] = useState<ItemPedidoDados[]>([]);
    // @ts-expect-error
    const [tipoAcao, setTipoAcao] = useState<"detalhes" | null>(null);
    const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoDados | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    const handleAdicionarComSeguranca = (produto: ProdutoDados) => {
        setSacola((itensAtuais) => {
            const itemExiste = itensAtuais.find((item) => item.produtoId.id === produto.id);
            if (itemExiste) {
                return itensAtuais.map((item) =>
                    item.produtoId.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }
            return [...itensAtuais, { produtoId: produto, quantidade: 1 }];
        });
    };

    const abrirDetalhes = (produto: ProdutoDados) => {
        setTipoAcao("detalhes");
        setProdutoSelecionado(produto);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setProdutoSelecionado(null);
        setTipoAcao(null);
    };

    return (
        <>
            <Navbar />
            <div className="layout-admin-dashboard">
                <main className="container" style={{ flex: 1 }}>
                    <div style={{ marginBottom: '30px' }}>
                        <h1>Faça seu Pedido</h1>
                        <p style={{ color: '#666', textAlign: 'center' }}>Escolha os itens abaixo e monte sua sacola em tempo real.</p>
                    </div>

                    <section className="grade-cartoes">
                        {produtos?.filter(p => p.disponibilidade).map((produto) => (
                            <div key={produto.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <CartaoProduto
                                    produto={produto}
                                    onVerDetalhes={() => abrirDetalhes(produto)}
                                />

                                <button
                                    onClick={() => handleAdicionarComSeguranca(produto)}
                                    style={{ width: '100%', padding: '10px', backgroundColor: '#2ec4b6', color: 'white', border: 'none', borderRadius: '4px', marginTop: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    Adicionar à Sacola
                                </button>
                            </div>
                        ))}
                    </section>
                </main>

                <SacolaLateral sacola={sacola} setSacola={setSacola} />
                <ModalDetalhesProduto
                    aberto={modalAberto}
                    produto={produtoSelecionado}
                    onFechar={fecharModal}
                />
            </div>
        </>
    );
};

export default CardapioCliente;