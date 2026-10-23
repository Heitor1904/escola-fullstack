'use client';

import { useEffect, useState, use } from "react";
import Header from "../componentes/header";
import styles from "./page.module.css";
import { useRouter, useParams, useSearchParams } from "next/navigation";

export default function EditaNotas({ params: paramsPromise }) {
    const router = useRouter();
    const routeParams = useParams();
    const searchParams = useSearchParams();

    // Captura o ID vindo de params (Promise/Next 15+), URL Route ou Query String (?id=)
    const resolvedParams = paramsPromise ? use(paramsPromise) : null;
    const id = resolvedParams?.id || routeParams?.id || searchParams?.get("id");

    const [alunos, setAlunos] = useState([]);
    const [alunoId, setAlunoId] = useState("");
    const [t1, setT1] = useState("");
    const [t2, setT2] = useState("");
    const [n1, setN1] = useState("");
    const [n2, setN2] = useState("");
    const [n3, setN3] = useState("");

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        if (!id) {
            setCarregando(false);
            return;
        }

        async function carregarDados() {
            try {
                setCarregando(true);

                // Busca lista de alunos com fallback de rotas
                let resAlunos = await fetch("/api/alunos/lista");
                if (!resAlunos.ok) {
                    resAlunos = await fetch("/api/alunos");
                }

                const resNotas = await fetch("/api/notas");

                const notas = await resNotas.json();
                const listaAlunos = await resAlunos.json();

                if (!resNotas.ok || !resAlunos.ok) {
                    throw new Error("Erro ao carregar dados");
                }

                // Localiza a nota correspondente
                const nota = Array.isArray(notas)
                    ? notas.find((item) => Number(item.id_notas) === Number(id))
                    : notas;

                if (!nota || nota.mensagem) {
                    alert("Nota não encontrada!");
                    router.push("/listanotas");
                    return;
                }

                setAlunos(Array.isArray(listaAlunos) ? listaAlunos : []);

                // Identifica o aluno associado
                const aluno = listaAlunos.find(
                    (item) => Number(item.id_aluno) === Number(nota.aluno_id)
                ) || listaAlunos.find(
                    (item) => String(item.nome).toLowerCase() === String(nota.nome).toLowerCase()
                );

                if (aluno) {
                    setAlunoId(String(aluno.id_aluno));
                }

                setT1(String(nota.t1 ?? ""));
                setT2(String(nota.t2 ?? ""));
                setN1(String(nota.n1 ?? ""));
                setN2(String(nota.n2 ?? ""));
                setN3(String(nota.n3 ?? ""));

            } catch (error) {
                console.error("Erro ao carregar nota:", error);
                alert("Erro ao carregar os dados da nota.");
                router.push("/listanotas");
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, [id, router]);

    async function salvarNota(e) {
        e.preventDefault();

        if (!alunoId) {
            alert("Selecione um aluno.");
            return;
        }

        setSalvando(true);

        try {
            const resposta = await fetch("/api/notas", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_notas: Number(id),
                    aluno_id: Number(alunoId),
                    t1: Number(t1),
                    t2: Number(t2),
                    n1: Number(n1),
                    n2: Number(n2),
                    n3: Number(n3)
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem || dados.erro || "Erro ao atualizar nota.");
                return;
            }

            alert("Notas atualizadas com sucesso!");
            router.push("/listanotas");

        } catch (error) {
            console.error("Erro ao atualizar nota:", error);
            alert("Erro ao conectar com o servidor.");
        } finally {
            setSalvando(false);
        }
    }

    if (carregando) {
        return (
            <main className={styles.container}>
                <div className={styles.card}>
                    <h2>Editar Notas</h2>
                    <p className={styles.subtitle || styles.subtitulo}>Carregando informações da nota...</p>
                </div>
            </main>
        );
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title || styles.titulo}>
                        Edição de Notas
                    </h2>

                    <p className={styles.subtitle || styles.subtitulo}>
                        Altere os dados e as notas do aluno no sistema.
                    </p>

                    <form className={styles.form} onSubmit={salvarNota}>
                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="aluno">Nome do aluno</label>
                            <select
                                id="aluno"
                                value={alunoId}
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

                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="t1">Trabalho 1 (T1)</label>
                            <input
                                id="t1"
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                placeholder="0 a 10"
                                value={t1}
                                onChange={(e) => setT1(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="t2">Trabalho 2 (T2)</label>
                            <input
                                id="t2"
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                placeholder="0 a 10"
                                value={t2}
                                onChange={(e) => setT2(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="n1">Nota 1 (N1)</label>
                            <input
                                id="n1"
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                placeholder="0 a 10"
                                value={n1}
                                onChange={(e) => setN1(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="n2">Nota 2 (N2)</label>
                            <input
                                id="n2"
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                placeholder="0 a 10"
                                value={n2}
                                onChange={(e) => setN2(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="n3">Nota 3 (N3)</label>
                            <input
                                id="n3"
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                placeholder="0 a 10"
                                value={n3}
                                onChange={(e) => setN3(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            className={styles.button || styles.botao}
                            type="submit"
                            disabled={salvando}
                        >
                            {salvando ? "Salvando..." : "Editar Notas"}
                        </button>

                        <button
                            type="button"
                            className={styles.buttonCancel || styles.botaoCancelar}
                            onClick={() => router.push("/listanotas")}
                            disabled={salvando}
                            style={{ marginTop: '10px', backgroundColor: '#6c757d' }}
                        >
                            Cancelar
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}