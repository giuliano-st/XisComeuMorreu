import type { ProdutoDados } from "../../interfaces/ProdutoDados";

interface ModalDetalhesProdutoProps {
    aberto: boolean;
    produto: ProdutoDados | null;
    onFechar: () => void;
}

export function ModalDetalhesProduto({
                                         aberto,
                                         produto,
                                         onFechar
                                     }: ModalDetalhesProdutoProps) {

    if (!aberto || !produto) return null;

    return (
        <div className="overlay">
            <div className="modal">

                <button
                    className="fechar"
                    onClick={onFechar}
                >
                    X
                </button>

                <div className="modal-detalhes">

                    <h2>Detalhes do Produto</h2>

                    <div className="detalhes-imagem-container">
                        <img
                            src={produto.imagem}
                            alt={produto.nome}
                        />
                    </div>

                    <div className="detalhes-info">

                        <p><strong>Nome:</strong> {produto.nome}</p>

                        <p><strong>Descrição:</strong> {produto.descricao}</p>

                        <p><strong>Categoria:</strong> {produto.categoria}</p>

                        <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {produto.disponibilidade
                                ? "Disponível"
                                : "Indisponível"}
                        </p>

                    </div>

                    <button
                        className="btn-cancelar"
                        onClick={onFechar}
                    >
                        Fechar
                    </button>

                </div>

            </div>
        </div>
    );
}