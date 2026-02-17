import mysql from 'mysql2/promise';

export async function conectar() {
    try {
        const conexao = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'biblioteca'
        });

        return conexao;
    } catch (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro.message);
        throw erro;
    }
}