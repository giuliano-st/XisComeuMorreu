import type { ProdutoDados } from "../../interfaces/ProdutoDados";
import { FormularioProduto } from "../FormularioProduto";

interface ModalFormularioProdutoProps {

    aberto: boolean;

    titulo: string;

    produto?: ProdutoDados | null;

    onFechar: () => void;

    onSubmit: (produto: ProdutoDados) => void;
}

export function ModalFormularioProduto({

                                           aberto,

                                           titulo,

                                           produto,

                                           onFechar,

                                           onSubmit

                                       }: ModalFormularioProdutoProps) {

    if (!aberto) return null;

    return (

        <div className="overlay">

            <div className="modal">

                <button
                    className="fechar"
                    onClick={onFechar}
                >
                    X
                </button>

                <h2>{titulo}</h2>

                <FormularioProduto
                    produtoInicial={produto ?? undefined}
                    onSubmit={onSubmit}
                />

            </div>

        </div>

    );
}