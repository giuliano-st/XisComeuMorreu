import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProdutoDados } from "../interfaces/ProdutoDados";
// Função PUT atualizar()
const API_URL = `http://${window.location.hostname}:8080`;

const atualizaDados = async (produto: ProdutoDados): Promise<ProdutoDados> => {
    const response = await axios.put<ProdutoDados>(`${API_URL}/produtos/${produto.id}`, produto);
    return response.data;
};

export function useProdutoAtualizar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: atualizaDados,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["produto-dados"] });
        }
    });
}