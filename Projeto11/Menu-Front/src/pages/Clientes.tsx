import { useClienteDados } from "../hooks/useClienteDados";
import "./Clientes.css";
import {Navbar} from "../componentes/layout/Navbar.tsx";

const Clientes = () => {
    const { data: clientes } = useClienteDados();

    return (
        <>
            <Navbar/>

        <div className="container">
            <h1>Selecionar Cliente</h1>

            <div className="lista-clientes">
                {clientes?.map((cliente) => (
                    <div
                        key={cliente.id}
                        className="card-cliente"
                    >
                        <h3>{cliente.nome}</h3>
                        <p>{cliente.email}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Clientes;