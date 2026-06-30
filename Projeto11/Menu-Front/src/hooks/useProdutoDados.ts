import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { ProdutoDados } from "../interfaces/ProdutoDados";

const API_URL = `http://${window.location.hostname}:8080`;

const buscarDados = async (): Promise<ProdutoDados[]> => {
    const response = await axios.get<ProdutoDados[]>(`${API_URL}/produtos`);
    return response.data;
};

export function useProdutoDados() {
    return useQuery({
        queryKey: ["produto-dados"],
        queryFn: buscarDados,
        retry: 2,
        refetchInterval: 5000, // Atualiza a cada 5 segundos
    });
}