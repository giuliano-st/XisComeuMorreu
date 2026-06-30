import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.mainFooter}>
            <div className={styles.footerContainer}>

                <div className={styles.footerSection}>
                    <h3>Xis Comeu Morreu</h3>
                    <p>
                        O verdadeiro xis gaúcho, onde o sabor é de matar!
                        Desde 1998 servindo o maior (e mais perigoso) xis da região.
                    </p>
                </div>

                <div className={styles.footerSection}>
                    <h3>Onde Nos Encontrar</h3>
                    <p>📍 Avenida da Azia, nº 666</p>
                    <p>Bairro Estômago de Ferro</p>
                    <p>Porto Alegre - RS | CEP: 90000-000</p>
                </div>

                <div className={styles.footerSection}>
                    <h3>Siga a Fome</h3>
                    <div className={styles.socialLinks}>
                        <p>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                📸 Instagram: @xiscomeumorreu
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                📘 Facebook: /xiscomeumorreu
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://wa.me/5551999996666"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                🏍️ WhatsApp: (51) 99999-6666
                            </a>
                        </p>
                    </div>
                </div>

            </div>

            <div className={styles.footerBottom}>
                <p>
                    &copy; 2026 Xis Comeu Morreu - Todos os direitos reservados.
                    Se sobreviver, volte sempre!
                </p>
            </div>
        </footer>
    );
}

export default Footer;