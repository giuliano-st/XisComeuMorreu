import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClienteDados } from "../interfaces/ClienteDados.ts";
//Função POST salvar()
const API_URL = `http://${window.location.hostname}:8080`;

async function salvarCliente(cliente: ClienteDados) {

    const response = await axios.post(
        `${API_URL}/clientes`,
        cliente
    );

    return response.data;
}

export function useClienteMutate() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: salvarCliente,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cliente-dados"]
            });
        }

    });
}