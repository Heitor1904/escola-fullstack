'use client';

<<<<<<< HEAD
'use client';

import { useEffect, useState } from "react";
=======
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
>>>>>>> 6722cf1 (Atualizando projeto)
import Header from "../componentes/header";
import styles from "./page.module.css";

export default function ListAlunos() {
<<<<<<< HEAD

    const [alunos, setAlunos] = useState([]);

    const [editando, setEditando] = useState(null);

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [serie, setSerie] = useState("");
    const [ra, setRa] = useState("");

    async function carregarAlunos() {
        try {
            const resposta = await fetch("/api/alunos");
            const dados = await resposta.json();

            setAlunos(dados);

        } catch (error) {
            console.error("Erro ao carregar alunos:", error);
        }
    }

    useEffect(() => {
        carregarAlunos();
    }, []);

    function iniciarEdicao(aluno) {
        setEditando(aluno.id_aluno);
        setNome(aluno.nome);
        setIdade(aluno.idade);
        setSerie(aluno.serie);
        setRa(aluno.ra);
    }

    function cancelarEdicao() {
        setEditando(null);
        setNome("");
        setIdade("");
        setSerie("");
        setRa("");
    }

    async function salvarEdicao() {

        try {
            const resposta = await fetch("/api/alunos", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_aluno: editando,
                    nome: nome,
                    idade: Number(idade),
                    serie: serie,
                    ra: ra
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem);
                return;
            }

            alert("Aluno atualizado com sucesso!");

            cancelarEdicao();
            carregarAlunos();

        } catch (error) {
            console.error("Erro ao editar aluno:", error);
        }
    }

    async function excluirAluno(id) {

        const confirmar = window.confirm(
            "Deseja realmente excluir este aluno?"
        );

        if (!confirmar) {
            return;
        }

        try {
            const resposta = await fetch("/api/alunos", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_aluno: id
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem);
                return;
            }

            alert("Aluno excluído com sucesso!");

            carregarAlunos();

        } catch (error) {
            console.error("Erro ao excluir aluno:", error);
        }
    }

=======
    const [alunos, setAlunos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [carregando, setCarregando] = useState(true);

    const router = useRouter();

    useEffect(() => {
        buscarAlunos();
    }, []);

    // BUSCAR ALUNOS
    async function buscarAlunos() {
        try {
            setCarregando(true);
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
        } catch (erro) {
            console.error("Erro ao buscar alunos:", erro);
            alert("Não foi possível carregar os alunos.");
        } finally {
            setCarregando(false);
        }
    }

    // EDITAR ALUNO (No mesmo modelo do professor)
    function editarAlunos(id) {
        router.push(`/editaaluno/${id}`);
    }

    // EXCLUIR ALUNO (Estrutura idêntica à do professor usando data-id)
    async function excluirAlunos(event) {
        event.preventDefault();

        if (!confirm("Deseja realmente excluir este aluno?")) {
            return;
        }

        const idAluno = event.target.dataset.id;

        try {
            let resposta = await fetch(`/api/alunos/${idAluno}`, {
                method: "DELETE"
            });

            if (!resposta.ok) {
                resposta = await fetch("/api/alunos", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_aluno: idAluno,
                    }),
                });
            }

            const dados = await resposta.json();
            alert(dados.mensagem || dados.erro || "Aluno excluído!");

            buscarAlunos();
        } catch (erro) {
            console.error("Erro ao excluir aluno:", erro);
            alert("Erro ao excluir aluno.");
        }
    }

    // FILTRO DE BUSCA
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

>>>>>>> 6722cf1 (Atualizando projeto)
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

<<<<<<< HEAD
                    {editando !== null && (
                        <div className={styles.edicao}>

                            <h3>Editar aluno</h3>

                            <input
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Idade"
                                value={idade}
                                onChange={(e) => setIdade(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Série"
                                value={serie}
                                onChange={(e) => setSerie(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="RA"
                                value={ra}
                                onChange={(e) => setRa(e.target.value)}
                            />

                            <button onClick={salvarEdicao}>
                                Salvar alteração
                            </button>

                            <button onClick={cancelarEdicao}>
                                Cancelar
                            </button>

                        </div>
                    )}

                    <div className={styles.tabelaContainer}>

                        <table>

=======
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
                            Total: {alunosFiltrados.length} {alunosFiltrados.length === 1 ? "aluno" : "alunos"}
                        </div>
                    </div>

                    <div className={styles.tableWrapper || ""}>
                        <table className={styles.table}>
>>>>>>> 6722cf1 (Atualizando projeto)
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
<<<<<<< HEAD

                                {alunos.map((aluno) => (

                                    <tr key={aluno.id_aluno}>

                                        <td>{aluno.id_aluno}</td>

                                        <td>{aluno.nome}</td>

                                        <td>{aluno.idade}</td>

                                        <td>{aluno.serie}</td>

                                        <td>{aluno.ra}</td>

                                        <td className={styles.acoes}>

                                            <button
                                                onClick={() => iniciarEdicao(aluno)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() => excluirAluno(aluno.id_aluno)}
                                            >
                                                Deletar
                                            </button>

                                        </td>

                                    </tr>

                                ))}

=======
                                {carregando ? (
                                    <tr>
                                        <td colSpan="6" className={styles.empty}>
                                            Carregando alunos...
                                        </td>
                                    </tr>
                                ) : alunosFiltrados.length > 0 ? (
                                    alunosFiltrados.map((aluno) => {
                                        return (
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
                                                            onClick={() => editarAlunos(aluno.id_aluno)}
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className={styles.deleteButton || ""}
                                                            onClick={(e) => excluirAlunos(e)}
                                                            data-id={aluno.id_aluno}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className={styles.empty}>
                                            Nenhum aluno encontrado.
                                        </td>
                                    </tr>
                                )}
>>>>>>> 6722cf1 (Atualizando projeto)
                            </tbody>

                        </table>

                    </div>

                </section>
            </main>
        </>
    );
<<<<<<< HEAD
}

=======
}
>>>>>>> 6722cf1 (Atualizando projeto)
