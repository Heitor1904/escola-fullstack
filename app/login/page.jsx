
'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function Login() {
    const router = useRouter();

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    function entrar(e) {
        e.preventDefault();

        router.push("/");
    }

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1>Sistema Escolar - SESI</h1>
                <h2>Login</h2>

                <form onSubmit={entrar}>
                    <label>Usuário</label>
                    <input
                        type="text"
                        placeholder="Digite seu usuário"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
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
                        Entrar no sistema
                    </button>
                </form>

                <p>Ainda não possui cadastro?</p>

                <button
                    className={styles.secundario}
                    onClick={() => router.push("/registro")}
                >
                    Registrar-se
                </button>
            </div>
        </main>
    );
}
