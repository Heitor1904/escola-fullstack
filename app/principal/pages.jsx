import Link from "next/link";
import styles from "../page.module.css";

const noticias = [
  {
    categoria: "EDUCAÇÃO",
    titulo: "SESI promove novas atividades para os alunos",
    texto:
      "Confira as novidades e projetos que estão acontecendo na escola.",
    data: "01 SET 2026",
    imagem:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
  },
  {
    categoria: "ESPORTES",
    titulo: "Alunos participam de atividades esportivas",
    texto:
      "Esporte, integração e aprendizado fazem parte da rotina escolar.",
    data: "28 AGO 2026",
    imagem:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80",
  },
  {
    categoria: "PROJETOS",
    titulo: "Projetos escolares incentivam criatividade",
    texto:
      "Conheça alguns dos projetos desenvolvidos pelos estudantes.",
    data: "25 AGO 2026",
    imagem:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function Principal() {
  return (
    <main className={styles.page}>

      {/* ================= HERO ================= */}
      <section className={styles.hero}>

        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>

          <span className={styles.heroTag}>
            SESI MIRANDÓPOLIS • SISTEMA ESCOLAR
          </span>

          <h1>
            Educação que
            <br />
            <strong>transforma.</strong>
          </h1>

          <p>
            Bem-vindo ao Sistema Escolar SESI Mirandópolis.
            Gerencie alunos, notas e informações acadêmicas
            de forma simples e organizada.
          </p>

          <div className={styles.heroButtons}>

            <Link
              href="/cadalunos"
              className={styles.primaryButton}
            >
              Acessar sistema
              <span>→</span>
            </Link>

            <a
              href="#noticias"
              className={styles.secondaryButton}
            >
              Ver novidades
            </a>

          </div>

        </div>

        {/* CARD DO SISTEMA */}
        <div className={styles.heroRight}>

          <div className={styles.heroShape}></div>

          <div className={styles.portalCard}>

            <div className={styles.portalHeader}>

              <div className={styles.portalLogo}>
                SESI
              </div>

              <span className={styles.status}>
                <i></i>
                Sistema online
              </span>

            </div>

            <div className={styles.portalIcon}>
              🎓
            </div>

            <span className={styles.portalSmall}>
              PORTAL ESCOLAR
            </span>

            <h2>
              SESI Mirandópolis
            </h2>

            <p>
              Sistema de gerenciamento escolar
            </p>

            <div className={styles.portalLine}></div>

            <div className={styles.portalInfo}>
              <span>Alunos cadastrados</span>
              <strong>✓</strong>
            </div>

            <div className={styles.portalInfo}>
              <span>Controle de notas</span>
              <strong>✓</strong>
            </div>

          </div>

        </div>

        <div className={styles.scrollText}>
          SCROLL ↓
        </div>

      </section>


      {/* ================= NÚMEROS ================= */}
      <section className={styles.numbers}>

        <div className={styles.numberItem}>
          <strong>01</strong>
          <span>
            Cadastro
            <br />
            de alunos
          </span>
        </div>

        <div className={styles.numberItem}>
          <strong>02</strong>
          <span>
            Controle
            <br />
            de notas
          </span>
        </div>

        <div className={styles.numberItem}>
          <strong>03</strong>
          <span>
            Informações
            <br />
            escolares
          </span>
        </div>

        <div className={styles.numberItem}>
          <strong>04</strong>
          <span>
            Acesso
            <br />
            rápido
          </span>
        </div>

      </section>


      {/* ================= NOTÍCIAS ================= */}
      <section
        id="noticias"
        className={styles.news}
      >

        <div className={styles.sectionTop}>

          <div>

            <span className={styles.sectionLabel}>
              ━ NOTÍCIAS
            </span>

            <h2>
              Novidades do SESI
            </h2>

            <p>
              Fique por dentro das principais notícias
              e acontecimentos da nossa escola.
            </p>

          </div>

          <span className={styles.newsCounter}>
            03 / NOTÍCIAS
          </span>

        </div>


        <div className={styles.newsGrid}>

          {noticias.map((noticia, index) => (

            <article
              key={index}
              className={styles.newsCard}
            >

              <div
                className={styles.newsImage}
                style={{
                  backgroundImage: `url(${noticia.imagem})`,
                }}
              >

                <span>
                  {noticia.categoria}
                </span>

              </div>


              <div className={styles.newsBody}>

                <small>
                  {noticia.data}
                </small>

                <h3>
                  {noticia.titulo}
                </h3>

                <p>
                  {noticia.texto}
                </p>

                <a href="#noticias">
                  Ler notícia →
                </a>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* ================= SISTEMA ================= */}
      <section className={styles.system}>

        <div className={styles.systemTitle}>

          <span className={styles.sectionLabel}>
            ━ SISTEMA ESCOLAR
          </span>

          <h2>
            Tudo em um só lugar.
          </h2>

          <p>
            Acesse rapidamente as principais funções
            do sistema do SESI Mirandópolis.
          </p>

        </div>


        <div className={styles.systemGrid}>

          <Link
            href="/cadalunos"
            className={styles.systemCard}
          >

            <span className={styles.systemNumber}>
              01
            </span>

            <span className={styles.systemIcon}>
              👨‍🎓
            </span>

            <h3>
              Cadastrar alunos
            </h3>

            <p>
              Adicione novos alunos ao sistema escolar.
            </p>

            <strong>
              Acessar →
            </strong>

          </Link>


          <Link
            href="/listalunos"
            className={styles.systemCard}
          >

            <span className={styles.systemNumber}>
              02
            </span>

            <span className={styles.systemIcon}>
              📋
            </span>

            <h3>
              Lista de alunos
            </h3>

            <p>
              Consulte os alunos cadastrados.
            </p>

            <strong>
              Acessar →
            </strong>

          </Link>


          <Link
            href="/cadanotas"
            className={styles.systemCard}
          >

            <span className={styles.systemNumber}>
              03
            </span>

            <span className={styles.systemIcon}>
              📝
            </span>

            <h3>
              Cadastrar notas
            </h3>

            <p>
              Registre e organize as notas dos alunos.
            </p>

            <strong>
              Acessar →
            </strong>

          </Link>


          <Link
            href="/listanotas"
            className={styles.systemCard}
          >

            <span className={styles.systemNumber}>
              04
            </span>

            <span className={styles.systemIcon}>
              📊
            </span>

            <h3>
              Lista de notas
            </h3>

            <p>
              Consulte as notas registradas.
            </p>

            <strong>
              Acessar →
            </strong>

          </Link>

        </div>

      </section>


      {/* ================= SOBRE ================= */}
      <section className={styles.about}>

        <div className={styles.aboutRed}></div>

        <div className={styles.aboutContent}>

          <span className={styles.sectionLabel}>
            ━ SESI MIRANDÓPOLIS
          </span>

          <h2>
            Aprender.
            <br />
            Criar.
            <br />
            <strong>Transformar.</strong>
          </h2>

        </div>


        <div className={styles.aboutText}>

          <p>
            O SESI busca proporcionar uma educação
            que prepara os alunos para os desafios
            do futuro.
          </p>

          <p>
            Este sistema foi desenvolvido para
            facilitar a organização das informações
            escolares.
          </p>

          <Link href="/cadalunos">
            Entrar no sistema →
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className={styles.footer}>

        <div className={styles.footerBrand}>

          <span>
            SESI
          </span>

          <div>

            <strong>
              SESI Mirandópolis
            </strong>

            <small>
              Sistema Escolar
            </small>

          </div>

        </div>


        <div className={styles.footerLinks}>

          <Link href="/">
            Início
          </Link>

          <Link href="/cadalunos">
            Alunos
          </Link>

          <Link href="/cadanotas">
            Notas
          </Link>

          <a href="#noticias">
            Notícias
          </a>

        </div>


        <p>
          © 2026 SESI Mirandópolis
        </p>

      </footer>

    </main>
  );
}