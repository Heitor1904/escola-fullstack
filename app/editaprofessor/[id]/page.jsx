
'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import Header from "../../componentes/header";
import styles from "./page.module.css";

export default function EditaProfessor() {

    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [nome, setNome] = useState("");
    const [nif, setNif] = useState("");
    const [dias_aula, setDiasAula] = useState([]);
    const [disciplina_id, setDisciplinaId] = useState("");
    const [total_aulas, setTotalAulas] = useState("");

    const [disciplinas, setDisciplinas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    const diasSemana = [
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira"
    ];

    useEffect(() => {
        if (id) {
            carregarDados();
        }
    }, [id]);

    async function carregarDados() {

        try {
            const [respostaProfessores, respostaDisciplinas] =
                await Promise.all([
                    fetch("/api/professores"),
                    fetch("/api/disciplinas")
                ]);

            const professores = await respostaProfessores.json();
            const disciplinasDados = await respostaDisciplinas.json();

            if (!respostaProfessores.ok || !respostaDisciplinas.ok) {
                throw new Error("Erro ao buscar dados.");
            }

            const professor = professores.find(
                (item) => item.id_professor === Number(id)
            );

            if (!professor) {
                alert("Professor não encontrado!");
                router.push("/listprofessores");
                return;
            }

            setNome(professor.nome);
            setNif(professor.nif);
            setDiasAula(
                professor.dias_aula
                    ? professor.dias_aula.split(",").map((dia) => dia.trim())
                    : []
            );
            setDisciplinaId(String(professor.disciplina_id));
            setTotalAulas(String(professor.total_aulas));

            setDisciplinas(disciplinasDados);

        } catch (erro) {
            console.error("Erro ao carregar professor:", erro);
            alert("Erro ao carregar os dados do professor.");
            router.push("/listprofessores");
        } finally {
            setCarregando(false);
        }
    }

    function selecionarDia(dia) {
        if (dias_aula.includes(dia)) {
            setDiasAula(dias_aula.filter((item) => item !== dia));
        } else {
            setDiasAula([...dias_aula, dia]);
        }
    }

    async function editarProfessor(evento) {

        evento.preventDefault();

        if (dias_aula.length === 0) {
            alert("Selecione pelo menos um dia de aula.");
            return;
        }

        setSalvando(true);

        try {

            const resposta = await fetch(`/api/professores/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    nif,
                    dias_aula: dias_aula.join(", "),
                    disciplina_id: Number(disciplina_id),
                    total_aulas: Number(total_aulas)
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem || "Erro ao atualizar professor.");
                return;
            }

            alert("Professor atualizado com sucesso!");
            router.push("/listprofessores");

        } catch (erro) {
            console.error("Erro ao editar professor:", erro);
            alert("Erro ao atualizar professor.");
        } finally {
            setSalvando(false);
        }
    }

    if (carregando) {
        return (
            <>
                <Header />
                <main className={styles.container}>
                    <div className={styles.card}>
                        <h2>Editar Professor</h2>
                        <p>Carregando informações...</p>
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

                    <h2>Edição de Professores</h2>

                    <p className={styles.subtitulo}>
                        Altere os dados do professor.
                    </p>

                    <form onSubmit={editarProfessor}>

                        <div className={styles.campo}>
                            <label>Nome do Professor</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.campo}>
                            <label>NIF / Matrícula</label>
                            <input
                                type="text"
                                value={nif}
                                onChange={(e) => setNif(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.campo}>
                            <label>Dias da Semana</label>

                            <div className={styles.dias}>
                                {diasSemana.map((dia) => (
                                    <label key={dia} className={styles.dia}>
                                        <input
                                            type="checkbox"
                                            checked={dias_aula.includes(dia)}
                                            onChange={() => selecionarDia(dia)}
                                        />
                                        {dia}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.campo}>
                            <label>Disciplina Responsável</label>

                            <select
                                value={disciplina_id}
                                onChange={(e) => setDisciplinaId(e.target.value)}
                                required
                            >
                                <option value="">Selecione uma disciplina</option>

                                {disciplinas.map((disciplina) => (
                                    <option
                                        key={disciplina.id_disciplina}
                                        value={disciplina.id_disciplina}
                                    >
                                        {disciplina.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.campo}>
                            <label>Total de Aulas por Semana</label>

                            <input
                                type="number"
                                min="1"
                                step="1"
                                value={total_aulas}
                                onChange={(e) => setTotalAulas(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.botoes}>
                            <button type="submit" disabled={salvando}>
                                {salvando ? "Salvando..." : "Salvar Alterações"}
                            </button>

                            <button
                                type="button"
                                onClick={() => router.push("/listprofessores")}
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
