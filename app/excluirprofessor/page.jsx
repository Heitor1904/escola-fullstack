
'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../componentes/header";
import styles from "./page.module.css";

export default function ExcluirProfessor() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const id = searchParams.get("id");

    const [professor, setProfessor] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        buscarProfessor();
    }, [id]);

    async function buscarProfessor() {
        try {
            const resposta = await fetch("/api/professores");
            const dados = await resposta.json();

            const encontrado = dados.find(
                (item) => String(item.id_professor) === String(id)
            );

            setProfessor(encontrado || null);
        } catch (erro) {
            console.error("Erro ao buscar professor:", erro);
        } finally {
            setCarregando(false);
        }
    }

    async function excluirProfessor() {
        try {
            const resposta = await fetch(`/api/professores/${id}`, {
                method: "DELETE"
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.mensagem || "Erro ao excluir professor.");
                return;
            }

            alert("Professor excluído com sucesso!");
            router.push("/listprofessores");

        } catch (erro) {
            console.error("Erro:", erro);
            alert("Não foi possível excluir o professor.");
        }
    }

    if (carregando) {
        return <p>Carregando...</p>;
    }

    if (!professor) {
        return (
            <>
                <Header />
                <main className={styles.container}>
                    <div className={styles.card}>
                        <h2>Professor não encontrado!</h2>
                        <button onClick={() => router.push("/listprofessores")}>
                            Voltar
                        </button>
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
                    <h1>Excluir Professor</h1>

                    <p className={styles.aviso}>
                        Tem certeza de que deseja excluir este professor?
                    </p>

                    <div className={styles.dados}>
                        <p><strong>Nome:</strong> {professor.nome}</p>
                        <p><strong>NIF:</strong> {professor.nif}</p>
                        <p><strong>Dias de aula:</strong> {professor.dias_aula}</p>
                        <p><strong>Disciplina:</strong> {professor.nome_disciplina}</p>
                        <p><strong>Total de aulas:</strong> {professor.total_aulas}</p>
                    </div>

                    <div className={styles.botoes}>
                        <button
                            className={styles.cancelar}
                            onClick={() => router.push("/listprofessores")}
                        >
                            Cancelar
                        </button>

                        <button
                            className={styles.excluir}
                            onClick={excluirProfessor}
                        >
                            Confirmar exclusão
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
