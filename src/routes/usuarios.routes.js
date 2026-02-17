import { Router } from 'express';
import { conectar } from '../database.js';

const router = Router();

// Rota para cadastrar usuário
router.post('/usuarios', async (req, res) => {
    try {
        const { nome } = req.body;
        const conn = await conectar();
        await conn.query('INSERT INTO usuarios (nome) VALUES (?)', [nome]);
        await conn.end();
        res.status(201).json({ mensagem: 'Usuário criado!' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
});

// Rota para listar usuários
router.get('/usuarios', async (req, res) => {
    try {
        const conn = await conectar();
        const [usuarios] = await conn.query('SELECT * FROM usuarios');
        await conn.end();
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
});

export default router;