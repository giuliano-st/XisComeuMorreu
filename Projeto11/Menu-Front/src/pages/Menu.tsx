import { PainelLateralPedidos } from "../componentes/layout/PainelLateralPedidos.tsx";
import {useProdutoDados} from "../hooks/useProdutoDados.ts";
import {useState} from "react";
import type {ProdutoDados} from "../interfaces/ProdutoDados.ts";
import {useProdutoDeletar} from "../hooks/useProdutoDeletar.ts";
import {useProdutoAtualizar} from "../hooks/useProdutoEditar.ts";
import {Navbar} from "../componentes/layout/Navbar.tsx";
import {CartaoProduto} from "../componentes/CartaoProduto.tsx";
import { ModalDetalhesProduto } from "../componentes/modais/ModalDetalhesProduto.tsx";
import { ModalFormularioProduto} from "../componentes/modais/ModalFormularioProduto.tsx";
import { ModalConfirmacao } from "../componentes/modais/ModalConfirmacao.tsx";
import "./Menu.css";
import {useProdutoMutate} from "../hooks/useProdutoMutate.ts";

const Menu = () => {
    const { data } = useProdutoDados();
    const [modalAberto, setModalAberto] = useState(false);
    const [tipoAcao, setTipoAcao] = useState<"cadastrar" | "editar" | "deletar" | "detalhes" | null>(null);

    const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoDados | null>(null);

    const { mutate: cadastrarProduto } = useProdutoMutate();
    const { mutate: deletarProduto, isPending: isDeletando } = useProdutoDeletar();
    const { mutate: editarProduto } = useProdutoAtualizar();

    const abrirCadastro = () => {
        setTipoAcao("cadastrar");
        setProdutoSelecionado(null);
        setModalAberto(true);
    };

    const abrirEdicao = (produto: ProdutoDados) => {
        setTipoAcao("editar");
        setProdutoSelecionado(produto);
        setModalAberto(true);
    };

    const abrirDelecao = (produto: ProdutoDados) => {
        setTipoAcao("deletar");
        setProdutoSelecionado(produto);
        setModalAberto(true);
    };

    const abrirDetalhes = (produto: ProdutoDados) => {
        setTipoAcao("detalhes");
        setProdutoSelecionado(produto);
        setModalAberto(true);
    };

    const handleDesabilitar = (produto: ProdutoDados) => {
        if (!produto.id) return;

        const produtoAtualizado: ProdutoDados = {
            ...produto,
            disponibilidade: !produto.disponibilidade
        };

        editarProduto(produtoAtualizado, {
            onSuccess: () => {
                const acao = produtoAtualizado.disponibilidade ? "ativado" : "desabilitado";
                alert(`Produto "${produto.nome}" ${acao} com sucesso!`);
            },
            onError: () => {
                alert("Erro ao alterar a disponibilidade do produto.");
            }
        });
    };
    const fecharModal = () => {
        setModalAberto(false);
        setTipoAcao(null);
        setProdutoSelecionado(null);
    };

    const handleConfirmarDelecao = () => {
        if (produtoSelecionado?.id) {
            deletarProduto(produtoSelecionado.id, {
                onSuccess: () => {
                    fecharModal();
                    alert("Produto deletado com sucesso!");
                }
            });
        }
    };

    const handleEditar = (dadosEditados: ProdutoDados) => {
        if (produtoSelecionado?.id) {
            editarProduto({id: produtoSelecionado.id, ...dadosEditados}, {
                onSuccess: () => {
                    fecharModal();
                    alert("Produto editado com sucesso!");
                }
            })
        }
    }

    const handleCadastro = (produto: ProdutoDados) => {
        cadastrarProduto(produto, {
            onSuccess: () => {
                fecharModal();
            },
            onError: () => {
                alert("Erro ao cadastrar o produto.");
            }
        });
    };

    return (
        <>
            <Navbar/>
            <div className="layout-admin-dashboard">
            <main className="container">

                <h1>Cardápio</h1>

                {modalAberto && (
                    <div className="overlay">
                        <div className="modal">
                            <button className="fechar" onClick={fecharModal}>X</button>

                            <ModalFormularioProduto
                                aberto={modalAberto && tipoAcao === "cadastrar"}
                                titulo="Cadastrar Novo Produto"
                                onFechar={fecharModal}
                                onSubmit={handleCadastro}
                            />

                            <ModalFormularioProduto
                                aberto={modalAberto && tipoAcao === "editar"}
                                titulo={`Editar: ${produtoSelecionado?.nome}`}
                                produto={produtoSelecionado}
                                onFechar={fecharModal}
                                onSubmit={handleEditar}
                            />

                            <ModalDetalhesProduto
                                aberto={modalAberto && tipoAcao === "detalhes"}
                                produto={produtoSelecionado}
                                onFechar={fecharModal}
                            />

                            <ModalConfirmacao
                                aberto={modalAberto && tipoAcao === "deletar"}
                                titulo="Excluir Produto"
                                mensagem={`Tem certeza que deseja excluir ${produtoSelecionado?.nome}?`}
                                textoConfirmar="Sim, excluir"
                                carregando={isDeletando}
                                onConfirmar={handleConfirmarDelecao}
                                onCancelar={fecharModal}
                            />
                        </div>
                    </div>
                )}

                <section className="grade-cartoes">
                    {data?.map((produto) => (
                        <CartaoProduto
                            key={produto.id}
                            produto={produto}
                            onVerDetalhes={() => abrirDetalhes(produto)}
                            onEditar={() => abrirEdicao(produto)}
                            onDeletar={() => abrirDelecao(produto)}
                            onDesabilitar={() => handleDesabilitar(produto)}
                        />
                    ))}
                </section>
                {(
                    <button
                        className="btn-flutuante-cadastro"
                        onClick={abrirCadastro}
                        title="Cadastrar Novo Produto"
                    >
                        +
                    </button>
                )}
            </main>
                <PainelLateralPedidos />
            </div>
        </>
    );
};

export default Menu;