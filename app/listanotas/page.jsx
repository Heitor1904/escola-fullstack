<<<<<<< HEAD
'use client'

import { useEffect, useState } from "react"
import Header from "../componentes/header"
import styles from "./page.module.css"
=======
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../componentes/header";
import styles from "./page.module.css";
>>>>>>> 6722cf1 (Atualizando projeto)

export default function ListNotas() {
    const [notas, setNotas] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [carregando, setCarregando] = useState(true);

    const router = useRouter();

    useEffect(() => {
        carregarNotas();
    }, []);

    async function carregarNotas() {
        try {
            const resposta = await fetch("/api/notas");
            const dados = await resposta.json();

            if (!resposta.ok || !Array.isArray(dados)) {
                setNotas([]);
                return;
            }

            setNotas(dados);
        } catch (erro) {
            console.error("Erro ao buscar notas:", erro);
            alert("Não foi possível carregar as notas.");
        } finally {
            setCarregando(false);
        }
    }

    function editarNota(id) {
        router.push(`/editanotas?id=${encodeURIComponent(id)}`);
    }

    async function excluirNota(id) {
        if (!confirm("Deseja realmente excluir esta nota?")) {
            return;
        }

        try {
            const resposta = await fetch(`/api/notas/${id}`, {
                method: "DELETE",
            });

            if (!resposta.ok) {
                // Fallback para envio com body
                await fetch("/api/notas", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_notas: id }),
                });
            }

            alert("Nota excluída com sucesso!");
            carregarNotas();
        } catch (erro) {
            console.error("Erro ao excluir nota:", erro);
            router.push(`/excluinotas?id=${encodeURIComponent(id)}`);
        }
    }

    // FILTRO DE BUSCA
    const notasFiltradas = notas.filter((nota) => {
        const termo = pesquisa.trim().toLowerCase();

        return (
            String(nota.nome ?? "").toLowerCase().includes(termo) ||
            String(nota.t1 ?? "").toLowerCase().includes(termo) ||
            String(nota.t2 ?? "").toLowerCase().includes(termo) ||
            String(nota.n1 ?? nota.nota1 ?? "").toLowerCase().includes(termo) ||
            String(nota.n2 ?? nota.nota2 ?? "").toLowerCase().includes(termo) ||
            String(nota.n3 ?? nota.nota3 ?? "").toLowerCase().includes(termo)
        );
    });

    const [notas, setNotas] = useState([])

    const [editando, setEditando] = useState(null)

    const [alunoId, setAlunoId] = useState("")
    const [t1, setT1] = useState("")
    const [t2, setT2] = useState("")
    const [n1, setN1] = useState("")
    const [n2, setN2] = useState("")
    const [n3, setN3] = useState("")


    // CARREGAR NOTAS
    async function carregarNotas() {

        try {

            const resposta = await fetch("/api/notas")

            const dados = await resposta.json()

            if (!resposta.ok) {
                console.error(dados.mensagem)
                return
            }

            setNotas(dados)

        } catch (error) {

            console.error("Erro ao carregar notas:", error)

        }
    }


    useEffect(() => {

        carregarNotas()

    }, [])


    // COMEÇAR A EDITAR
    function iniciarEdicao(nota) {

        setEditando(nota.id_notas)

        setAlunoId(String(nota.aluno_id))
        setT1(String(nota.t1))
        setT2(String(nota.t2))
        setN1(String(nota.n1))
        setN2(String(nota.n2))
        setN3(String(nota.n3))

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }


    // CANCELAR EDIÇÃO
    function cancelarEdicao() {

        setEditando(null)

        setAlunoId("")
        setT1("")
        setT2("")
        setN1("")
        setN2("")
        setN3("")
    }


    // SALVAR ALTERAÇÃO
    async function salvarEdicao() {

        if (
            alunoId === "" ||
            t1 === "" ||
            t2 === "" ||
            n1 === "" ||
            n2 === "" ||
            n3 === ""
        ) {
            alert("Preencha todos os campos.")

            return
        }


        try {

            const resposta = await fetch("/api/notas", {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    id_notas: editando,

                    aluno_id: Number(alunoId),

                    t1: Number(t1),
                    t2: Number(t2),
                    n1: Number(n1),
                    n2: Number(n2),
                    n3: Number(n3)

                })

            })


            const dados = await resposta.json()


            if (!resposta.ok) {

                alert(dados.mensagem)

                return
            }


            alert("Notas atualizadas com sucesso!")


            cancelarEdicao()

            await carregarNotas()


        } catch (error) {

            console.error("Erro ao editar notas:", error)

            alert("Erro ao editar notas.")

        }
    }


    // DELETAR NOTA
    async function deletarNota(id) {

        const confirmar = window.confirm(
            "Deseja realmente deletar estas notas?"
        )


        if (!confirmar) {
            return
        }


        try {

            const resposta = await fetch("/api/notas", {

                method: "DELETE",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    id_notas: id
                })

            })


            const dados = await resposta.json()


            if (!resposta.ok) {

                alert(dados.mensagem)

                return
            }


            alert("Notas deletadas com sucesso!")


            await carregarNotas()


        } catch (error) {

            console.error("Erro ao deletar notas:", error)

            alert("Erro ao deletar notas.")

        }
    }


    return (

        <>

            <Header />

            <main className={styles.main || styles.container}>

                <section className={styles.tituloArea || styles.headerSection}>
                    <h2>Lista de Notas</h2>

                    <p>
                        Consulte todas as notas cadastradas no sistema.
                    </p>
                </section>

<<<<<<< HEAD

                    {/* ÁREA DE EDIÇÃO */}

                    {editando !== null && (

                        <div className={styles.edicao}>

                            <div className={styles.tituloEdicao}>

                                <div>

                                    <h3>Editar notas</h3>

                                    <p>
                                        Altere as notas do aluno selecionado
                                    </p>

                                </div>

                            </div>


                            <div className={styles.camposEdicao}>

                                <div className={styles.campo}>

                                    <label>Aluno ID</label>

                                    <input
                                        type="number"
                                        value={alunoId}
                                        onChange={(e) =>
                                            setAlunoId(e.target.value)
                                        }
                                    />

                                </div>


                                <div className={styles.campo}>

                                    <label>T1</label>

                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        value={t1}
                                        onChange={(e) =>
                                            setT1(e.target.value)
                                        }
                                    />

                                </div>


                                <div className={styles.campo}>

                                    <label>T2</label>

                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        value={t2}
                                        onChange={(e) =>
                                            setT2(e.target.value)
                                        }
                                    />

                                </div>


                                <div className={styles.campo}>

                                    <label>N1</label>

                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        value={n1}
                                        onChange={(e) =>
                                            setN1(e.target.value)
                                        }
                                    />

                                </div>


                                <div className={styles.campo}>

                                    <label>N2</label>

                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        value={n2}
                                        onChange={(e) =>
                                            setN2(e.target.value)
                                        }
                                    />

                                </div>


                                <div className={styles.campo}>

                                    <label>N3</label>

                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        value={n3}
                                        onChange={(e) =>
                                            setN3(e.target.value)
                                        }
                                    />

                                </div>

                            </div>


                            <div className={styles.botoesEdicao}>

                                <button
                                    type="button"
                                    className={styles.salvar}
                                    onClick={salvarEdicao}
                                >
                                    Salvar alteração
                                </button>


                                <button
                                    type="button"
                                    className={styles.cancelar}
                                    onClick={cancelarEdicao}
                                >
                                    Cancelar
                                </button>

                            </div>

                        </div>

                    )}


                    {/* TABELA */}

                    <div className={styles.tabelaContainer}>
=======
                <section className={styles.tabelaContainer || styles.tableCard}>
>>>>>>> 6722cf1 (Atualizando projeto)

                    <div className={styles.actions}>
                        <input
                            type="text"
                            placeholder="Pesquisar nota ou aluno..."
                            aria-label="Pesquisar notas"
                            className={styles.search}
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                        />

                        <div className={styles.total}>
                            Total: {notasFiltradas.length}{" "}
                            {notasFiltradas.length === 1 ? "registro" : "registros"}
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.tabela || styles.table}>

                            <thead>

                                <tr>

                                    <th>ID</th>
