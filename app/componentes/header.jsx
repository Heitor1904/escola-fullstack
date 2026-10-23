import Link from "next/link";

export default function Header() {
  return (
    <header className="siteHeader">
      <div className="headerInner">

        <Link href="/" className="brand">
          <span className="brandMark">SESI</span>

          <span className="brandText">
            <strong>Sistema Escolar</strong>
            <small>SESI Mirandópolis</small>
          </span>
        </Link>

        <nav className="mainNav">
          <Link href="/" className="active">
            Início
          </Link>

          <Link href="/cadalunos">
            Alunos
          </Link>

          <Link href="/cadanotas">
            Notas
          </Link>

          <Link href="/">
            Sobre
          </Link>
        </nav>

        <Link
          href="/cadalunos"
          className="headerButton"
        >
          👤 &nbsp; Acessar sistema →
        </Link>

        <button className="mobileMenu">
          ☰
        </button>

      </div>
    </header>
  );
}