
'use client';

import { useEffect, useState } from "react";
import Header from "../componentes/header";
import styles from "./page.module.css";

export default function ListAlunos() {

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

    return (
        <>
            <Header />

            <main className={styles.container}>

                <div className={styles.card}>

                    <h2>Lista de alunos</h2>

                    <p className={styles.subtitulo}>
                        Alunos cadastrados no sistema
                    </p>

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

                            </tbody>

                        </table>

                    </div>

                </div>

            </main>
        </>
    );
}

