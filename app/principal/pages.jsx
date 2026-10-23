'use client';

import Link from "next/link";
import Header from "../componentes/header";
import styles from "../page.module.css";

const LOGO_SESI =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBHJ35WRfnrhqIeXTdgwQxFSQUtuB4KRrztlcGDdCchQ&s";

const atalhos = [
  {
    numero: "01",
    titulo: "Cadastrar alunos",
    descricao:
      "Cadastre novos estudantes e mantenha os dados escolares organizados.",
    href: "/cadalunos",
    icone: "＋",
    tipo: "Cadastro",
  },
  {
    numero: "02",
    titulo: "Lista de alunos",
    descricao:
      "Consulte os registros e acesse as opções de edição e exclusão.",
    href: "/listalunos",
    icone: "☷",
    tipo: "Consulta",
  },
  {
    numero: "03",
    titulo: "Cadastrar notas",
    descricao:
      "Registre as avaliações e mantenha o desempenho acadêmico atualizado.",
    href: "/cadanotas",
    icone: "✎",
    tipo: "Acadêmico",
  },
  {
    numero: "04",
    titulo: "Lista de notas",
    descricao:
      "Visualize as notas registradas e gerencie as informações das avaliações.",
    href: "/listanotas",
    icone: "▤",
    tipo: "Consulta",
  },
];

const destaques = [
  {
    categoria: "APRENDIZAGEM",
    titulo: "Educação que abre caminhos",
    texto:
      "Um ambiente para organizar informações e apoiar a rotina escolar.",
    imagem:
      "https://cronos-media.sesisenaisp.org.br//api/media/1-0/files?img=img_65_220204_c679685f-4045-497c-b43c-27db08f95f47_o.jpg",
    alt: "Alunos em atividade escolar do SESI-SP",
  },
  {
    categoria: "COLABORAÇÃO",
    titulo: "Conhecimento construído em conjunto",
    texto:
      "A escola é feita de participação, troca de experiências e novas ideias.",
    imagem:
      "https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/jpl_Ru9Z8dd.jpg",
    alt: "Estudantes em ambiente escolar",
  },
  {
    categoria: "TECNOLOGIA",
    titulo: "Organização para o dia a dia",
    texto: "Acesse os recursos principais do sistema em poucos cliques.",
    imagem:
      "https://cronos-media.sesisenaisp.org.br/api/media/1-0/files?img=img_65_240822_8c4a91d5-dc6a-4f2c-b370-2194aa26abbf_o.jpg&tipo=p",
    alt: "Alunos em atividade tecnológica do SESI-SP",
  },
];