<<<<<<< HEAD

                                    <th>Nome do aluno</th>

=======
                                    <th>Nome</th>
>>>>>>> 6722cf1 (Atualizando projeto)
                                    <th>T1</th>

                                    <th>T2</th>

                                    <th>N1</th>

                                    <th>N2</th>

                                    <th>N3</th>

                                    <th>Ações</th>

                                </tr>

                            </thead>


                            <tbody>
                                {carregando ? (
                                    <tr>
                                        <td colSpan="8" className={styles.empty}>
                                            Carregando notas...
                                        </td>
                                    </tr>
                                ) : notasFiltradas.length > 0 ? (
                                    notasFiltradas.map((nota) => (
                                        <tr key={nota.id_notas || nota.id_nota || nota.id_aluno}>
                                            <td>{nota.id_notas || nota.id_nota || "-"}</td>
                                            <td>{nota.nome || nota.nome_aluno || "-"}</td>
                                            <td>{nota.t1 ?? "-"}</td>
                                            <td>{nota.t2 ?? "-"}</td>
                                            <td>{nota.n1 ?? nota.nota1 ?? "-"}</td>
                                            <td>{nota.n2 ?? nota.nota2 ?? "-"}</td>
                                            <td>{nota.n3 ?? nota.nota3 ?? "-"}</td>

<<<<<<< HEAD
                                {notas.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className={styles.semNotas}
                                        >
                                            Nenhuma nota cadastrada.
                                        </td>

                                    </tr>

                                ) : (

                                    notas.map((nota) => (

                                        <tr key={nota.id_notas}>

                                            <td>
                                                {nota.id_notas}
                                            </td>

                                            <td>
                                                {nota.nome}
                                            </td>

                                            <td>
                                                {nota.t1}
                                            </td>

                                            <td>
                                                {nota.t2}
                                            </td>

                                            <td>
                                                {nota.n1}
                                            </td>

                                            <td>
                                                {nota.n2}
                                            </td>

                                            <td>
                                                {nota.n3}
                                            </td>


                                            <td className={styles.acoes}>

                                                <button
                                                    type="button"
                                                    className={styles.editar}
                                                    onClick={() =>
                                                        iniciarEdicao(nota)
                                                    }
                                                >
                                                    Editar
                                                </button>


                                                <button
                                                    type="button"
                                                    className={styles.deletar}
                                                    onClick={() =>
                                                        deletarNota(
                                                            nota.id_notas
                                                        )
                                                    }
                                                >
                                                    Deletar
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}
=======
                                            <td>
                                                <div className={styles.buttons}>
                                                    <button
                                                        type="button"
                                                        className={styles.botaoEditar || styles.editButton}
                                                        onClick={() => editarNota(nota.id_notas || nota.id_nota)}
                                                    >
                                                        Editar
                                                    </button>
>>>>>>> 6722cf1 (Atualizando projeto)

                                                    <button
                                                        type="button"
                                                        className={styles.botaoExcluir || styles.deleteButton}
                                                        onClick={() => excluirNota(nota.id_notas || nota.id_nota)}
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className={styles.empty}>
                                            Nenhuma nota encontrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </section>

            </main>

        </>
<<<<<<< HEAD

    )
=======
    );
>>>>>>> 6722cf1 (Atualizando projeto)
}