
'use client';

import { useState } from "react";
import Header from "../componentes/header";
import styles from "./page.module.css";

export default function CadAlunos() {

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [serie, setSerie] = useState('');
    const [ra, setRa] = useState('');

    function salvarAluno(e) {
        e.preventDefault();

        alert("Aluno cadastrado com sucesso!");

        setNome('');
        setIdade('');
        setSerie('');
        setRa('');
    }

    return (
        <>
            <Header />

            <main className={styles.container}>

                <div className={styles.card}>

                    <h2>Cadastro de Alunos</h2>

                    <p className={styles.subtitulo}>
                        Preencha os dados do aluno
                    </p>

                    <form onSubmit={salvarAluno}>

                        <div className={styles.campo}>
                            <label htmlFor="nome">Nome</label>

                            <input
                                id="nome"
                                type="text"
                                placeholder="Digite o nome do aluno"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>

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
                                    placeholder="Ex: 2º Ano"
                                    value={serie}
                                    onChange={(e) => setSerie(e.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="ra">RA</label>

                            <input
                                id="ra"
                                type="number"
                                placeholder="Digite o RA"
                                value={ra}
                                onChange={(e) => setRa(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit">
                            Salvar
                        </button>

                    </form>

                </div>

            </main>
        </>
    );
}

