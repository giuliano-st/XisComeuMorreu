import axios from "axios";
import { useQuery } from "@tanstack/react-query";
//Função GET buscarPorID ainda que no caso seja meio que buscar Pedido por clienteId
const API_URL = `http://${window.location.hostname}:8080`;

export function usePedidoClienteDados(clienteId: number) {

    return useQuery({

        queryKey: ["pedido-cliente", clienteId],

        queryFn: async () => {

            const response = await axios.get(
                `${API_URL}/pedidos/cliente/${clienteId}`
            );

            return response.data;

        }

    });

}