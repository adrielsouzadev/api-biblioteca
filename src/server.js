import express from 'express';
import cors from 'cors';

import livrosRoutes from './routes/livros.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import emprestimosRoutes from './routes/emprestimos.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(livrosRoutes);
app.use(usuariosRoutes);
app.use(emprestimosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});