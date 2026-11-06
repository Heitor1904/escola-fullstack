
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../componentes/header";
import styles from "./page.module.css";

export default function CadNotas() {
    const router = useRouter();

    const [aluno_id, setAlunoId] = useState("");
    const [alunos, setAlunos] = useState([]);

    const [t1, setT1] = useState("");
    const [t2, setT2] = useState("");
    const [n1, setN1] = useState("");
    const [n2, setN2] = useState("");
    const [n3, setN3] = useState("");

    const [idNotas, setIdNotas] = useState(null);
    const [editando, setEditando] = useState(false);

    // Buscar alunos cadastrados
    async function carregarAlunos() {
        try {
            let resposta = await fetch("/api/alunos");
            const dados = await resposta.json();

            if (resposta.ok && Array.isArray(dados)) {
                setAlunos(dados);
            } else {
                setAlunos([]);
                console.error("Não foi possível carregar os alunos:", dados);
            }
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
        }
    }

    // Carregar alunos e verificar se existe uma nota para editar
    useEffect(() => {
        carregarAlunos();

        const notaSalva = localStorage.getItem("notaEditar");

        if (notaSalva) {
            try {
                const nota = JSON.parse(notaSalva);

                setIdNotas(nota.id_notas);
                setAlunoId(String(nota.aluno_id ?? nota.id_aluno ?? ""));
                setT1(String(nota.t1 ?? ""));
                setT2(String(nota.t2 ?? ""));
                setN1(String(nota.n1 ?? ""));
                setN2(String(nota.n2 ?? ""));
                setN3(String(nota.n3 ?? ""));
                setEditando(true);

                localStorage.removeItem("notaEditar");
            } catch (error) {
                console.error("Erro ao carregar nota para edição:", error);
            }
        }
    }, []);

    // Limpar formulário
    function limparFormulario() {
        setAlunoId("");
        setT1("");
        setT2("");
        setN1("");
        setN2("");
        setN3("");
        setIdNotas(null);
        setEditando(false);
    }

    // Cadastrar ou atualizar notas
    async function salvarNota(event) {
        event.preventDefault();

        if (!aluno_id) {
            alert("Selecione um aluno.");
            return;
        }

        try {
            const notas = {
                aluno_id: Number(aluno_id),
                t1: Number(t1),
                t2: Number(t2),
                n1: Number(n1),
                n2: Number(n2),
                n3: Number(n3),
            };

            const resposta = await fetch("/api/notas", {
                method: editando ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    editando
                        ? { ...notas, id_notas: idNotas }
                        : notas
                ),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(
                    dados.mensagem ||
                    dados.erro ||
                    "Erro ao salvar as notas."
                );
                return;
            }

            alert(
                editando
                    ? "Notas atualizadas com sucesso!"
                    : "Notas cadastradas com sucesso!"
            );

            limparFormulario();
            router.push("/listanotas");
        } catch (error) {
            console.error("Erro ao salvar notas:", error);
            alert("Erro de conexão ao salvar as notas.");
        }
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.card}>
                    <p className={styles.status}>SISTEMA ONLINE</p>

                    <h2>
                        {editando ? "Editar Notas" : "Cadastro de Notas"}
                    </h2>

                    <p className={styles.subtitulo}>
                        Preencha as notas do aluno no sistema.
                    </p>

                    <form
                        className={styles.form}
                        onSubmit={salvarNota}
                    >
                        <div className={styles.campo}>
                            <label htmlFor="aluno_id">Aluno</label>

                            <select
                                id="aluno_id"
                                value={aluno_id}
                                onChange={(e) => setAlunoId(e.target.value)}
                                required
                            >
                                <option value="">
                                    Selecione um aluno
                                </option>

                                {alunos.map((aluno) => (
                                    <option
                                        key={aluno.id_aluno}
                                        value={aluno.id_aluno}
                                    >
                                        {aluno.nome}
                                        {aluno.ra ? ` - RA ${aluno.ra}` : ""}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.linha}>
                            <div className={styles.campo}>
                                <label htmlFor="t1">Trabalho 1 (T1)</label>
                                <input
                                    id="t1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={t1}
                                    onChange={(e) => setT1(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="t2">Trabalho 2 (T2)</label>
                                <input
                                    id="t2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={t2}
                                    onChange={(e) => setT2(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.linha}>
                            <div className={styles.campo}>
                                <label htmlFor="n1">Nota 1 (N1)</label>
                                <input
                                    id="n1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={n1}
                                    onChange={(e) => setN1(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="n2">Nota 2 (N2)</label>
                                <input
                                    id="n2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={n2}
                                    onChange={(e) => setN2(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="n3">Nota 3 (N3)</label>
                            <input
                                id="n3"
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={n3}
                                onChange={(e) => setN3(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.botao}
                        >
                            {editando ? "Atualizar Notas" : "Cadastrar Notas"}
                        </button>

                        {editando && (
                            <button
                                type="button"
                                onClick={limparFormulario}
                            >
                                Cancelar edição
                            </button>
                        )}
                    </form>
                </div>
            </main>
        </>
    );
}
