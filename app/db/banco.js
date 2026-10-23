import Database from "better-sqlite3";
<<<<<<< HEAD

const db = new Database("./app/db/escola.db");
=======
import path from "path";

const caminhoBanco = path.join(process.cwd(), "app", "db", "escola.db");

const db = new Database(caminhoBanco);
>>>>>>> 6722cf1 (Atualizando projeto)

db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS alunos (
        id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        idade INTEGER NOT NULL,
        serie TEXT NOT NULL,
        ra TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS notas (
        id_notas INTEGER PRIMARY KEY AUTOINCREMENT,
        aluno_id INTEGER NOT NULL,
        t1 REAL NOT NULL,
        t2 REAL NOT NULL,
        n1 REAL NOT NULL,
        n2 REAL NOT NULL,
        n3 REAL NOT NULL,
        FOREIGN KEY (aluno_id)
        REFERENCES alunos(id_aluno)
        ON DELETE CASCADE
    );
`);

<<<<<<< HEAD
console.log('Banco criado com sucesso!')
=======
console.log("Banco conectado em:", caminhoBanco);
>>>>>>> 6722cf1 (Atualizando projeto)

export default db;