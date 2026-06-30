import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PedidoDados } from "../interfaces/PedidoDados";
// Função PUT atualizar()
const API_URL = `http://${window.location.hostname}:8080`;

const atualizaDados = async (pedido: PedidoDados): Promise<PedidoDados> => {
    const payload = {
        id: pedido.id,
        status: pedido.status,
        dataPedido: pedido.dataPedido,
        dataEntrega: pedido.dataEntrega,
        valorTotal: pedido.valorTotal,

        clienteId: pedido.clienteId?.id || null,

        itensPedido: pedido.itensPedido?.map(item => ({
            id: item.id,
            quantidade: item.quantidade,
            produtoId: item.produtoId?.id || null
        }))
    };

    const response = await axios.put<PedidoDados>(`${API_URL}/pedidos/${pedido.id}`, payload);
    return response.data;
};

export function usePedidoAtualizar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: atualizaDados,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pedido-dados"] });
        }
    });
}