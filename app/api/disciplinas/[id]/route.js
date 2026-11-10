


import db from "../../../db/banco";
import { NextResponse } from "next/server";

// EDITAR DISCIPLINA
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const { nome, pontuacao_minima } = await request.json();

        if (!nome || pontuacao_minima === undefined ||
            pontuacao_minima === null || pontuacao_minima === "") {
            return NextResponse.json(
                { mensagem: "Preencha todos os campos" },
                { status: 400 }
            );
        }

        const pontuacao = Number(pontuacao_minima);

        if (!Number.isFinite(pontuacao) || pontuacao < 0) {
            return NextResponse.json(
                { mensagem: "Pontuação mínima inválida" },
                { status: 400 }
            );
        }

        const resultado = db.prepare(`
            UPDATE disciplinas
            SET nome = ?, pontuacao_minima = ?
            WHERE id_disciplina = ?
        `).run(nome.trim(), pontuacao, id);

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Disciplina não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "Disciplina atualizada com sucesso!"
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { mensagem: "Erro ao editar disciplina" },
            { status: 500 }
        );
    }
}

// EXCLUIR DISCIPLINA
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        const resultado = db.prepare(`
            DELETE FROM disciplinas
            WHERE id_disciplina = ?
        `).run(id);

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Disciplina não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "Disciplina excluída com sucesso!"
        });

    } catch (error) {
        console.error(error);

        if (error.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
            return NextResponse.json(
                { mensagem: "Não é possível excluir: existem professores vinculados a esta disciplina." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { mensagem: "Erro ao excluir disciplina" },
            { status: 500 }
        );
    }
}
