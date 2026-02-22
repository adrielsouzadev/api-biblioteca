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

// Rota para listar detalhes dos empréstimos ativos
router.get('/emprestimos', async (req, res) => {
    try {
        const conn = await conectar();
        const sql = `
            SELECT e.id, u.nome AS usuario, l.titulo AS livro, e.data_emprestimo 
            FROM emprestimos e
            JOIN usuarios u ON e.usuario_id = u.id
            JOIN livros l ON e.livro_id = l.id
        `;
        const [resultados] = await conn.query(sql);
        await conn.end();
        res.json(resultados);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar empréstimos' });
    }
});

export default router;