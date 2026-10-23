import Link from "next/link";

export default function Header(){
    return(
        <header>
            <h1>Sistema Escolar - SESI</h1>
            <nav>
                <ul>
                    <li><Link href='/'>Inicio</Link></li>
                    <li><Link href='/cadalunos'>Cadastro - Alunos</Link></li>
                    <li><Link href='/listalunos'>Lista - Alunos</Link></li>
                    <li><Link href='/cadanotas'>Cadastro - Notas</Link></li>
                    <li><Link href='/listanotas'>Lista - Notas</Link></li>
                </ul>
            </nav>
        </header>
    )
}