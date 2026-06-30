import "./cartaoProduto.css";
import type { ProdutoDados } from "../interfaces/ProdutoDados";

interface CartaoProdutoProps {
    produto: ProdutoDados;
    onEditar?: () => void;
    onDeletar?: () => void;
    onDesabilitar?: () => void;
    onVerDetalhes?: () => void;
}

export function CartaoProduto({ produto, onEditar, onDeletar, onDesabilitar, onVerDetalhes }: CartaoProdutoProps) {
    return (
        <div className="cartao">
            <div className="cartao-header">
                <img src={produto.imagem} alt={`Imagem de ${produto.nome}`} />

                {onVerDetalhes && (
                    <button
                        className="btn-icone-detalhes"
                        onClick={onVerDetalhes}
                        title="Ver detalhes"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg"
                            alt="Lupa"
                            style={{ width: "20px", height: "20px" }}
                        />
                    </button>
                )}
            </div>

            <div className="cartao-conteudo">
                <h2>{produto.nome}</h2>
                <p><strong>Valor:</strong> R$ {produto.preco.toFixed(2)}</p>
            </div>

            <div className="cartao-acoes">

                {onEditar && (
                    <button onClick={onEditar} className="btn-editar">
                        Editar
                    </button>
                )}

                {onDesabilitar && (
                    <button onClick={onDesabilitar} className="btn-desabilitar">
                        {produto.disponibilidade ? "Desabilitar" : "Ativar"}
                    </button>
                )}

                {onDeletar && (
                    <button onClick={onDeletar} className="btn-deletar">
                        Deletar
                    </button>
                )}

            </div>
        </div>
    );
}