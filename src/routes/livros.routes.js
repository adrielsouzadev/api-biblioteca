import { Router } from 'express';
import { conectar } from '../database.js';

const router = Router();

// Rota para cadastrar um livro
router.post('/livros', async (req, res) => {
    try {
        const { titulo, autor } = req.body;
        const conn = await conectar();
        const sql = 'INSERT INTO livros (titulo, autor) VALUES (?, ?)';
        await conn.query(sql, [titulo, autor]);
        await conn.end();
        res.status(201).json({ mensagem: 'Livro cadastrado com sucesso!' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao cadastrar livro' });
    }
});

// Rota para listar todos os livros
router.get('/livros', async (req, res) => {
    try {
        const conn = await conectar();
        const [resultados] = await conn.query('SELECT * FROM livros');
        await conn.end();
        res.json(resultados);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar livros' });
    }
});

export default router;