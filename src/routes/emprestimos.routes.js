import { Router } from 'express';
import { conectar } from '../database.js';

const router = Router();

router.post('/emprestimos', async (req, res) => {
  const conn = await conectar();
  const { usuario_id, livro_id } = req.body;

  await conn.query(
    'INSERT INTO emprestimos (usuario_id, livro_id) VALUES (?, ?)',
    [usuario_id, livro_id]
  );

  await conn.query(
    'UPDATE livros SET disponivel = false WHERE id = ?',
    [livro_id]
  );

  res.status(201).send('Empréstimo realizado');
});

export default router;