<<<<<<< HEAD
=======

>>>>>>> 6722cf1 (Atualizando projeto)
import db from "../../db/banco";
import { NextResponse } from "next/server";

// LISTAR NOTAS
export async function GET() {
    try {
        const notas = db.prepare(`
            SELECT
                notas.id_notas,
<<<<<<< HEAD
                notas.aluno_id,
                alunos.nome,
=======
                alunos.nome,
                alunos.ra,
                notas.aluno_id,
>>>>>>> 6722cf1 (Atualizando projeto)
                notas.t1,
                notas.t2,
                notas.n1,
                notas.n2,
                notas.n3
            FROM notas
<<<<<<< HEAD
            INNER JOIN alunos
                ON notas.aluno_id = alunos.id_aluno
=======
            INNER JOIN alunos ON notas.aluno_id = alunos.id_aluno
>>>>>>> 6722cf1 (Atualizando projeto)
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


<<<<<<< HEAD
// CADASTRAR NOTA
=======
// SALVAR NOTA
>>>>>>> 6722cf1 (Atualizando projeto)
export async function POST(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            INSERT INTO notas
            (aluno_id, t1, t2, n1, n2, n3)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        sql.run(
<<<<<<< HEAD
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
=======
            dados.aluno_id,
            dados.t1,
            dados.t2,
            dados.n1,
            dados.n2,
            dados.n3
        );

        return NextResponse.json({
            mensagem: "Nota salva com sucesso"
        });

    } catch (error) {
        console.error("Erro ao salvar nota:", error);

        return NextResponse.json(
            { mensagem: "Erro ao salvar nota" },
>>>>>>> 6722cf1 (Atualizando projeto)
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
<<<<<<< HEAD
            Number(dados.aluno_id),
            Number(dados.t1),
            Number(dados.t2),
            Number(dados.n1),
            Number(dados.n2),
            Number(dados.n3),
            Number(dados.id_notas)
=======
            dados.aluno_id,
            dados.t1,
            dados.t2,
            dados.n1,
            dados.n2,
            dados.n3,
            dados.id_notas
>>>>>>> 6722cf1 (Atualizando projeto)
        );

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Nota não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({
<<<<<<< HEAD
            mensagem: "Notas atualizadas com sucesso"
        });

    } catch (error) {
        console.error("Erro ao editar notas:", error);

        return NextResponse.json(
            { mensagem: "Erro ao editar notas" },
=======
            mensagem: "Nota atualizada com sucesso"
        });

    } catch (error) {
        console.error("Erro ao editar nota:", error);

        return NextResponse.json(
            { mensagem: "Erro ao editar nota" },
>>>>>>> 6722cf1 (Atualizando projeto)
            { status: 500 }
        );
    }
}


<<<<<<< HEAD
// DELETAR NOTA
=======
// EXCLUIR NOTA
>>>>>>> 6722cf1 (Atualizando projeto)
export async function DELETE(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            DELETE FROM notas
            WHERE id_notas = ?
        `);

<<<<<<< HEAD
        const resultado = sql.run(
            Number(dados.id_notas)
        );
=======
        const resultado = sql.run(dados.id_notas);
>>>>>>> 6722cf1 (Atualizando projeto)

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Nota não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({
<<<<<<< HEAD
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
=======
            mensagem: "Nota excluída com sucesso"
        });

    } catch (error) {
        console.error("Erro ao excluir nota:", error);

        return NextResponse.json(
            { mensagem: "Erro ao excluir nota" },
            { status: 500 }
        );
    }
}

>>>>>>> 6722cf1 (Atualizando projeto)
