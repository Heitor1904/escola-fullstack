'use client';

import { useEffect, useState, use } from "react";
import Header from "../../componentes/header";
import styles from "./page.module.css";
import { useRouter, useParams, useSearchParams } from "next/navigation";

export default function EditaAluno({ params: paramsPromise }) {
    const router = useRouter();
    const routeParams = useParams();
    const searchParams = useSearchParams();

    // Captura o ID vindo via Promise (Next.js 15+), URL Params ou Search Params
    const resolvedParams = paramsPromise ? use(paramsPromise) : null;
    const id = resolvedParams?.id || routeParams?.id || searchParams?.get("id");

    const [id_aluno, setIdAluno] = useState('');
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [serie, setSerie] = useState('');
    const [ra, setRa] = useState('');
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (id) {
            buscarAluno(id);
        } else {
            setCarregando(false);
        }
    }, [id]);

    async function buscarAluno(idAluno) {
        try {
            setCarregando(true);
            const resposta = await fetch(`/api/alunos/${idAluno}`);

            const dados = await resposta.json();

            // Busca item em lista caso a API retorne um Array, ou usa direto se for objeto
            const aluno = Array.isArray(dados)
                ? dados.find((item) => item.id_aluno === Number(idAluno))
                : dados;

            if (!resposta.ok || !aluno || aluno.mensagem) {
                alert("Aluno não encontrado!");
                router.push("/listalunos");
                return;
            }

            setIdAluno(aluno.id_aluno || idAluno);
            setNome(aluno.nome || '');
            setIdade(aluno.idade || '');
            setSerie(aluno.serie || '');
            setRa(aluno.ra || '');
        } catch (erro) {
            console.error("Erro ao carregar aluno:", erro);
            alert("Erro ao carregar dados do aluno.");
        } finally {
            setCarregando(false);
        }
    }

    async function editarAluno(evento) {
        evento.preventDefault();

        const idFinal = id_aluno || id;

        if (!idFinal) {
            alert("ID do aluno não foi encontrado.");
            return;
        }

        try {
            // Tenta enviar para a rota específica do ID e faz fallback para a rota geral
            let resposta = await fetch(`/api/alunos/${idFinal}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_aluno: Number(idFinal),
                    nome,
                    idade: Number(idade),
                    serie,
                    ra
                }),
            });

            if (!resposta.ok) {
                resposta = await fetch("/api/alunos", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_aluno: Number(idFinal),
                        nome,
                        idade: Number(idade),
                        serie,
                        ra
                    }),
                });
            }

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem || dados.erro || "Erro ao atualizar aluno.");
                return;
            }

            alert(dados.mensagem || "Aluno atualizado com sucesso!");
            router.push("/listalunos");

        } catch (error) {
            console.error("Erro ao atualizar aluno:", error);
            alert("Erro ao atualizar aluno.");
        }
    }

    if (carregando) {
        return (
            <main className={styles.container}>
                <div className={styles.card}>
                    <h2>Editar Aluno</h2>
                    <p className={styles.subtitulo}>Carregando informações do aluno...</p>
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
                        Edição de Alunos
                    </h2>

                    <p className={styles.subtitle || styles.subtitulo}>
                        Preencha os dados do aluno para realizar o cadastro no sistema.
                    </p>

                    <form className={styles.form} onSubmit={editarAluno}>
                        <input
                            type="text"
                            value={id_aluno}
                            onChange={(event) => setIdAluno(event.target.value)}
                            hidden
                        />

                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="nome">Nome</label>
                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite o nome do aluno"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="idade">Idade</label>
                            <input
                                id="idade"
                                type="number"
                                value={idade}
                                onChange={(e) => setIdade(e.target.value)}
                                placeholder="Digite a idade"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="serie">Série</label>
                            <input
                                id="serie"
                                type="text"
                                value={serie}
                                onChange={(e) => setSerie(e.target.value)}
                                placeholder="Digite a série"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="ra">RA</label>
                            <input
                                id="ra"
                                type="text"
                                value={ra}
                                onChange={(e) => setRa(e.target.value)}
                                placeholder="Digite o RA"
                                required
                            />
                        </div>

                        <button className={styles.button || styles.botao} type="submit">
                            Editar Aluno
                        </button>

                        <button
                            type="button"
                            className={styles.buttonCancel || styles.botaoCancelar}
                            onClick={() => router.push("/listalunos")}
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