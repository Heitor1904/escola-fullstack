
import db from "../../../db/banco";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;

        const {
            nome,
            nif,
            dias_aula,
            disciplina_id,
            total_aulas
        } = await request.json();

        if (!nome || !nif || !dias_aula || !disciplina_id || !total_aulas) {
            return NextResponse.json(
                { mensagem: "Preencha todos os campos." },
                { status: 400 }
            );
        }

        const resultado = db.prepare(`
            UPDATE professores
            SET nome = ?,
                nif = ?,
                dias_aula = ?,
                disciplina_id = ?,
                total_aulas = ?
            WHERE id_professor = ?
        `).run(
            nome,
            nif,
            dias_aula,
            Number(disciplina_id),
            Number(total_aulas),
            Number(id)
        );

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Professor não encontrado." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "Professor atualizado com sucesso!"
        });

    } catch (erro) {
        console.error("Erro ao atualizar professor:", erro);

        if (erro.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return NextResponse.json(
                { mensagem: "Este NIF já está cadastrado." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { mensagem: "Erro ao atualizar professor." },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        const resultado = db.prepare(`
            DELETE FROM professores
            WHERE id_professor = ?
        `).run(Number(id));

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Professor não encontrado." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "Professor excluído com sucesso!"
        });

    } catch (erro) {
        console.error("Erro ao excluir professor:", erro);

        return NextResponse.json(
            { mensagem: "Erro ao excluir professor." },
            { status: 500 }
        );
    }
}
