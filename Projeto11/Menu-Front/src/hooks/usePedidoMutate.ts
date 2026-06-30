import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PedidoDados } from "../interfaces/PedidoDados.ts";
//Função POST salvar()
const API_URL = `http://${window.location.hostname}:8080`;

async function salvarPedido(pedido: PedidoDados) {

    const response = await axios.post(
        `${API_URL}/pedidos`,
        pedido
    );

    return response.data;
}

export function usePedidoMutate() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: salvarPedido,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["pedido-dados"]
            });
        }

    });
}