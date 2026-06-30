import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {

    const navigate = useNavigate();
    const tipoUsuario = localStorage.getItem("tipoUsuario");
    const usuarioRaw = localStorage.getItem("usuario");
    const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;

    const logout = () => {
        localStorage.removeItem("usuario");
        navigate("/");
    };

    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <img src="./src/assets/logo_small.png" alt="logo" />
                <h2>Xis Comeu Morreu</h2>
            </div>

            <ul className="navbar-links">

                {tipoUsuario === "cliente" && (
                    <>
                        <li>
                            <Link className="btn-nav" to="/cardapio">
                                Cardápio
                            </Link>
                        </li>

                        <li>
                            <Link className="btn-nav" to="/meus-pedidos">
                                Meus Pedidos
                            </Link>
                        </li>
                    </>
                )}

                {tipoUsuario === "admin" && (
                    <>
                        <li>
                            <Link className="btn-nav" to="/menu">
                                Produtos
                            </Link>
                        </li>

                        <li>
                            <Link className="btn-nav" to="/pedidos">
                                Pedidos
                            </Link>
                        </li>
                    </>
                )}

            </ul>

            <div className="navbar-usuario">

                <span>
                    Olá, {usuario?.nome}
                </span>

                <button
                    className="btn-nav btn-sair"
                    onClick={logout}
                >
                    Sair
                </button>

            </div>

        </nav>
    );
}