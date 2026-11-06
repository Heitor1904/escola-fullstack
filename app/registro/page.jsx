
'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function Registro() {
    const router = useRouter();

    const [usuario, setUsuario] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    function salvarRegistro(e) {
        e.preventDefault();

        router.push("/login");
    }

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1>Sistema Escolar - SESI</h1>
                <h2>Registro</h2>

                <form onSubmit={salvarRegistro}>
                    <label>Usuário</label>
                    <input
                        type="text"
                        placeholder="Digite seu usuário"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />

                    <label>Nome</label>
                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    <label>Senha</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Salvar registro
                    </button>
                </form>

                <p>Já possui cadastro?</p>

                <button
                    className={styles.secundario}
                    onClick={() => router.push("/login")}
                >
                    Ir para login
                </button>
            </div>
        </main>
    );
}
