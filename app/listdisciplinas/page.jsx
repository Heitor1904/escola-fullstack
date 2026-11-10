
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../componentes/header";
import styles from "./page.module.css";

export default function ListDisciplinas() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [carregando, setCarregando] = useState(true);

    const router = useRouter();

    // Buscar disciplinas cadastradas
    async function buscarDisciplinas() {
        try {
            setCarregando(true);

            const resposta = await fetch("/api/disciplinas");
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.mensagem || "Erro ao buscar disciplinas."
                );
            }

            setDisciplinas(Array.isArray(dados) ? dados : []);

        } catch (erro) {
            console.error("Erro ao buscar disciplinas:", erro);
            alert("Não foi possível carregar as disciplinas.");
            setDisciplinas([]);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarDisciplinas();
    }, []);

    // Abrir página de edição
    function editarDisciplina(id) {
        router.push(`/editadisciplina/${id}`);
    }

    // Excluir disciplina
    async function excluirDisciplina(id) {
        const confirmar = window.confirm(
            "Deseja realmente excluir esta disciplina?"
        );

        if (!confirmar) {
            return;
        }

        try {
            const resposta = await fetch(`/api/disciplinas/${id}`, {
                method: "DELETE",
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(
                    dados.mensagem ||
                    "Não foi possível excluir a disciplina."
                );
                return;
            }

            alert(dados.mensagem || "Disciplina excluída com sucesso!");

            await buscarDisciplinas();

        } catch (erro) {
            console.error("Erro ao excluir disciplina:", erro);
            alert("Erro ao excluir disciplina.");
        }
    }

    // Filtrar disciplinas
    const disciplinasFiltradas = disciplinas.filter((disciplina) => {
        const termo = pesquisa.trim().toLowerCase();

        return (
            String(disciplina.id_disciplina ?? "").toLowerCase().includes(termo) ||
            String(disciplina.nome ?? "").toLowerCase().includes(termo) ||
            String(disciplina.pontuacao_minima ?? "").toLowerCase().includes(termo)
        );
    });

    return (
        <>
            <Header />

            <main className={styles.container}>

                <section className={styles.headerSection}>
                    <h2>Lista de Disciplinas</h2>

                    <p>
                        Consulte todas as disciplinas cadastradas no sistema.
                    </p>
                </section>

                <section className={styles.tableCard}>

                    <div className={styles.actions}>
                        <input
                            type="text"
                            placeholder="Pesquisar disciplina..."
                            className={styles.search}
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                        />

                        <div className={styles.total}>
                            Total: {disciplinasFiltradas.length}{" "}
                            {disciplinasFiltradas.length === 1
                                ? "disciplina"
                                : "disciplinas"}
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome da disciplina</th>
                                    <th>Pontuação mínima</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {carregando ? (
                                    <tr>
                                        <td colSpan="4" className={styles.empty}>
                                            Carregando disciplinas...
                                        </td>
                                    </tr>
                                ) : disciplinasFiltradas.length > 0 ? (
                                    disciplinasFiltradas.map((disciplina) => (
                                        <tr key={disciplina.id_disciplina}>
                                            <td>{disciplina.id_disciplina}</td>
                                            <td>{disciplina.nome}</td>
                                            <td>{disciplina.pontuacao_minima}</td>

                                            <td>
                                                <div className={styles.buttons}>
                                                    <button
                                                        type="button"
                                                        className={styles.editButton}
                                                        onClick={() =>
                                                            editarDisciplina(
                                                                disciplina.id_disciplina
                                                            )
                                                        }
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={styles.deleteButton}
                                                        onClick={() =>
                                                            excluirDisciplina(
                                                                disciplina.id_disciplina
                                                            )
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
                                        <td colSpan="4" className={styles.empty}>
                                            Nenhuma disciplina encontrada.
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
