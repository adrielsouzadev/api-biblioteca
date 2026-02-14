const api = "http://localhost:3000";

async function cadastrarUsuario() {
  const nome = document.getElementById('nomeUsuario').value;
  await fetch(`${api}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });
  alert('Usuário cadastrado!');
}

async function cadastrarLivro() {
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;

  await fetch(`${api}/livros`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, autor })
  });
  alert('Livro cadastrado!');
}

async function buscarLivros() {
  const busca = document.getElementById('busca').value;
  const res = await fetch(`${api}/livros?titulo=${busca}`);
  const livros = await res.json();

  const ul = document.getElementById('listaLivros');
  ul.innerHTML = '';

  livros.forEach(l => {
    const li = document.createElement('li');
    li.innerText = `ID:${l.id} | ${l.titulo} - ${l.autor} | Disp: ${l.disponivel}`;
    ul.appendChild(li);
  });
}

async function emprestarLivro() {
  const usuario_id = document.getElementById('usuarioId').value;
  const livro_id = document.getElementById('livroId').value;

  await fetch(`${api}/emprestimos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario_id, livro_id })
  });

  alert('Empréstimo realizado!');
}

buscarLivros();