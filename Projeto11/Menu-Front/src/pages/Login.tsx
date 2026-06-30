import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClienteDados } from "../hooks/useClienteDados";
import { useClienteMutate } from "../hooks/useClienteMutate";
import { Navbar } from "../componentes/layout/Navbar.tsx";

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
            <main className="container">
                <div className="overlay" style={{ position: "relative", minHeight: "60vh", background: "none" }}>
                    <div className="modal" style={{ position: "relative", top: 0, left: 0, transform: "none", margin: "0 auto" }}>
                        <h2>Acessar o Sistema</h2>

                        <form onSubmit={handleSubmit} className="formulario-produto">
                            <div className="detalhes-info" style={{ display: "flex", flexDirection: "column", gap: "15px", textAlign: "left" }}>
                                <div>
                                    <label htmlFor="email" style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                                        E-mail:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="seu-email@restaurante.com"
                                        required
                                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="senha" style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                                        Senha:
                                    </label>
                                    <input
                                        type="password"
                                        id="senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder="Sua senha"
                                        required
                                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    />
                                </div>
                            </div>

                            <div className="botoes-alerta" style={{ marginTop: "25px" }}>
                                <button type="submit" className="btn-confirmar-delete" style={{ backgroundColor: "#2ec4b6" }}>
                                    Entrar
                                </button>
                                <button type="button" className="btn-cancelar" onClick={() => navigate("/")}>
                                    Voltar para o Menu
                                </button>
                            </div>
                        </form>

                        {/* Link para abrir o Modal de Cadastro */}
                        <div style={{ marginTop: "20px", fontSize: "14px" }}>
                            Não tem uma conta?{" "}
                            <button
                                type="button"
                                onClick={() => setIsModalAberto(true)}
                                style={{ background: "none", border: "none", color: "#2ec4b6", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}
                            >
                                Cadastre-se aqui
                            </button>
                        </div>
                    </div>
                </div>

                {isModalAberto && (
                    <div className="overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
                        <div className="modal" style={{ background: "white", padding: "30px", borderRadius: "8px", width: "90%", maxWidth: "450px", textAlign: "left" }}>
                            <h2>Criar Nova Conta</h2>
                            <form onSubmit={handleCadastrarCliente} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>

                                <div>
                                    <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Nome:</label>
                                    <input
                                        type="text"
                                        value={novoNome}
                                        onChange={(e) => setNovoNome(e.target.value)}
                                        placeholder="Seu nome completo"
                                        required
                                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>E-mail:</label>
                                    <input
                                        type="email"
                                        value={novoEmail}
                                        onChange={(e) => setNovoEmail(e.target.value)}
                                        placeholder="seu-email@exemplo.com"
                                        required
                                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Endereço de Entrega:</label>
                                    <input
                                        type="text"
                                        value={novoEndereco}
                                        onChange={(e) => setNovoEndereco(e.target.value)}
                                        placeholder="Rua, Número, Bairro"
                                        required
                                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Preferência de Pagamento:</label>
                                    <select
                                        value={novaPreferencia}
                                        onChange={(e) => setNovaPreferencia(e.target.value)}
                                        required
                                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "white" }}
                                    >
                                        <option value="">Selecione uma opção</option>
                                        <option value="Cartão de Crédito">Cartão de Crédito</option>
                                        <option value="Cartão de Débito">Cartão de Débito</option>
                                        <option value="Pix">Pix</option>
                                        <option value="Dinheiro">Dinheiro</option>
                                    </select>
                                </div>

                                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                    <button type="submit" style={{ flex: 1, padding: "10px", backgroundColor: "#2ec4b6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                                        Cadastrar
                                    </button>
                                    <button type="button" onClick={() => setIsModalAberto(false)} style={{ flex: 1, padding: "10px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
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