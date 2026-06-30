import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClienteDados } from "../interfaces/ClienteDados";
// Função PUT atualizar()
const API_URL = `http://${window.location.hostname}:8080`;

const atualizaDados = async (cliente: ClienteDados): Promise<ClienteDados> => {
    const response = await axios.put<ClienteDados>(`${API_URL}/clientes/${cliente.id}`, cliente);
    return response.data;
};

export function useClienteAtualizar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: atualizaDados,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cliente-dados"] });
        }
    });
}