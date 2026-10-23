import db from "../../../db/banco";
import { NextResponse } from "next/server";

// LISTAR ALUNOS
export async function GET(request, { params }) {
    try {
        const { id } = await params;

        // Se houver um ID na URL, busca o aluno específico; se não, lista todos
        const aluno = db
            .prepare("SELECT * FROM alunos WHERE id_aluno = ?")
            .get(id);

        if (!aluno) {
            // Se não achar por ID, busca a lista completa como no seu código original
            const alunos = db
                .prepare("SELECT * FROM alunos ORDER BY nome")
                .all();

            return NextResponse.json(alunos);
        }

        return NextResponse.json(aluno);
    } catch (error) {
        console.error("Erro ao listar alunos:", error);

        return NextResponse.json(
            { mensagem: "Erro ao listar alunos" },
            { status: 500 }
        );
    }
}

// SALVAR ALUNO
export async function POST(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            INSERT INTO alunos (nome, idade, serie, ra)
            VALUES (?, ?, ?, ?)
        `);

        sql.run(
            dados.nome,
            dados.idade,
            dados.serie,
            dados.ra
        );

        return NextResponse.json({
            mensagem: "Aluno salvo com sucesso"
        });

    } catch (error) {
        console.error("Erro ao salvar aluno:", error);

        return NextResponse.json(
            { mensagem: "Erro ao salvar aluno" },
            { status: 500 }
        );
    }
}

// EDITAR ALUNO
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const dados = await request.json();

        const sql = db.prepare(`
            UPDATE alunos
            SET nome = ?, idade = ?, serie = ?, ra = ?
            WHERE id_aluno = ?
        `);

        // Usa o id da URL ou o id enviado no body (dados.id_aluno)
        const idParaAtualizar = id || dados.id_aluno;

        const resultado = sql.run(
            dados.nome,
            dados.idade,
            dados.serie,
            dados.ra,
            idParaAtualizar
        );

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Aluno não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "Aluno atualizado com sucesso"
        });

    } catch (error) {
        console.error("Erro ao editar aluno:", error);

        return NextResponse.json(
            { mensagem: "Erro ao editar aluno" },
            { status: 500 }
        );
    }
}

// EXCLUIR ALUNO
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        
        let idParaExcluir = id;

        // Se o id não veio na URL, tenta pegar do JSON como no seu código original
        if (!idParaExcluir) {
            const dados = await request.json();
            idParaExcluir = dados.id_aluno;
        }

        const sql = db.prepare(`
            DELETE FROM alunos
            WHERE id_aluno = ?
        `);

        const resultado = sql.run(idParaExcluir);

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Aluno não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "Aluno excluído com sucesso"
        });

    } catch (error) {
        console.error("Erro ao excluir aluno:", error);

        return NextResponse.json(
            { mensagem: "Erro ao excluir aluno" },
            { status: 500 }
        );
    }
}