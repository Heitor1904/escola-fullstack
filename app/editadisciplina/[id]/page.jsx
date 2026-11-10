
'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import Header from "../../componentes/header";
import styles from "./page.module.css";

export default function EditaDisciplina() {

    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [id_disciplina, setIdDisciplina] = useState("");
    const [nome, setNome] = useState("");
    const [pontuacao_minima, setPontuacaoMinima] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        if (id) {
            buscarDisciplina(id);
        } else {
            setCarregando(false);
        }

    }, [id]);

    async function buscarDisciplina(idDisciplina) {

        try {

            setCarregando(true);

            const resposta = await fetch("/api/disciplinas");
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error("Erro ao buscar disciplinas");
            }

            const disciplina = dados.find(
                (item) => item.id_disciplina === Number(idDisciplina)
            );

            if (!disciplina) {
                alert("Disciplina não encontrada!");
                router.push("/listdisciplinas");
                return;
            }

            setIdDisciplina(disciplina.id_disciplina);
            setNome(disciplina.nome);
            setPontuacaoMinima(disciplina.pontuacao_minima);

        } catch (erro) {

            console.error("Erro ao carregar disciplina:", erro);
            alert("Erro ao carregar os dados da disciplina.");
            router.push("/listdisciplinas");

        } finally {

            setCarregando(false);

        }
    }

    async function editarDisciplina(evento) {

        evento.preventDefault();

        if (!id_disciplina) {
            alert("ID da disciplina não encontrado.");
            return;
        }

        try {

            const resposta = await fetch(`/api/disciplinas/${id_disciplina}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    pontuacao_minima: Number(pontuacao_minima)
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem || dados.erro || "Erro ao atualizar disciplina.");
                return;
            }

            alert(dados.mensagem || "Disciplina atualizada com sucesso!");
            router.push("/listdisciplinas");

        } catch (erro) {

            console.error("Erro ao atualizar disciplina:", erro);
            alert("Erro ao atualizar disciplina.");

        }
    }

    if (carregando) {
        return (
            <>
                <Header />

                <main className={styles.container}>
                    <div className={styles.card}>
                        <h2>Editar Disciplina</h2>
                        <p className={styles.subtitulo}>
                            Carregando informações da disciplina...
                        </p>
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

                    <h2>Edição de Disciplinas</h2>

                    <p className={styles.subtitulo}>
                        Altere os dados da disciplina.
                    </p>

                    <form onSubmit={editarDisciplina}>

                        <div className={styles.campo}>
                            <label>ID da Disciplina</label>
                            <input
                                type="text"
                                value={id_disciplina}
                                readOnly
                            />
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="nome">Nome da Disciplina</label>
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
                            <label htmlFor="pontuacao">
                                Pontuação Mínima para Aprovação
                            </label>

                            <input
                                id="pontuacao"
                                type="number"
                                min="0"
                                step="0.1"
                                value={pontuacao_minima}
                                onChange={(e) => setPontuacaoMinima(e.target.value)}
                                placeholder="Digite a pontuação mínima"
                                required
                            />
                        </div>

                        <div className={styles.botoes}>

                            <button type="submit">
                                Salvar Alterações
                            </button>

                            <button
                                type="button"
                                onClick={() => router.push("/listdisciplinas")}
                            >
                                Cancelar
                            </button>

                        </div>

                    </form>
                </div>
            </main>
        </>
    );
}
