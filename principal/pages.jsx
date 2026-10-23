import Link from "next/link";
import styles from "../page.module.css";

export default function CadastroAlunos() {
  return (
    <main className={styles.formPage}>

      <div className={styles.formHeader}>
        <Link href="/" className={styles.backButton}>
          ← Voltar
        </Link>

        <span>SESI MIRANDÓPOLIS</span>

        <h1>
          Cadastro de <strong>Alunos</strong>
        </h1>

        <p>
          Cadastre um novo aluno no sistema escolar.
        </p>
      </div>

      <div className={styles.formCard}>

        <div className={styles.formCardTop}>
          <div>
            <span className={styles.formLabel}>
              NOVO CADASTRO
            </span>

            <h2>Informações do aluno</h2>
          </div>

          <div className={styles.formNumber}>
            01
          </div>
        </div>

        <form className={styles.studentForm}>

          <div className={styles.inputGroup}>
            <label>Nome completo</label>

            <input
              type="text"
              placeholder="Digite o nome do aluno"
            />
          </div>

          <div className={styles.formRow}>

            <div className={styles.inputGroup}>
              <label>Turma</label>

              <select defaultValue="">
                <option value="" disabled>
                  Selecione a turma
                </option>

                <option>1º Ano A</option>
                <option>1º Ano B</option>
                <option>2º Ano A</option>
                <option>2º Ano B</option>
                <option>3º Ano A</option>
                <option>3º Ano B</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>E-mail</label>

              <input
                type="email"
                placeholder="aluno@email.com"
              />
            </div>

          </div>

          <div className={styles.inputGroup}>
            <label>Data de nascimento</label>

            <input type="date" />
          </div>

          <div className={styles.formActions}>

            <Link
              href="/"
              className={styles.cancelButton}
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className={styles.submitButton}
            >
              Cadastrar aluno →
            </button>

          </div>

        </form>
      </div>

      <div className={styles.formFooter}>
        <span>SESI</span>
        Sistema Escolar • Mirandópolis
      </div>

    </main>
  );
}