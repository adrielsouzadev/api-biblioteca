import { Router } from 'express';
import { conectar } from '../database.js';

const router = Router();

router.post('/emprestimos', async (req, res) => {
    try {
        const { usuario_id, livro_id } = req.body;
        const conn = await conectar();

        // Registra o empréstimo
        await conn.query('INSERT INTO emprestimos (usuario_id, livro_id) VALUES (?, ?)', [usuario_id, livro_id]);

        // Atualiza o livro para não disponível
        await conn.query('UPDATE livros SET disponivel = false WHERE id = ?', [livro_id]);

        await conn.end();
        res.status(201).json({ mensagem: 'Empréstimo realizado!' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao processar empréstimo' });
    }
});

export default router;