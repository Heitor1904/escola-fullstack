'use client'

import Header from "../componentes/header"
import styles from "./page.module.css"

export default function ListNotas() {

    return (
        <>
            <Header />

            <main className={styles.container}>

                <div className={styles.card}>

                    <h2>Lista de Notas</h2>

                    <p className={styles.subtitulo}>
                        Notas cadastradas dos alunos
                    </p>

                    <div className={styles.tabelaContainer}>

                        <table>

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Aluno</th>
                                    <th>Matéria</th>
                                    <th>Nota 1</th>
                                    <th>Nota 2</th>
                                    <th>Média</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>1</td>
                                    <td>Heitor Degan</td>
                                    <td>Matemática</td>
                                    <td>8,0</td>
                                    <td>9,0</td>
                                    <td>8,5</td>

                                    <td className={styles.acoes}>

                                        <button className={styles.editar}>
                                            Editar
                                        </button>

                                        <button className={styles.deletar}>
                                            Deletar
                                        </button>

                                    </td>
                                </tr>

                                <tr>
                                    <td>2</td>
                                    <td>João Silva</td>
                                    <td>Português</td>
                                    <td>7,0</td>
                                    <td>8,0</td>
                                    <td>7,5</td>

                                    <td className={styles.acoes}>

                                        <button className={styles.editar}>
                                            Editar
                                        </button>

                                        <button className={styles.deletar}>
                                            Deletar
                                        </button>

                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </main>
        </>
    )
}

