import { Router } from "express";
import { conectar } from "../database.js";

const router = Router();

router.post('/usuarios', async (req, res) => {
    const conn = await conectar();
    const { nome } = req.body;

    await conn.query(
        'INSERT INTO usuarios (nome) VALUES (?)',
        [nome]
    );
    res.status(201).send('Usuário cadastrado');
});

router.get('/usuarios/:id', async (req, res) => {
    const conn = await conectar();

    const [usuario] = await conn.query(
        'SELECT * FROM usuarios WHERE id = ?',
        [req.params.id]
    );

    res.json(usuario[0]);
});

export default router;