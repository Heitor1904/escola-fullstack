'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Header from "../componentes/header";
import styles from "./page.module.css";

export default function ExcluirAluno() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const id = searchParams.get("id");

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [serie, setSerie] = useState("");
    const [ra, setRa] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [excluindo, setExcluindo] = useState(false);

    useEffect(() => {

        if (!id) {
            setCarregando(false);
            return;
        }

        async function carregarAluno() {

            try {

                // MUDADO DE "/api/alunos" PARA "/api/alunos/lista"
                const resposta = await fetch("/api/alunos/lista");
                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error("Erro ao buscar alunos");
                }

                const aluno = dados.find(
                    (item) => item.id_aluno === Number(id)
                );

                if (!aluno) {
                    alert("Aluno não encontrado!");
                    router.push("/listalunos");
                    return;
                }

                setNome(aluno.nome);
                setIdade(aluno.idade);
                setSerie(aluno.serie);
                setRa(aluno.ra);

            } catch (error) {

                console.error("Erro ao carregar aluno:", error);
                alert("Erro ao carregar os dados do aluno.");
                router.push("/listalunos");

            } finally {

                setCarregando(false);

            }
        }

        carregarAluno();

    }, [id, router]);

    async function excluirAluno() {

        const confirmar = window.confirm(
            `Deseja realmente excluir o aluno ${nome}? Essa ação não poderá ser desfeita.`
        );

        if (!confirmar) {
            return;
        }

        setExcluindo(true);

        try {

            // MUDADO DE "/api/alunos" PARA `/api/alunos/${id}`
            const resposta = await fetch(`/api/alunos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_aluno: Number(id)
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem || "Erro ao excluir aluno.");
                return;
            }

            alert("Aluno excluído com sucesso!");
            router.push("/listalunos");

        } catch (error) {

            console.error("Erro ao excluir aluno:", error);
            alert("Erro ao conectar com o servidor.");

        } finally {

            setExcluindo(false);

        }
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.card}>

                    <h2>Excluir Aluno</h2>

                    <p className={styles.subtitulo}>
                        Confira os dados antes de excluir
                    </p>

                    {carregando ? (

                        <p>Carregando dados do aluno...</p>

                    ) : !id ? (

                        <p>
                            Nenhum aluno selecionado.
                        </p>

                    ) : (

                        <>
                            <div className={styles.campo}>
                                <label>Nome</label>
                                <input value={nome} readOnly />
                            </div>

                            <div className={styles.linha}>

                                <div className={styles.campo}>
                                    <label>Idade</label>
                                    <input value={idade} readOnly />
                                </div>

                                <div className={styles.campo}>
                                    <label>Série</label>
                                    <input value={serie} readOnly />
                                </div>

                            </div>

                            <div className={styles.campo}>
                                <label>RA</label>
                                <input value={ra} readOnly />
                            </div>

                            <p className={styles.aviso}>
                                Atenção: a exclusão é permanente e não poderá
                                ser desfeita.
                            </p>

                            <div className={styles.botoes}>

                                <button
                                    type="button"
                                    onClick={excluirAluno}
                                    disabled={excluindo}
                                >
                                    {excluindo
                                        ? "Excluindo..."
                                        : "Confirmar exclusão"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => router.push("/listalunos")}
                                    disabled={excluindo}
                                >
                                    Cancelar
                                </button>

                            </div>
                        </>
                    )}

                </div>
            </main>
        </>
    );
}