
'use client'

import Header from "../componentes/header"
import styles from "./page.module.css"

export default function ListAlunos() {
    return (
        <>
            <Header />

            <main className={styles.container}>

                <div className={styles.card}>

                    <h2>Lista de alunos</h2>

                    <p className={styles.subtitulo}>
                        Alunos cadastrados no sistema
                    </p>

                    <div className={styles.tabelaContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Idade</th>
                                    <th>Série</th>
                                    <th>RA</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>12</td>
                                    <td>Heitor Degan</td>
                                    <td>18</td>
                                    <td>3B</td>
                                    <td>3155</td>

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

