
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../componentes/header";
import styles from "./page.module.css";

export default function ListAlunos() {
    const [alunos, setAlunos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [carregando, setCarregando] = useState(true);

    const router = useRouter();

    // Buscar alunos cadastrados
    async function buscarAlunos() {
        try {
            setCarregando(true);

            const resposta = await fetch("/api/alunos");
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.mensagem || dados.erro || "Erro ao buscar alunos."
                );
            }

            if (Array.isArray(dados)) {
                setAlunos(dados);
            } else {
                setAlunos([]);
            }
        } catch (erro) {
            console.error("Erro ao buscar alunos:", erro);
            alert("Não foi possível carregar os alunos.");
            setAlunos([]);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarAlunos();
    }, []);

    // Abrir página de edição
    function editarAluno(id) {
        router.push(`/editaaluno/${id}`);
    }

    // Excluir aluno
    async function excluirAluno(id) {
        const confirmar = window.confirm(
            "Deseja realmente excluir este aluno?"
        );

        if (!confirmar) {
            return;
        }

        try {
            let resposta = await fetch(`/api/alunos/${id}`, {
                method: "DELETE",
            });

            // Caso a API não tenha a rota dinâmica, tentar a rota principal
            if (resposta.status === 404 || resposta.status === 405) {
                resposta = await fetch("/api/alunos", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_aluno: id,
                    }),
                });
            }

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(
                    dados.mensagem ||
                    dados.erro ||
                    "Não foi possível excluir o aluno."
                );
                return;
            }

            alert(dados.mensagem || "Aluno excluído com sucesso!");

            await buscarAlunos();
        } catch (erro) {
            console.error("Erro ao excluir aluno:", erro);
            alert("Erro ao excluir aluno.");
        }
    }

    // Filtrar alunos pela pesquisa
    const alunosFiltrados = alunos.filter((aluno) => {
        const termo = pesquisa.trim().toLowerCase();

        return (
            String(aluno.id_aluno ?? "").toLowerCase().includes(termo) ||
            String(aluno.nome ?? "").toLowerCase().includes(termo) ||
            String(aluno.idade ?? "").toLowerCase().includes(termo) ||
            String(aluno.serie ?? "").toLowerCase().includes(termo) ||
            String(aluno.ra ?? "").toLowerCase().includes(termo)
        );
    });

    return (
        <>
            <Header />

            <main className={styles.container}>
                <section className={styles.headerSection}>
                    <h2>Lista de Alunos</h2>

                    <p>
                        Consulte todos os alunos cadastrados no sistema.
                    </p>
                </section>

                <section className={styles.tableCard}>
                    <div className={styles.actions}>
                        <input
                            type="text"
                            placeholder="Pesquisar aluno..."
                            className={styles.search}
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                        />

                        <div className={styles.total}>
                            Total: {alunosFiltrados.length}{" "}
                            {alunosFiltrados.length === 1
                                ? "aluno"
                                : "alunos"}
                        </div>
                    </div>

                    <div className={styles.tableWrapper || ""}>
                        <table className={styles.table}>
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
                                {carregando ? (
                                    <tr>
                                        <td colSpan="6" className={styles.empty}>
                                            Carregando alunos...
                                        </td>
                                    </tr>
                                ) : alunosFiltrados.length > 0 ? (
                                    alunosFiltrados.map((aluno) => (
                                        <tr key={aluno.id_aluno}>
                                            <td>{aluno.id_aluno}</td>
                                            <td>{aluno.nome}</td>
                                            <td>{aluno.idade}</td>
                                            <td>{aluno.serie}</td>
                                            <td>{aluno.ra}</td>

                                            <td>
                                                <div className={styles.buttons || ""}>
                                                    <button
                                                        type="button"
                                                        className={styles.editButton || ""}
                                                        onClick={() =>
                                                            editarAluno(aluno.id_aluno)
                                                        }
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={styles.deleteButton || ""}
                                                        onClick={() =>
                                                            excluirAluno(aluno.id_aluno)
                                                        }
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className={styles.empty}>
                                            Nenhum aluno encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    );
}
