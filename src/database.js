import mysql from 'mysql2/promise';

export async function conectar() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'biblioteca'
    });
}