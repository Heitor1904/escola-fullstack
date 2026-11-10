
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../componentes/header";
import styles from "./page.module.css";

export default function CadDisciplinas() {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [pontuacaoMinima, setPontuacaoMinima] = useState("");

    async function cadastrarDisciplina(evento) {
        evento.preventDefault();

        try {
            const resposta = await fetch("/api/disciplinas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    pontuacao_minima: Number(pontuacaoMinima),
                }),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(
                    dados.mensagem ||
                    "Erro ao cadastrar disciplina."
                );
                return;
            }

            alert("Disciplina cadastrada com sucesso!");

            setNome("");
            setPontuacaoMinima("");

            router.push("/listdisciplinas");

        } catch (error) {
            console.error("Erro ao cadastrar disciplina:", error);
            alert("Não foi possível cadastrar a disciplina.");
        }
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.card}>

                    <h2>Cadastro de Disciplinas</h2>

                    <p className={styles.subtitulo}>
                        Preencha os dados da disciplina para realizar o cadastro no sistema.
                    </p>

                    <form
                        className={styles.form}
                        onSubmit={cadastrarDisciplina}
                    >
                        <div className={styles.campo}>
                            <label htmlFor="nome">
                                Nome da disciplina
                            </label>

                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite o nome da disciplina"
                                required
                            />
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="pontuacaoMinima">
                                Pontuação mínima para passar
                            </label>

                            <input
                                id="pontuacaoMinima"
                                type="number"
                                min="0"
                                step="0.1"
                                value={pontuacaoMinima}
                                onChange={(e) =>
                                    setPontuacaoMinima(e.target.value)
                                }
                                placeholder="Ex.: 6"
                                required
                            />
                        </div>

                        <button
                            className={styles.button}
                            type="submit"
                        >
                            Cadastrar Disciplina
                        </button>

                    </form>
                </div>
            </main>
        </>
    );
}
