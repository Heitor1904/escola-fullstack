
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../componentes/header";
import styles from "./page.module.css";

export default function ListNotas() {
    const [notas, setNotas] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [carregando, setCarregando] = useState(true);

    const router = useRouter();

    // Buscar notas cadastradas
    async function carregarNotas() {
        try {
            setCarregando(true);

            const resposta = await fetch("/api/notas");
            const dados = await resposta.json();

            if (!resposta.ok || !Array.isArray(dados)) {
                setNotas([]);
                console.error("Erro ao buscar notas:", dados);
                return;
            }

            setNotas(dados);
        } catch (erro) {
            console.error("Erro ao carregar notas:", erro);
            alert("Não foi possível carregar as notas.");
            setNotas([]);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarNotas();
    }, []);

    // Abrir o cadastro de notas com os dados para edição
    function editarNota(nota) {
        localStorage.setItem("notaEditar", JSON.stringify(nota));
        router.push("/cadanotas");
    }

    // Excluir nota
    async function excluirNota(id) {
        const confirmar = window.confirm(
            "Deseja realmente excluir esta nota?"
        );

        if (!confirmar) {
            return;
        }

        try {
            let resposta = await fetch(`/api/notas/${id}`, {
                method: "DELETE",
            });

            // Tentar a rota principal caso a rota dinâmica não exista
            if (resposta.status === 404 || resposta.status === 405) {
                resposta = await fetch("/api/notas", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_notas: id,
                    }),
                });
            }

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(
                    dados.mensagem ||
                    dados.erro ||
                    "Não foi possível excluir a nota."
                );
                return;
            }

            alert(dados.mensagem || "Nota excluída com sucesso!");

            await carregarNotas();
        } catch (erro) {
            console.error("Erro ao excluir nota:", erro);
            alert("Erro ao excluir a nota.");
        }
    }

    // Pesquisar pelo nome, ID ou pelas notas
    const notasFiltradas = notas.filter((nota) => {
        const termo = pesquisa.trim().toLowerCase();

        return (
            String(nota.id_notas ?? nota.id_nota ?? "")
                .toLowerCase().includes(termo) ||

            String(nota.aluno_id ?? "")
                .toLowerCase().includes(termo) ||

            String(nota.nome ?? nota.nome_aluno ?? "")
                .toLowerCase().includes(termo) ||

            String(nota.t1 ?? "")
                .toLowerCase().includes(termo) ||

            String(nota.t2 ?? "")
                .toLowerCase().includes(termo) ||

            String(nota.n1 ?? nota.nota1 ?? "")
                .toLowerCase().includes(termo) ||

            String(nota.n2 ?? nota.nota2 ?? "")
                .toLowerCase().includes(termo) ||

            String(nota.n3 ?? nota.nota3 ?? "")
                .toLowerCase().includes(termo)
        );
    });

    return (
        <>
            <Header />

            <main className={styles.main || styles.container}>
                <section
                    className={styles.tituloArea || styles.headerSection}
                >
                    <h2>Lista de Notas</h2>

                    <p>
                        Consulte todas as notas cadastradas no sistema.
                    </p>
                </section>

                <section
                    className={
                        styles.tabelaContainer || styles.tableCard
                    }
                >
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
                            {notasFiltradas.length === 1
                                ? "registro"
                                : "registros"}
                        </div>
                    </div>

                    <div className={styles.tableWrapper || ""}>
                        <table
                            className={styles.tabela || styles.table}
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do aluno</th>
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
                                        <td
                                            colSpan="8"
                                            className={styles.empty || styles.semNotas}
                                        >
                                            Carregando notas...
                                        </td>
                                    </tr>
                                ) : notasFiltradas.length > 0 ? (
                                    notasFiltradas.map((nota, index) => {
                                        const id =
                                            nota.id_notas ?? nota.id_nota;

                                        return (
                                            <tr
                                                key={
                                                    id ??
                                                    `${nota.aluno_id}-${index}`
                                                }
                                            >
                                                <td>{id ?? "-"}</td>

                                                <td>
                                                    {nota.nome ??
                                                        nota.nome_aluno ??
                                                        "-"}
                                                </td>

                                                <td>{nota.t1 ?? "-"}</td>
                                                <td>{nota.t2 ?? "-"}</td>
                                                <td>
                                                    {nota.n1 ??
                                                        nota.nota1 ??
                                                        "-"}
                                                </td>
                                                <td>
                                                    {nota.n2 ??
                                                        nota.nota2 ??
                                                        "-"}
                                                </td>
                                                <td>
                                                    {nota.n3 ??
                                                        nota.nota3 ??
                                                        "-"}
                                                </td>

                                                <td>
                                                    <div
                                                        className={
                                                            styles.buttons ||
                                                            styles.acoes ||
                                                            ""
                                                        }
                                                    >
                                                        <button
                                                            type="button"
                                                            className={
                                                                styles.botaoEditar ||
                                                                styles.editButton ||
                                                                styles.editar ||
                                                                ""
                                                            }
                                                            onClick={() =>
                                                                editarNota(nota)
                                                            }
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className={
                                                                styles.botaoExcluir ||
                                                                styles.deleteButton ||
                                                                styles.deletar ||
                                                                ""
                                                            }
                                                            onClick={() =>
                                                                excluirNota(id)
                                                            }
                                                            disabled={!id}
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
                                        <td
                                            colSpan="8"
                                            className={styles.empty || styles.semNotas}
                                        >
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
    );
}
