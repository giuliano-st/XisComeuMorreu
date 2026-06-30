import { Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Pedidos from "./pages/Pedidos";
import Clientes from "./pages/Clientes.tsx";
import {FormularioProduto} from "./componentes/FormularioProduto.tsx";
import CardapioCliente from "./pages/CardapioCliente.tsx";
import MeusPedidos from "./pages/MeusPedidos.tsx";
import Menu from "./pages/Menu.tsx";

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Login/>} />

            <Route path="/menu" element={<Menu/>} />

            <Route path="/cardapio" element={<CardapioCliente />} />

            <Route path="/login" element={<Login />} />

            <Route path="/pedidos" element={<Pedidos />} />

            <Route path="/clientes" element={<Clientes />} />

            <Route path="/meus-pedidos" element={<MeusPedidos/>} />

            <Route path="/testes" element={<FormularioProduto />} />
        </Routes>
    );
};

export default AppRoutes;