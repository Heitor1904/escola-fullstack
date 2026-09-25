'use client'

import { useState } from "react"
import Header from "../componentes/header"
import styles from "./page.module.css"

export default function CadNotas() {

    const [nomeAluno, setNomeAluno] = useState("")
    const [t1, setT1] = useState("")
    const [t2, setT2] = useState("")
    const [n1, setN1] = useState("")
    const [n2, setN2] = useState("")
    const [n3, setN3] = useState("")


    async function salvarNota(e) {

        e.preventDefault()

        try {

            // Procurar os alunos cadastrados
            const respostaAlunos = await fetch("/api/alunos")

            const alunos = await respostaAlunos.json()


            // Procurar o aluno pelo nome
            const aluno = alunos.find(
                (item) =>
                    item.nome.toLowerCase() === nomeAluno.toLowerCase()
            )


            // Verificar se o aluno existe
            if (!aluno) {

                alert("Aluno não encontrado. Cadastre o aluno primeiro.")

                return
            }


            // Salvar as notas
            const resposta = await fetch("/api/notas", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    aluno_id: aluno.id_aluno,

                    t1: Number(t1),
                    t2: Number(t2),
                    n1: Number(n1),
                    n2: Number(n2),
                    n3: Number(n3)

                })

            })


            const dados = await resposta.json()


            if (!resposta.ok) {

                alert(dados.mensagem || "Erro ao cadastrar notas.")

                return
            }


            alert("Notas cadastradas com sucesso!")


            // Limpar formulário
            setNomeAluno("")
            setT1("")
            setT2("")
            setN1("")
            setN2("")
            setN3("")


        } catch (error) {

            console.error("Erro ao salvar notas:", error)

            alert("Erro ao salvar as notas.")

        }
    }


    return (

        <>

            <Header />

            <main className={styles.container}>

                <div className={styles.card}>

                    <h2>Cadastro de Notas</h2>

                    <p className={styles.subtitulo}>
                        Preencha as notas do aluno
                    </p>


                    <form onSubmit={salvarNota}>

                        {/* NOME DO ALUNO */}

                        <div className={styles.campo}>

                            <label htmlFor="nomeAluno">
                                Nome do aluno
                            </label>

                            <input
                                id="nomeAluno"
                                type="text"
                                placeholder="Digite o nome do aluno"
                                value={nomeAluno}
                                onChange={(e) =>
                                    setNomeAluno(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* T1 E T2 */}

                        <div className={styles.linha}>

                            <div className={styles.campo}>

                                <label htmlFor="t1">
                                    T1 - Trabalho 1
                                </label>

                                <input
                                    id="t1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="0 a 10"
                                    value={t1}
                                    onChange={(e) =>
                                        setT1(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className={styles.campo}>

                                <label htmlFor="t2">
                                    T2 - Trabalho 2
                                </label>

                                <input
                                    id="t2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="0 a 10"
                                    value={t2}
                                    onChange={(e) =>
                                        setT2(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* N1 E N2 */}

                        <div className={styles.linha}>

                            <div className={styles.campo}>

                                <label htmlFor="n1">
                                    N1 - Nota 1
                                </label>

                                <input
                                    id="n1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="0 a 10"
                                    value={n1}
                                    onChange={(e) =>
                                        setN1(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className={styles.campo}>

                                <label htmlFor="n2">
                                    N2 - Nota 2
                                </label>

                                <input
                                    id="n2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="0 a 10"
                                    value={n2}
                                    onChange={(e) =>
                                        setN2(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* N3 */}

                        <div className={styles.campo}>

                            <label htmlFor="n3">
                                N3 - Nota 3
                            </label>

                            <input
                                id="n3"
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                placeholder="0 a 10"
                                value={n3}
                                onChange={(e) =>
                                    setN3(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* BOTÃO */}

                        <button type="submit">
                            Salvar notas
                        </button>

                    </form>

                </div>

            </main>

        </>

    )
}