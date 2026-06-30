import type { ProdutoDados } from "./ProdutoDados.ts";

export interface ItemPedidoDados {
    id?: number;
    produtoId: ProdutoDados;
    quantidade: number;
}