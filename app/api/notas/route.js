import db from "../../db/banco";
import { NextResponse } from "next/server";

// LISTAR NOTAS
export async function GET() {
    try {
        const notas = db.prepare(`
            SELECT
                notas.id_notas,
                notas.aluno_id,
                alunos.nome,
                notas.t1,
                notas.t2,
                notas.n1,
                notas.n2,
                notas.n3
            FROM notas
            INNER JOIN alunos
                ON notas.aluno_id = alunos.id_aluno
            ORDER BY alunos.nome
        `).all();

        return NextResponse.json(notas);

    } catch (error) {
        console.error("Erro ao listar notas:", error);

        return NextResponse.json(
            { mensagem: "Erro ao listar notas" },
            { status: 500 }
        );
    }
}


// CADASTRAR NOTA
export async function POST(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            INSERT INTO notas
            (aluno_id, t1, t2, n1, n2, n3)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        sql.run(
            Number(dados.aluno_id),
            Number(dados.t1),
            Number(dados.t2),
            Number(dados.n1),
            Number(dados.n2),
            Number(dados.n3)
        );

        return NextResponse.json(
            { mensagem: "Notas cadastradas com sucesso" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erro ao cadastrar notas:", error);

        return NextResponse.json(
            { mensagem: "Erro ao cadastrar notas" },
            { status: 500 }
        );
    }
}


// EDITAR NOTA
export async function PUT(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            UPDATE notas
            SET
                aluno_id = ?,
                t1 = ?,
                t2 = ?,
                n1 = ?,
                n2 = ?,
                n3 = ?
            WHERE id_notas = ?
        `);

        const resultado = sql.run(
            Number(dados.aluno_id),
            Number(dados.t1),
            Number(dados.t2),
            Number(dados.n1),
            Number(dados.n2),
            Number(dados.n3),
            Number(dados.id_notas)
        );

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Nota não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "Notas atualizadas com sucesso"
        });

    } catch (error) {
        console.error("Erro ao editar notas:", error);

        return NextResponse.json(
            { mensagem: "Erro ao editar notas" },
            { status: 500 }
        );
    }
}


// DELETAR NOTA
export async function DELETE(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            DELETE FROM notas
            WHERE id_notas = ?
        `);

        const resultado = sql.run(
            Number(dados.id_notas)
        );

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Nota não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "Notas excluídas com sucesso"
        });

    } catch (error) {
        console.error("Erro ao excluir notas:", error);

        return NextResponse.json(
            { mensagem: "Erro ao excluir notas" },
            { status: 500 }
        );
    }
}