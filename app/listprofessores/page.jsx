
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../componentes/header";
import styles from "./page.module.css";

export default function ListProfessores() {

    const router = useRouter();

    const [professores, setProfessores] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        buscarProfessores();
    }, []);

    async function buscarProfessores() {
        try {
            setCarregando(true);

            const resposta = await fetch("/api/professores");
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error("Erro ao buscar professores");
            }

            setProfessores(dados);

        } catch (erro) {
            console.error("Erro ao buscar professores:", erro);
            alert("Erro ao carregar os professores.");
        } finally {
            setCarregando(false);
        }
    }

    const professoresFiltrados = professores.filter((professor) =>
        String(professor.id_professor).includes(pesquisa) ||
        professor.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        professor.nif.toLowerCase().includes(pesquisa.toLowerCase()) ||
        professor.nome_disciplina.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <>
            <Header />

            <main className={styles.container}>

                <div className={styles.card}>

                    <div className={styles.topo}>
                        <div>
                            <h2>Lista de Professores</h2>
                            <p>Professores cadastrados no sistema escolar.</p>
                        </div>

                        <button
                            onClick={() => router.push("/cadprofessores")}
                        >
                            + Novo Professor
                        </button>
                    </div>

                    <div className={styles.pesquisa}>
                        <input
                            type="text"
                            placeholder="Pesquisar por nome, ID, NIF ou disciplina..."
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                        />
                    </div>

                    <p className={styles.quantidade}>
                        Total de professores: {professores.length}
                    </p>

                    {carregando ? (

                        <p>Carregando professores...</p>

                    ) : professoresFiltrados.length === 0 ? (

                        <p className={styles.vazio}>
                            Nenhum professor encontrado.
                        </p>

                    ) : (

                        <div className={styles.tabelaResponsiva}>
                            <table>

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>NIF / Matrícula</th>
                                        <th>Dias de Aula</th>
                                        <th>Disciplina</th>
                                        <th>Total de Aulas</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {professoresFiltrados.map((professor) => (
                                        <tr key={professor.id_professor}>

                                            <td>{professor.id_professor}</td>
                                            <td>{professor.nome}</td>
                                            <td>{professor.nif}</td>
                                            <td>{professor.dias_aula}</td>
                                            <td>{professor.nome_disciplina}</td>
                                            <td>{professor.total_aulas}</td>

                                            <td>
                                                <div className={styles.acoes}>
                                                    <button
                                                        className={styles.editar}
                                                        onClick={() => router.push(
                                                            `/editaprofessor/${professor.id_professor}`
                                                        )}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        className={styles.excluir}
                                                        onClick={() => router.push(
                                                            `/excluirprofessor?id=${professor.id_professor}`
                                                        )}
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}

                </div>
            </main>
        </>
    );
}
