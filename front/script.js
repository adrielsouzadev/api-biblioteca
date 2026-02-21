const API_URL = "http://localhost:3000";

// Função inicial
async function carregarDados() {
    await buscarLivros();
    await buscarUsuarios();
}

// Função para livros
async function buscarLivros() {
    try {
        const resposta = await fetch(`${API_URL}/livros`);
        const livros = await resposta.json();
        
        const lista = document.getElementById('listaLivros');
        const selectLivro = document.getElementById('selectLivro');
        
        lista.innerHTML = '';
        selectLivro.innerHTML = '<option value="">Selecione o Livro</option>';

        livros.forEach(livro => {
            const item = document.createElement('li');
            item.className = livro.disponivel ? 'disponivel' : 'indisponivel';
    
            // Se o livro NÃO estiver disponível, adicionamos o botão de devolver
            const botaoDevolver = !livro.disponivel 
                ? `<button class="btn-devolver" onclick="devolverLivro(${livro.id})">Devolver</button>` : '';

    item.innerHTML = `
        <strong>${livro.titulo}</strong> - ${livro.autor} 
        <span>(${livro.disponivel ? 'Disponível' : 'Emprestado'})</span>
        ${botaoDevolver}
        <button class="btn-excluir" onclick="excluirLivro(${livro.id})">Excluir</button>
`;
    lista.appendChild(item);

            // Adiciona no seletor de empréstimo (apenas se estiver disponível)
            if (livro.disponivel) {
                const opcao = document.createElement('option');
                opcao.value = livro.id;
                opcao.textContent = livro.titulo;
                selectLivro.appendChild(opcao);
            }
        });
    } catch (erro) {
        console.error("Erro ao carregar livros:", erro);
    }
}

async function cadastrarLivro() {
    const titulo = document.getElementById('tituloLivro').value;
    const autor = document.getElementById('autorLivro').value;

    if (!titulo || !autor) return console.warn("Preencha título e autor!");

    await fetch(`${API_URL}/livros`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, autor })
    });

    document.getElementById('tituloLivro').value = '';
    document.getElementById('autorLivro').value = '';
    buscarLivros();
}

// Função para usuário
async function buscarUsuarios() {
    try {
        const resposta = await fetch(`${API_URL}/usuarios`);
        const usuarios = await resposta.json();
        
        const lista = document.getElementById('listaUsuarios');
        const selectUsuario = document.getElementById('selectUsuario');
        
        lista.innerHTML = '';
        selectUsuario.innerHTML = '<option value="">Selecione o Usuário</option>';

        usuarios.forEach(u => {
            lista.innerHTML += `<li>👤 ${u.nome}</li>`;
            
            const opcao = document.createElement('option');
            opcao.value = u.id;
            opcao.textContent = u.nome;
            selectUsuario.appendChild(opcao);
        });
    } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
    }
}

async function cadastrarUsuario() {
    const nome = document.getElementById('nomeUsuario').value;
    if (!nome) return;

    await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
    });

    document.getElementById('nomeUsuario').value = '';
    buscarUsuarios();
}

// Função para empréstimos
async function realizarEmprestimo() {
    const usuario_id = document.getElementById('selectUsuario').value;
    const livro_id = document.getElementById('selectLivro').value;

    if (!usuario_id || !livro_id) {
        console.warn("Selecione um usuário e um livro!");
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/emprestimos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id, livro_id })
        });

        if (resposta.ok) {
            // Recarrega as listas para atualizar o status de "disponível" para "emprestado"
            carregarDados();
        }
    } catch (erro) {
        console.error("Erro ao realizar empréstimo:", erro);
    }
}

// Função para devolver livro
async function devolverLivro(id) {
    try {
        const resposta = await fetch(`${API_URL}/livros/${id}/devolver`, {
            method: 'PUT'
        });

        if (resposta.ok) {
            carregarDados(); // Recarrega as listas e os seletores
        }
    } catch (erro) {
        console.error("Erro ao devolver livro:", erro);
    }
}

// Função para excluir um livro
async function excluirLivro(id) {
    if (!confirm("Tem certeza que deseja remover este livro?")) return;

    try {
        const resposta = await fetch(`${API_URL}/livros/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            buscarLivros();
        }
    } catch (erro) {
        console.error("Erro ao excluir livro:", erro);
    }
}

// Inicializa o sistema ao carregar a página
carregarDados();