export default function Principal() {
  return (
    <>
      {/* CABEÇALHO ÚNICO DO SISTEMA */}
      <Header />

      <main className={styles.page}>
        {/* DESTAQUE PRINCIPAL */}
        <section className={styles.hero} id="inicio">
          <div className={styles.heroImage} aria-hidden="true" />
          <div className={styles.heroShade} aria-hidden="true" />

          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              PORTAL DE GESTÃO ESCOLAR
            </span>

            <h1>
              Organização escolar.
              <br />
              <span>Mais simples.</span>
            </h1>

            <p>
              Bem-vindo ao Sistema Escolar do SESI Mirandópolis. Um espaço
              prático para cadastrar alunos, organizar notas e consultar
              informações acadêmicas.
            </p>

            <div className={styles.heroActions}>
              <Link href="#recursos" className={styles.buttonPrimary}>
                Explorar recursos <span aria-hidden="true">→</span>
              </Link>

              <Link href="/listalunos" className={styles.buttonSecondary}>
                Consultar alunos
              </Link>
            </div>

            <div className={styles.heroFootnote}>
              <span className={styles.statusDot} />
              <span>Ferramentas escolares em um só lugar</span>
            </div>
          </div>

          {/* PAINEL DE ACESSO RÁPIDO */}
          <div className={styles.heroPanel}>
            <div className={styles.panelTop}>
              <div>
                <span className={styles.panelKicker}>ÁREA DE GESTÃO</span>
                <h2>O que você precisa hoje?</h2>
              </div>

              <img
                src={LOGO_SESI}
                alt="Logo do SESI"
                className={styles.panelSymbol}
              />
            </div>

            <Link href="/cadalunos" className={styles.panelLink}>
              <span className={styles.panelIcon}>＋</span>
              <span>
                <strong>Novo aluno</strong>
                <small>Adicionar cadastro</small>
              </span>
              <span className={styles.panelArrow}>↗</span>
            </Link>

            <Link href="/listalunos" className={styles.panelLink}>
              <span className={styles.panelIcon}>☷</span>
              <span>
                <strong>Consultar alunos</strong>
                <small>Ver registros existentes</small>
              </span>
              <span className={styles.panelArrow}>↗</span>
            </Link>

            <Link href="/cadanotas" className={styles.panelLink}>
              <span className={styles.panelIcon}>✎</span>
              <span>
                <strong>Registrar notas</strong>
                <small>Atualizar informações acadêmicas</small>
              </span>
              <span className={styles.panelArrow}>↗</span>
            </Link>

            <Link href="/listanotas" className={styles.panelLink}>
              <span className={styles.panelIcon}>▤</span>
              <span>
                <strong>Consultar notas</strong>
                <small>Visualizar avaliações</small>
              </span>
              <span className={styles.panelArrow}>↗</span>
            </Link>
          </div>

          <a href="#recursos" className={styles.scrollHint}>
            <span />
            ROLE PARA EXPLORAR
          </a>
        </section>

        {/* RESUMO DOS RECURSOS */}
        <section className={styles.quickBar}>
          <div className={styles.quickItem}>
            <span className={styles.quickNumber}>01</span>
            <div>
              <strong>Cadastro</strong>
              <small>Dados dos alunos</small>
            </div>
          </div>

          <div className={styles.quickItem}>
            <span className={styles.quickNumber}>02</span>
            <div>
              <strong>Consulta</strong>
              <small>Registros organizados</small>
            </div>
          </div>

          <div className={styles.quickItem}>
            <span className={styles.quickNumber}>03</span>
            <div>
              <strong>Avaliações</strong>
              <small>Controle de notas</small>
            </div>
          </div>

          <div className={styles.quickItem}>
            <span className={styles.quickNumber}>04</span>
            <div>
              <strong>Praticidade</strong>
              <small>Acesso direto</small>
            </div>
          </div>
        </section>

        {/* RECURSOS DO SISTEMA */}
        <section className={styles.resources} id="recursos">
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionEyebrow}>
                FERRAMENTAS DO PORTAL
              </span>

              <h2>O que você deseja fazer?</h2>

              <p>
                Escolha uma opção para acessar diretamente a área desejada.
              </p>
            </div>

            <span className={styles.sectionCount}>04 RECURSOS</span>
          </div>

          <div className={styles.resourceGrid}>
            {atalhos.map((item) => (
              <Link
                href={item.href}
                className={styles.resourceCard}
                key={item.numero}
              >
                <div className={styles.resourceCardTop}>
                  <span className={styles.resourceIcon}>{item.icone}</span>
                  <span className={styles.resourceNumber}>{item.numero}</span>
                </div>

                <span className={styles.resourceType}>{item.tipo}</span>
                <h3>{item.titulo}</h3>
                <p>{item.descricao}</p>

                <span className={styles.resourceLink}>
                  Acessar recurso <span aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* EDUCAÇÃO EM FOCO */}
        <section className={styles.highlights}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionEyebrow}>
                EDUCAÇÃO EM FOCO
              </span>

              <h2>Aprender, compartilhar, evoluir.</h2>

              <p>
                Uma experiência escolar construída com conhecimento e
                colaboração.
              </p>
            </div>
          </div>

          <div className={styles.highlightGrid}>
            {destaques.map((item) => (
              <article
                className={styles.highlightCard}
                key={item.categoria}
              >
                <div className={styles.highlightImageWrap}>
                  <img
                    src={item.imagem}
                    alt={item.alt}
                    className={styles.highlightImage}
                  />

                  <span className={styles.highlightCategory}>
                    {item.categoria}
                  </span>
                </div>

                <div className={styles.highlightBody}>
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </div>
              </article>
            ))}
          </div>

          <p className={styles.imageNote}>
            Imagens ilustrativas do SESI-SP.
          </p>
        </section>

        {/* SOBRE O SISTEMA */}
        <section className={styles.about} id="sobre">
          <div className={styles.aboutVisual}>
            <img
              src="https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/jpl_Ru9Z8dd.jpg"
              alt="Estudantes em ambiente escolar"
            />

            <div className={styles.aboutImageLabel}>
              <img
                src={LOGO_SESI}
                alt="Logo do SESI"
                className={styles.aboutLogo}
              />

              <div>
                <strong>Conhecimento que transforma</strong>
                <small>Sistema Escolar • Mirandópolis</small>
              </div>
            </div>
          </div>

          <div className={styles.aboutContent}>
            <span className={styles.sectionEyebrow}>
              SOBRE A PLATAFORMA
            </span>

            <h2>
              Uma rotina escolar mais <span>organizada.</span>
            </h2>

            <p>
              Este sistema foi desenvolvido como uma ferramenta de apoio à
              organização das informações escolares, reunindo em um só lugar
              os cadastros de alunos e o controle de notas.
            </p>

            <p>
              Use os atalhos para consultar registros ou realizar cadastros
              com mais praticidade.
            </p>

            <Link href="/cadalunos" className={styles.buttonPrimary}>
              Começar agora <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* RODAPÉ */}
        <footer className={styles.footer}>
          <div className={styles.footerMain}>
            <Link href="/" className={styles.brand}>
              <img
                src={LOGO_SESI}
                alt="Logo do SESI"
                className={styles.brandMark}
              />

              <span className={styles.brandText}>
                <strong>SESI MIRANDÓPOLIS</strong>
                <small>Sistema Escolar</small>
              </span>
            </Link>

            <p>Gestão escolar simples, prática e organizada.</p>
          </div>

          <nav className={styles.footerLinks} aria-label="Links do rodapé">
            <Link href="/">Início</Link>
            <Link href="/cadalunos">Cadastrar alunos</Link>
            <Link href="/listalunos">Lista de alunos</Link>
            <Link href="/cadanotas">Cadastrar notas</Link>
            <Link href="/listanotas">Lista de notas</Link>
          </nav>

          <div className={styles.footerBottom}>
            <span>© {new Date().getFullYear()} SESI Mirandópolis</span>
            <span>Portal de gestão escolar</span>
          </div>
        </footer>
      </main>
    </>
  );
}