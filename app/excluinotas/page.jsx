
'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Header from "../componentes/header";
import styles from "./page.module.css";

export default function ExcluiNotas() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const id = searchParams.get("id");

    const [nota, setNota] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [excluindo, setExcluindo] = useState(false);

    useEffect(() => {

        if (!id) {
            setCarregando(false);
            return;
        }

        async function carregarNota() {

            try {

                const resposta = await fetch("/api/notas");
                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error("Erro ao buscar notas");
                }

                const encontrada = dados.find(
                    (item) => Number(item.id_notas) === Number(id)
                );

                if (!encontrada) {
                    alert("Nota não encontrada!");
                    router.push("/listanotas");
                    return;
                }

                setNota(encontrada);

            } catch (error) {

                console.error("Erro ao carregar nota:", error);
                alert("Erro ao carregar os dados da nota.");
                router.push("/listanotas");

            } finally {
                setCarregando(false);
            }
        }

        carregarNota();

    }, [id, router]);

    async function excluirNota() {

        const confirmar = window.confirm(
            `Deseja realmente excluir as notas de ${nota.nome}?`
        );

        if (!confirmar) {
            return;
        }

        setExcluindo(true);

        try {

            const resposta = await fetch("/api/notas", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_notas: Number(id)
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem || "Erro ao excluir nota.");
                return;
            }

            alert("Nota excluída com sucesso!");
            router.push("/listanotas");

        } catch (error) {

            console.error("Erro ao excluir nota:", error);
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

                    <h2>Excluir Notas</h2>

                    <p className={styles.subtitulo}>
                        Confira os dados antes de excluir
                    </p>

                    {carregando ? (
                        <p>Carregando dados da nota...</p>

                    ) : !id ? (
                        <p>Nenhuma nota selecionada.</p>

                    ) : nota ? (
                        <>
                            <div className={styles.campo}>
                                <label>Nome do aluno</label>
                                <input value={nota.nome ?? ""} readOnly />
                            </div>

                            <div className={styles.linha}>
                                <div className={styles.campo}>
                                    <label>T1 - Trabalho 1</label>
                                    <input value={nota.t1 ?? ""} readOnly />
                                </div>

                                <div className={styles.campo}>
                                    <label>T2 - Trabalho 2</label>
                                    <input value={nota.t2 ?? ""} readOnly />
                                </div>
                            </div>

                            <div className={styles.linha}>
                                <div className={styles.campo}>
                                    <label>N1 - Nota 1</label>
                                    <input value={nota.n1 ?? ""} readOnly />
                                </div>

                                <div className={styles.campo}>
                                    <label>N2 - Nota 2</label>
                                    <input value={nota.n2 ?? ""} readOnly />
                                </div>
                            </div>

                            <div className={styles.campo}>
                                <label>N3 - Nota 3</label>
                                <input value={nota.n3 ?? ""} readOnly />
                            </div>

                            <p className={styles.aviso}>
                                Atenção: esta ação excluirá permanentemente
                                as notas selecionadas.
                            </p>

                            <div className={styles.botoes}>
                                <button
                                    type="button"
                                    onClick={excluirNota}
                                    disabled={excluindo}
                                >
                                    {excluindo
                                        ? "Excluindo..."
                                        : "Confirmar exclusão"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => router.push("/listanotas")}
                                    disabled={excluindo}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </>
                    ) : null}

                </div>
            </main>
        </>
    );
}