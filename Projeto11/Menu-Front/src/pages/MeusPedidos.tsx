import { Navbar } from "../componentes/layout/Navbar";
import { CartaoPedido } from "../componentes/CartaoPedido";
import { usePedidoClienteDados } from "../hooks/usePedidoClienteDados";
import "./MeusPedidos.css";
import type { PedidoDados } from "../interfaces/PedidoDados";

export default function MeusPedidos() {

    const clienteRaw = localStorage.getItem("usuario");

    if (!clienteRaw) {
        return (
            <>
                <Navbar/>
                <main className="container">
                    <h2>Usuário não autenticado.</h2>
                </main>
            </>
        );
    }

    const cliente = JSON.parse(clienteRaw);

    const {
        data: pedidos,
        isLoading,
        isError
    } = usePedidoClienteDados(cliente.id);

    if (isLoading) {
        return (
            <>
                <Navbar/>
                <main className="container">
                    <h2>Carregando pedidos...</h2>
                </main>
            </>
        );
    }

    if (isError) {
        return (
            <>
                <Navbar/>
                <main className="container">
                    <h2>Erro ao carregar os pedidos.</h2>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar/>

            <main className="container-meus-pedidos">

                <div className="cabecalho-pedidos">
                    <h1>Meus Pedidos</h1>
                    <p>Acompanhe o andamento dos seus pedidos.</p>
                </div>

                {pedidos?.length === 0 ? (

                    <div className="sem-pedidos">
                        <h3>Você ainda não realizou pedidos.</h3>
                    </div>

                ) : (

                    <div className="lista-pedidos">

                        {pedidos.map((pedido: PedidoDados) => (

                            <CartaoPedido
                                key={pedido.id}
                                pedido={pedido}
                                modoCliente
                            />

                        ))}

                    </div>

                )}

            </main>

        </>
    );
}