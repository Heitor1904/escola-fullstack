'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../componentes/header";
import styles from "./page.module.css";

export default function CadAluno() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [serie, setSerie] = useState('');
    const [ra, setRa] = useState('');

<<<<<<< HEAD
    async function salvarAluno(e) {
        e.preventDefault();

        try {
            const resposta = await fetch("/api/alunos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    idade: Number(idade),
                    serie,
                    ra
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem);
=======
    const router = useRouter();

    async function cadastrarAluno(evento) {
        evento.preventDefault();

        try {
            const resposta = await fetch("/api/alunos/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    idade: Number(idade),
                    serie,
                    ra
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem || dados.erro || "Erro ao cadastrar aluno");
>>>>>>> 6722cf1 (Atualizando projeto)
                return;
            }

            alert("Aluno cadastrado com sucesso!");

<<<<<<< HEAD
=======
            // Limpa os campos
>>>>>>> 6722cf1 (Atualizando projeto)
            setNome('');
            setIdade('');
            setSerie('');
            setRa('');

<<<<<<< HEAD
        } catch (error) {
            console.error(error);
=======
            // Redireciona para a listagem
            router.push("/listalunos");

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
>>>>>>> 6722cf1 (Atualizando projeto)
            alert("Erro ao cadastrar aluno");
        }
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title || styles.titulo}>
                        Cadastro de Alunos
                    </h2>

                    <p className={styles.subtitle || styles.subtitulo}>
                        Preencha os dados do aluno para realizar o cadastro no sistema.
                    </p>

                    <form className={styles.form} onSubmit={cadastrarAluno}>
                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="nome">Nome</label>
                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite o nome do aluno"
                                required
                            />
                        </div>

<<<<<<< HEAD
                        <div className={styles.linha}>

                            <div className={styles.campo}>
                                <label htmlFor="idade">Idade</label>

                                <input
                                    id="idade"
                                    type="number"
                                    placeholder="Digite a idade"
                                    value={idade}
                                    onChange={(e) => setIdade(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="serie">Série</label>

                                <input
                                    id="serie"
                                    type="text"
                                    placeholder="Ex: 3B"
                                    value={serie}
                                    onChange={(e) => setSerie(e.target.value)}
                                    required
                                />
                            </div>

=======
                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="idade">Idade</label>
                            <input
                                id="idade"
                                type="number"
                                value={idade}
                                onChange={(e) => setIdade(e.target.value)}
                                placeholder="Digite a idade"
                                required
                            />
>>>>>>> 6722cf1 (Atualizando projeto)
                        </div>

                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="serie">Série</label>
                            <input
                                id="serie"
                                type="text"
                                value={serie}
                                onChange={(e) => setSerie(e.target.value)}
                                placeholder="Digite a série"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup || styles.campo}>
                            <label htmlFor="ra">RA</label>
                            <input
                                id="ra"
                                type="text"
                                value={ra}
                                onChange={(e) => setRa(e.target.value)}
                                placeholder="Digite o RA"
                                required
                            />
                        </div>

                        <button className={styles.button || styles.botao} type="submit">
                            Cadastrar Aluno
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}