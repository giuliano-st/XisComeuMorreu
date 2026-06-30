import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { ClienteDados } from "../interfaces/ClienteDados";
//Função GET listar() e buscarPorId()s
const API_URL = `http://${window.location.hostname}:8080`;

const buscarClientes = async (): Promise<ClienteDados[]> => {
    const response = await axios.get<ClienteDados[]>(`${API_URL}/clientes`);
    return response.data;
};

export function useClienteDados() {
    return useQuery({
        queryKey: ["cliente-dados"],
        queryFn: buscarClientes,
        retry: 2,
    });
}