import type {ProdutoDados} from "./ProdutoDados";

export interface Cliente {
    id: number;
    nome: string;
}

export interface ItemPedido {
    id?: number;
    produtoId: ProdutoDados;
    quantidade: number;
}

export interface PedidoDados {
    id?: number;
    clienteId: Cliente;
    itensPedido: ItemPedido[];
    valorTotal: number;
    status: string;
    dataPedido: string;
    dataEntrega?: string;
}