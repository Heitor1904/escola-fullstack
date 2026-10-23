<<<<<<< HEAD
'use client'

import { useState } from "react"
import Header from "../componentes/header"
import styles from "./page.module.css"
=======
'use client';

import { useEffect, useState } from "react";
import Header from "../componentes/header";
import styles from "./page.module.css";
>>>>>>> 6722cf1 (Atualizando projeto)

export default function CadNotas() {
    const [aluno_id, setAlunoId] = useState('');
    const [t1, setT1] = useState('');
    const [t2, setT2] = useState('');
    const [n1, setN1] = useState('');
    const [n2, setN2] = useState('');
    const [n3, setN3] = useState('');

<<<<<<< HEAD
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

=======
    const [alunos, setAlunos] = useState([]);
    const [idNotas, setIdNotas] = useState(null);
    const [editando, setEditando] = useState(false);

    // BUSCAR ALUNOS
    async function carregarAlunos() {
        try {
            let resposta = await fetch("/api/alunos/lista");
            if (!resposta.ok) {
                resposta = await fetch("/api/alunos");
            }
            const dados = await resposta.json();

            if (Array.isArray(dados)) {
                setAlunos(dados);
            } else {
                setAlunos([]);
            }
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
        }
    }

    // CARREGAR ALUNOS E VERIFICAR EDIÇÃO AO INICIAR
    useEffect(() => {
        carregarAlunos();

        const notaSalva = localStorage.getItem("notaEditar");

        if (notaSalva) {
            const nota = JSON.parse(notaSalva);

            setIdNotas(nota.id_notas);
            setAlunoId(nota.aluno_id || nota.id_aluno || '');
            setT1(nota.t1 ?? '');
            setT2(nota.t2 ?? '');
            setN1(nota.n1 ?? '');
            setN2(nota.n2 ?? '');
            setN3(nota.n3 ?? '');

            setEditando(true);
            localStorage.removeItem("notaEditar");
        }
    }, []);

    // LIMPAR FORMULÁRIO
    function limparFormulario() {
        setAlunoId('');
        setT1('');
        setT2('');
        setN1('');
        setN2('');
        setN3('');
        setIdNotas(null);
        setEditando(false);
    }

    // SALVAR OU EDITAR NOTA
    async function salvarNota(event) {
        event.preventDefault();

        if (!aluno_id) {
            alert("Selecione um aluno válido.");
            return;
        }

        try {
            let resposta;

            if (editando) {
                resposta = await fetch("/api/notas", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id_notas: idNotas,
                        aluno_id,
                        t1,
                        t2,
                        n1,
                        n2,
                        n3
                    })
                });
            } else {
                resposta = await fetch("/api/notas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        aluno_id,
                        t1,
                        t2,
                        n1,
                        n2,
                        n3
                    })
                });
            }

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem || dados.erro || "Ocorreu um erro ao processar.");
                return;
            }

            alert(editando ? "Notas atualizadas com sucesso!" : "Notas cadastradas com sucesso!");
            limparFormulario();

        } catch (error) {
            console.error("Erro ao salvar nota:", error);
            alert("Erro de conexão ao salvar a nota.");
>>>>>>> 6722cf1 (Atualizando projeto)
        }
    }


    return (

        <>

            <Header />

            <main className={styles.container}>
                <div className={styles.card}>
                    <p className={styles.status}>SISTEMA ONLINE</p>

                    <h2>{editando ? "Editar Notas" : "Cadastro de Notas"}</h2>
                    <p className={styles.subtitulo}>Preencha os dados das notas do aluno no sistema.</p>

<<<<<<< HEAD
                    <p className={styles.subtitulo}>
                        Preencha as notas do aluno
                    </p>


                    <form onSubmit={salvarNota}>
=======
                    <form className={styles.form} onSubmit={salvarNota}>
                        <div className={styles.campo}>
                            <label htmlFor="aluno_id">Aluno</label>
                            <select
                                id="aluno_id"
                                value={aluno_id}
                                onChange={(e) => setAlunoId(e.target.value)}
                                required
                            >
                                <option value="">Selecione um aluno</option>
                                {alunos.map((aluno) => (
                                    <option key={aluno.id_aluno} value={aluno.id_aluno}>
                                        {aluno.nome} {aluno.ra ? `- RA ${aluno.ra}` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
>>>>>>> 6722cf1 (Atualizando projeto)

                        {/* NOME DO ALUNO */}

                        <div className={styles.campo}>
<<<<<<< HEAD

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
=======
                            <label htmlFor="trabalho1">Trabalho 1 (T1)</label>
                            <input
                                id="trabalho1"
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                placeholder="0 a 10"
                                value={t1}
                                onChange={(e) => setT1(e.target.value)}
>>>>>>> 6722cf1 (Atualizando projeto)
                                required
                            />

                        </div>

<<<<<<< HEAD

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

=======
                        <div className={styles.campo}>
                            <label htmlFor="trabalho2">Trabalho 2 (T2)</label>
                            <input
                                id="trabalho2"
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                placeholder="0 a 10"
                                value={t2}
                                onChange={(e) => setT2(e.target.value)}
                                required
                            />
>>>>>>> 6722cf1 (Atualizando projeto)
                        </div>


                        {/* N3 */}

                        <div className={styles.campo}>
<<<<<<< HEAD

                            <label htmlFor="n3">
                                N3 - Nota 3
                            </label>

=======
                            <label htmlFor="nota1">Nota 1 (N1)</label>
>>>>>>> 6722cf1 (Atualizando projeto)
                            <input
                                id="nota1"
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                placeholder="0 a 10"
                                value={n1}
                                onChange={(e) => setN1(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="nota2">Nota 2 (N2)</label>
                            <input
                                id="nota2"
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                placeholder="0 a 10"
                                value={n2}
                                onChange={(e) => setN2(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="nota3">Nota 3 (N3)</label>
                            <input
                                id="nota3"
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

<<<<<<< HEAD

                        {/* BOTÃO */}

                        <button type="submit">
                            Salvar notas
=======
                        <button type="submit" className={styles.botao}>
                            {editando ? "Atualizar Notas" : "Cadastrar Notas"}
>>>>>>> 6722cf1 (Atualizando projeto)
                        </button>
                    </form>
                </div>
            </main>
<<<<<<< HEAD

        </>

    )
=======
        </>
    );
>>>>>>> 6722cf1 (Atualizando projeto)
}