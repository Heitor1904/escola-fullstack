<<<<<<< HEAD

import db from "../../db/banco";
import { NextResponse } from "next/server";

// LISTAR ALUNOS
export async function GET() {
    try {
        const alunos = db
            .prepare("SELECT * FROM alunos ORDER BY nome")
            .all();

        return NextResponse.json(alunos);
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

=======
import db from "../../db/banco";
import { NextResponse } from "next/server";

export async function GET(){
    const alunos = db.prepare('SELECT * FROM alunos ORDER BY nome').all()
    return NextResponse.json(alunos)
    
}

export async function POST(request){
    try {
        const dados =  await request.json();
        const sql = db.prepare(`INSERT INTO alunos (nome, idade, serie, ra) VALUES (?,?,?,?)`)
>>>>>>> 6722cf1 (Atualizando projeto)
        sql.run(
            dados.nome,
            dados.idade,
            dados.serie,
            dados.ra
<<<<<<< HEAD
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
export async function PUT(request) {
    try {
        const dados = await request.json();

=======
        )
        return NextResponse.json({
            mensagem: 'Aluno salvo com sucesso!'
        });
    } catch (error) {
        console.error('Erro ao salvar usuário ', error)
    }
}


export async function PUT(request) {
    try {
        const dados = await request.json();
>>>>>>> 6722cf1 (Atualizando projeto)
        const sql = db.prepare(`
            UPDATE alunos
            SET nome = ?, idade = ?, serie = ?, ra = ?
            WHERE id_aluno = ?
        `);
<<<<<<< HEAD

        const resultado = sql.run(
            dados.nome,
            dados.idade,
            dados.serie,
            dados.ra,
            dados.id_aluno
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
export async function DELETE(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            DELETE FROM alunos
            WHERE id_aluno = ?
        `);

        const resultado = sql.run(dados.id_aluno);

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

=======
        sql.run(dados.nome, dados.idade, dados.serie, dados.ra, dados.id_aluno);
        return NextResponse.json({
            mensagem: "Aluno atualizado com sucesso!"
        });
    } catch (erro) {
        console.error('Erro ao editar o aluno ', erro);
        return NextResponse.json({ erro: "Erro ao editar o aluno." }, { status: 500 });
    };
}

export async function DELETE(request) {
    try {
        const dados = await request.json();
        console.log(await dados.id_aluno)
        const sql = db.prepare(`DELETE FROM alunos WHERE id_aluno = ?`);
        sql.run(dados.id_aluno);
        return NextResponse.json({
            mensagem: "Aluno excluído com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao excluir o aluno ', error);
        return NextResponse.json({ erro: "Erro ao excluir o aluno." }, { status: 500 });
    };
}
>>>>>>> 6722cf1 (Atualizando projeto)
