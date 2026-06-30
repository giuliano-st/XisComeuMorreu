import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//Função DELETE deletar()
const API_URL = `http://${window.location.hostname}:8080`;

const deleteDados = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/produtos/${id}`);
};

export function useProdutoDeletar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteDados,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["produto-dados"] });
        }
    });
}