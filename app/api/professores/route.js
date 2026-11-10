
import db from "../../db/banco";
import { NextResponse } from "next/server";

// Buscar todos os professores
export async function GET() {
    try {
        const professores = db.prepare(`
            SELECT
                professores.id_professor,
                professores.nome,
                professores.nif,
                professores.dias_aula,
                professores.disciplina_id,
                professores.total_aulas,
                disciplinas.nome AS nome_disciplina
            FROM professores
            INNER JOIN disciplinas
            ON professores.disciplina_id = disciplinas.id_disciplina
            ORDER BY professores.id_professor
        `).all();

        return NextResponse.json(professores);

    } catch (erro) {
        console.error("Erro ao buscar professores:", erro);

        return NextResponse.json(
            { mensagem: "Erro ao buscar professores." },
            { status: 500 }
        );
    }
}

// Cadastrar professor
export async function POST(request) {
    try {
        const {
            nome,
            nif,
            dias_aula,
            disciplina_id,
            total_aulas
        } = await request.json();

        if (
            !nome ||
            !nif ||
            !dias_aula ||
            !disciplina_id ||
            total_aulas === undefined
        ) {
            return NextResponse.json(
                { mensagem: "Preencha todos os campos." },
                { status: 400 }
            );
        }

        if (Number(total_aulas) <= 0 || !Number.isInteger(Number(total_aulas))) {
            return NextResponse.json(
                { mensagem: "O total de aulas deve ser um número inteiro maior que zero." },
                { status: 400 }
            );
        }

        const cadastro = db.prepare(`
            INSERT INTO professores
            (nome, nif, dias_aula, disciplina_id, total_aulas)
            VALUES (?, ?, ?, ?, ?)
        `).run(
            nome.trim(),
            nif.trim(),
            dias_aula,
            Number(disciplina_id),
            Number(total_aulas)
        );

        return NextResponse.json(
            {
                mensagem: "Professor cadastrado com sucesso!",
                id_professor: cadastro.lastInsertRowid
            },
            { status: 201 }
        );

    } catch (erro) {
        console.error("Erro ao cadastrar professor:", erro);

        if (erro.message.includes("UNIQUE constraint failed")) {
            return NextResponse.json(
                { mensagem: "Esse NIF já está cadastrado." },
                { status: 409 }
            );
        }

        if (erro.message.includes("FOREIGN KEY constraint failed")) {
            return NextResponse.json(
                { mensagem: "A disciplina selecionada não existe." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { mensagem: "Erro ao cadastrar professor." },
            { status: 500 }
        );
    }
}
