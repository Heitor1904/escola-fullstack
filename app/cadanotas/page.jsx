
'use client'

import { useState } from "react"
import Header from "../componentes/header"
import styles from "./page.module.css"

export default function CadNotas() {

    const [aluno, setAluno] = useState('')
    const [materia, setMateria] = useState('')
    const [nota1, setNota1] = useState('')
    const [nota2, setNota2] = useState('')

    function salvarNota(e) {
        e.preventDefault()

        alert("Nota cadastrada com sucesso!")

        setAluno('')
        setMateria('')
        setNota1('')
        setNota2('')
    }

    return (
        <>
            <Header />

            <main className={styles.container}>

                <div className={styles.card}>

                    <h2>Cadastro de Notas</h2>

                    <p className={styles.subtitulo}>
                        Preencha os dados da nota do aluno
                    </p>

                    <form onSubmit={salvarNota}>

                        <div className={styles.campo}>
                            <label htmlFor="aluno">
                                Aluno
                            </label>

                            <input
                                id="aluno"
                                type="text"
                                placeholder="Digite o nome do aluno"
                                value={aluno}
                                onChange={(e) => setAluno(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="materia">
                                Matéria
                            </label>

                            <input
                                id="materia"
                                type="text"
                                placeholder="Digite a matéria"
                                value={materia}
                                onChange={(e) => setMateria(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.linha}>

                            <div className={styles.campo}>
                                <label htmlFor="nota1">
                                    Nota 1
                                </label>

                                <input
                                    id="nota1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="0 a 10"
                                    value={nota1}
                                    onChange={(e) => setNota1(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="nota2">
                                    Nota 2
                                </label>

                                <input
                                    id="nota2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="0 a 10"
                                    value={nota2}
                                    onChange={(e) => setNota2(e.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        <button type="submit">
                            Salvar nota
                        </button>

                    </form>

                </div>

            </main>
        </>
    )
}

