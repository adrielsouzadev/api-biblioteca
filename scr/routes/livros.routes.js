import { Router }  from "express";
import { conectar } from "../database.js";

const router = Router();

router.post('/livros', async (req, res) => {
    const conn = await conectar();
    const { titulo, autor } = req.body;

    await conn.query(
        'INSERT INTO livros (titulo, autor, disponvel) VALUES (?, ?, true)',
        [titulo, autor]
    );

    res.status(201).send('Livro cadastrado');
});

router.get('/livros', async (req, res) => {
    const conn = await conectar();
    const { titulo } = req.query;

    if (titulo) {
        const [livros] = await conn.query(
            'SELECT * FROM livros WHERE titulo LIKE ?',
            [`%${titulo}%`]
        );
        return res.json(livros);
    }

    const [livros] = await conn.query('SELECT * FROM livros');
    res.json(livros);
});

router.get('/livros/:id', async (req, res) => {
    const conn = await conectar();

    const [livro] = await conn.query(
        'SELECT * FROM livros WHERE id = ?',
        [req.params,id]
    );
        res.json(livro[0]);
});

export default router;