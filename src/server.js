import express from 'express';
import cors from 'cors';

import livros from './routes/livros.routes.js';
import usuarios from './routes/usuarios.routes.js';
import empresitmos from './routes/emprestimos.routes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use(livros);
app.use(usuarios);
app.use(empresitmos);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});