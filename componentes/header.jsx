
import Link from "next/link";

export default function Header() {
    return (
        <header>
            <h1>Sistema Escolar - SESI</h1>

            <nav>
                <ul>
                    <li><Link href="/">Início</Link></li>
                    <li><Link href="/cadalunos">Cadastro - Alunos</Link></li>
                    <li><Link href="/listalunos">Lista - Alunos</Link></li>
                    <li><Link href="/cadanotas">Cadastro - Notas</Link></li>
                    <li><Link href="/listanotas">Lista - Notas</Link></li>
                </ul>
            </nav>

            <Link
                href="/login"
                style={{
                    backgroundColor: "#e30613",
                    color: "white",
                    padding: "12px 25px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: "bold"
                }}
            >
                👤 LOGIN →
            </Link>
        </header>
    );
}
