interface ModalConfirmacaoProps {

    aberto: boolean;

    titulo: string;

    mensagem: string;

    textoConfirmar?: string;

    textoCancelar?: string;

    carregando?: boolean;

    onConfirmar: () => void;

    onCancelar: () => void;
}

export function ModalConfirmacao({

                                     aberto,

                                     titulo,

                                     mensagem,

                                     textoConfirmar = "Confirmar",

                                     textoCancelar = "Cancelar",

                                     carregando = false,

                                     onConfirmar,

                                     onCancelar

                                 }: ModalConfirmacaoProps) {

    if (!aberto) return null;

    return (

        <div className="overlay">

            <div className="modal">

                <h2>{titulo}</h2>

                <p>{mensagem}</p>

                <div className="botoes-alerta">

                    <button

                        className="btn-confirmar-delete"

                        onClick={onConfirmar}

                        disabled={carregando}

                    >

                        {carregando
                            ? "Processando..."
                            : textoConfirmar}

                    </button>

                    <button

                        className="btn-cancelar"

                        onClick={onCancelar}

                    >

                        {textoCancelar}

                    </button>

                </div>

            </div>

        </div>

    );
}