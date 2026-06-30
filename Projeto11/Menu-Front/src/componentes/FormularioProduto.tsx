import { useState, useEffect } from "react";
import type { ProdutoDados } from "../interfaces/ProdutoDados";
import { useProdutoMutate } from "../hooks/useProdutoMutate.ts";
import "./formularioProduto.css";

interface FormularioProps {
    produtoInicial?: ProdutoDados | null;
    onSubmit?: (dados: ProdutoDados) => void;
}

export function FormularioProduto({ produtoInicial, onSubmit }: FormularioProps) {
    const [nome, setNome] = useState(produtoInicial?.nome || "");
    const [descricao, setDescricao] = useState(produtoInicial?.descricao || "");
    const [preco, setPreco] = useState(produtoInicial?.preco?.toString() || "");
    const [categoria, setCategoria] = useState(produtoInicial?.categoria || "");
    const [imagem, setImagem] = useState(produtoInicial?.imagem || "");
    const [disponibilidade, setDisponibilidade] = useState(produtoInicial?.disponibilidade ?? true);

    const { mutate: cadastrar } = useProdutoMutate();

    useEffect(() => {
        if (produtoInicial) {
            setNome(produtoInicial.nome);
            setDescricao(produtoInicial.descricao || "");
            setPreco(produtoInicial.preco.toString());
            setCategoria(produtoInicial.categoria);
            setImagem(produtoInicial.imagem);
            setDisponibilidade(produtoInicial.disponibilidade);
        }
    }, [produtoInicial]);

    function enviarFormulario(event: React.FormEvent) {
        event.preventDefault();

        const produto: ProdutoDados = {
            ...(produtoInicial?.id && { id: produtoInicial.id }),
            nome,
            descricao,
            preco: Number(preco),
            categoria,
            imagem,
            disponibilidade
        };

        if (onSubmit) {
            onSubmit(produto);
        } else {
            cadastrar(produto);
            limparCampos();
        }
    }

    const limparCampos = () => {
        setNome("");
        setDescricao("");
        setPreco("");
        setCategoria("");
        setImagem("");
        setDisponibilidade(true);
    }

    return (
        <form className="formulario" onSubmit={enviarFormulario}>
            <h2>{produtoInicial ? "Editar Produto" : "Novo Produto"}</h2>

            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />

            <textarea
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />

            <input
                type="number"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            />

            <input
                type="text"
                placeholder="URL da imagem"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
            />

            <div className="campo-checkbox">
                <input
                    type="checkbox"
                    id="disponivel"
                    name="disponivel"
                    checked={disponibilidade}
                    onChange={(e) => setDisponibilidade(e.target.checked)}
                />
                <label htmlFor="disponivel">Disponível no cardápio</label>
            </div>

            <button type="submit">
                {produtoInicial ? "Salvar Alterações" : "Cadastrar"}
            </button>
        </form>
    );
}