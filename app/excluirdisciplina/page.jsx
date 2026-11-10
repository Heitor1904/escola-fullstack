
'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../componentes/header";
import styles from "./page.module.css";

export default function ExcluirDisciplina() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const id = searchParams.get("id");

    const [disciplina, setDisciplina] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarDisciplina() {
            try {
                const resposta = await fetch("/api/disciplinas");
                const dados = await resposta.json();

                const encontrada = dados.find(
                    (item) => String(item.id_disciplina) === String(id)
                );

                setDisciplina(encontrada || null);
            } catch (erro) {
                console.error("Erro ao buscar disciplina:", erro);
            } finally {
                setCarregando(false);
            }
        }

        if (id) {
            buscarDisciplina();
        } else {
            setCarregando(false);
        }
    }, [id]);

    async function excluirDisciplina() {
        try {
            const resposta = await fetch(`/api/disciplinas/${id}`, {
                method: "DELETE"
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem || "Não foi possível excluir a disciplina.");
                return;
            }

            alert("Disciplina excluída com sucesso!");
            router.push("/listdisciplinas");

        } catch (erro) {
            console.error("Erro ao excluir disciplina:", erro);
            alert("Erro ao excluir disciplina.");
        }
    }

    if (carregando) {
        return <p>Carregando...</p>;
    }

    if (!disciplina) {
        return (
            <>
                <Header />
                <main className={styles.container}>
                    <div className={styles.card}>
                        <h2>Disciplina não encontrada!</h2>
                        <button onClick={() => router.push("/listdisciplinas")}>
                            Voltar
                        </button>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.card}>
                    <h1>Excluir Disciplina</h1>

                    <p className={styles.aviso}>
                        Tem certeza de que deseja excluir esta disciplina?
                    </p>

                    <div className={styles.dados}>
                        <p>
                            <strong>ID:</strong> {disciplina.id_disciplina}
                        </p>

                        <p>
                            <strong>Nome:</strong> {disciplina.nome}
                        </p>

                        <p>
                            <strong>Pontuação mínima:</strong>{" "}
                            {disciplina.pontuacao_minima}
                        </p>
                    </div>

                    <div className={styles.botoes}>
                        <button
                            className={styles.cancelar}
                            onClick={() => router.push("/listdisciplinas")}
                        >
                            Cancelar
                        </button>

                        <button
                            className={styles.excluir}
                            onClick={excluirDisciplina}
                        >
                            Confirmar exclusão
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
