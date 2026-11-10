
import db from "../../db/banco";
import { NextResponse } from "next/server";

// LISTAR DISCIPLINAS
export async function GET() {
    try {
        const disciplinas = db.prepare(`
            SELECT * FROM disciplinas
            ORDER BY id_disciplina DESC
        `).all();

        return NextResponse.json(disciplinas);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { mensagem: "Erro ao buscar disciplinas" },
            { status: 500 }
        );
    }
}

// CADASTRAR DISCIPLINA
export async function POST(request) {
    try {
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
            INSERT INTO disciplinas (nome, pontuacao_minima)
            VALUES (?, ?)
        `).run(nome.trim(), pontuacao);

        return NextResponse.json(
            {
                mensagem: "Disciplina cadastrada com sucesso!",
                id_disciplina: resultado.lastInsertRowid
            },
            { status: 201 }
        );

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { mensagem: "Erro ao cadastrar disciplina" },
            { status: 500 }
        );
    }
}
