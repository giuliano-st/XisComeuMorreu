import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClienteDados } from "../hooks/useClienteDados";
import { useClienteMutate } from "../hooks/useClienteMutate";
import { Navbar } from "../componentes/layout/Navbar.tsx";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [isModalAberto, setIsModalAberto] = useState(false);
    const [novoNome, setNovoNome] = useState("");
    const [novoEmail, setNovoEmail] = useState("");
    const [novoEndereco, setNovoEndereco] = useState("");
    const [novaPreferencia, setNovaPreferencia] = useState("");

    const { data: clientes } = useClienteDados();
    const { mutate: salvarCliente } = useClienteMutate();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (
            email.toLowerCase() === "admin@email.com" &&
            senha === "admin"
        ) {
            localStorage.setItem("tipoUsuario", "admin");
            localStorage.setItem(
                "usuario",
                JSON.stringify({
                    nome: "Administrador",
                    email: "admin@email.com",
                })
            );

            alert("Bem-vindo, Administrador!");
            navigate("/menu");
            return;
        }

        const cliente = clientes?.find(
            (c) => c.email.toLowerCase() === email.toLowerCase()
        );

        if (!cliente) {
            alert("E-mail não encontrado. Cadastre-se primeiro!");
            return;
        }

        localStorage.setItem("tipoUsuario", "cliente");
        localStorage.setItem("usuario", JSON.stringify(cliente));

        alert(`Bem-vindo, ${cliente.nome}!`);

        navigate("/cardapio");
    };

    const handleCadastrarCliente = (e: React.FormEvent) => {
        e.preventDefault();

        if (!novoNome || !novoEmail || !novoEndereco || !novaPreferencia) {
            return alert("Por favor, preencha todos os campos!");
        }

        const jaExiste = clientes?.some((c) => c.email.toLowerCase() === novoEmail.toLowerCase());
        if (jaExiste) return alert("Este e-mail já está cadastrado!");

        salvarCliente({
            nome: novoNome,
            email: novoEmail,
            enderecoEntrega: novoEndereco,
            preferenciaPagamento: novaPreferencia
        });

        alert("Cadastro realizado com sucesso!");

        setNovoNome("");
        setNovoEmail("");
        setNovoEndereco("");
        setNovaPreferencia("");

        setEmail(novoEmail);
        setSenha("");

        setIsModalAberto(false);
    };

    return (
        <>
            <Navbar />
            <main className="login-container">
                <div className="login-overlay-main">
                    <div className="login-modal-main">
                        <h2>Acessar o Sistema</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="formulario-login-container">
                                <div>
                                    <label htmlFor="email" className="form-group-label">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="seu-email@restaurante.com"
                                        required
                                        className="form-input-field"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="senha" className="form-group-label">
                                        Senha
                                    </label>
                                    <input
                                        type="password"
                                        id="senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder="Sua senha"
                                        required
                                        className="form-input-field"
                                    />
                                </div>
                            </div>

                            <div className="login-botoes-container">
                                <button type="submit" className="btn-entrar-submit">
                                    Entrar
                                </button>
                                <button type="button" className="btn-cancelar" onClick={() => navigate("/")}>
                                    Voltar para o Menu
                                </button>
                            </div>
                        </form>

                        <div className="cadastro-link-container">
                            Não tem uma conta?{" "}
                            <button
                                type="button"
                                onClick={() => setIsModalAberto(true)}
                                className="btn-link-cadastro"
                            >
                                Cadastre-se aqui
                            </button>
                        </div>
                    </div>
                </div>

                {isModalAberto && (
                    <div className="modal-cadastro-overlay">
                        <div className="modal-cadastro-content">
                            <h2>Criar Nova Conta</h2>
                            <form onSubmit={handleCadastrarCliente} className="form-cadastro-flex">

                                <div>
                                    <label className="form-group-label">Nome</label>
                                    <input
                                        type="text"
                                        value={novoNome}
                                        onChange={(e) => setNovoNome(e.target.value)}
                                        placeholder="Seu nome completo"
                                        required
                                        className="form-input-field"
                                    />
                                </div>

                                <div>
                                    <label className="form-group-label">E-mail</label>
                                    <input
                                        type="email"
                                        value={novoEmail}
                                        onChange={(e) => setNovoEmail(e.target.value)}
                                        placeholder="seu-email@exemplo.com"
                                        required
                                        className="form-input-field"
                                    />
                                </div>

                                <div>
                                    <label className="form-group-label">Endereço de Entrega</label>
                                    <input
                                        type="text"
                                        value={novoEndereco}
                                        onChange={(e) => setNovoEndereco(e.target.value)}
                                        placeholder="Rua, Número, Bairro"
                                        required
                                        className="form-input-field"
                                    />
                                </div>

                                <div>
                                    <label className="form-group-label">Preferência de Pagamento</label>
                                    <select
                                        value={novaPreferencia}
                                        onChange={(e) => setNovaPreferencia(e.target.value)}
                                        required
                                        className="form-select-field"
                                    >
                                        <option value="">Selecione uma opção</option>
                                        <option value="Cartão de Crédito">Cartão de Crédito</option>
                                        <option value="Cartão de Débito">Cartão de Débito</option>
                                        <option value="Pix">Pix</option>
                                        <option value="Dinheiro">Dinheiro</option>
                                    </select>
                                </div>

                                <div className="botoes-modal-flex">
                                    <button type="submit" className="btn-cadastrar-submit">
                                        Cadastrar
                                    </button>
                                    <button type="button" onClick={() => setIsModalAberto(false)} className="btn-cadastrar-cancelar">
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Login;