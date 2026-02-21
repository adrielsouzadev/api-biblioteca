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

// Rota para devolver o livro
router.put('/livros/:id/devolver', async (req, res) => {
    try {
        const { id } = req.params;
        const conn = await conectar();
        
        // Volta o status do livro para 'true' (disponível)
        await conn.query('UPDATE livros SET disponivel = true WHERE id = ?', [id]);
        
        // Remove o registro de empréstimo para limpar o histórico
        await conn.query('DELETE FROM emprestimos WHERE livro_id = ?', [id]);
        
        await conn.end();
        res.json({ mensagem: 'Livro devolvido com sucesso!' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao devolver livro' });
    }
});

// Rota para excluir um livro definitivamente
router.delete('/livros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const conn = await conectar();
        
        // Remover registro de empréstimo do livro
        await conn.query('DELETE FROM emprestimos WHERE livro_id = ?', [id]);
        
        // Excluir o livro
        await conn.query('DELETE FROM livros WHERE id = ?', [id]);
        
        await conn.end();
        res.json({ mensagem: 'Livro removido do sistema!' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao excluir livro' });
    }
});

export default router;