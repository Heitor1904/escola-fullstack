
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../componentes/header";
import styles from "./page.module.css";

export default function CadProfessores() {

    const router = useRouter();

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
        buscarDisciplinas();
    }, []);

    async function buscarDisciplinas() {
        try {
            const resposta = await fetch("/api/disciplinas");
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error("Erro ao buscar disciplinas");
            }

            setDisciplinas(dados);

        } catch (erro) {
            console.error("Erro ao carregar disciplinas:", erro);
            alert("Erro ao carregar as disciplinas.");
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

    async function cadastrarProfessor(evento) {
        evento.preventDefault();

        if (dias_aula.length === 0) {
            alert("Selecione pelo menos um dia de aula.");
            return;
        }

        if (disciplinas.length === 0) {
            alert("Cadastre uma disciplina antes de cadastrar um professor.");
            return;
        }

        setSalvando(true);

        try {
            const resposta = await fetch("/api/professores", {
                method: "POST",
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
                alert(dados.mensagem || "Erro ao cadastrar professor.");
                return;
            }

            alert("Professor cadastrado com sucesso!");
            router.push("/listprofessores");

        } catch (erro) {
            console.error("Erro ao cadastrar professor:", erro);
            alert("Erro ao conectar com o servidor.");
        } finally {
            setSalvando(false);
        }
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.card}>

                    <h2>Cadastro de Professores</h2>

                    <p className={styles.subtitulo}>
                        Preencha os dados do professor.
                    </p>

                    <form onSubmit={cadastrarProfessor}>

                        <div className={styles.campo}>
                            <label htmlFor="nome">Nome do Professor</label>
                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite o nome do professor"
                                required
                            />
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="nif">NIF / Matrícula</label>
                            <input
                                id="nif"
                                type="text"
                                value={nif}
                                onChange={(e) => setNif(e.target.value)}
                                placeholder="Digite o NIF ou matrícula"
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
                            <label htmlFor="disciplina">
                                Disciplina Responsável
                            </label>

                            <select
                                id="disciplina"
                                value={disciplina_id}
                                onChange={(e) => setDisciplinaId(e.target.value)}
                                required
                                disabled={carregando || disciplinas.length === 0}
                            >
                                <option value="">
                                    {carregando
                                        ? "Carregando disciplinas..."
                                        : "Selecione uma disciplina"}
                                </option>

                                {disciplinas.map((disciplina) => (
                                    <option
                                        key={disciplina.id_disciplina}
                                        value={disciplina.id_disciplina}
                                    >
                                        {disciplina.nome}
                                    </option>
                                ))}
                            </select>

                            {!carregando && disciplinas.length === 0 && (
                                <small>
                                    Nenhuma disciplina cadastrada.
                                </small>
                            )}
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="total">
                                Total de Aulas por Semana
                            </label>

                            <input
                                id="total"
                                type="number"
                                min="1"
                                step="1"
                                value={total_aulas}
                                onChange={(e) => setTotalAulas(e.target.value)}
                                placeholder="Exemplo: 12"
                                required
                            />
                        </div>

                        <div className={styles.botoes}>
                            <button
                                type="submit"
                                disabled={salvando || carregando}
                            >
                                {salvando ? "Salvando..." : "Cadastrar Professor"}
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
