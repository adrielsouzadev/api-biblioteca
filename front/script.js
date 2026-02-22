const API_URL = "http://localhost:3000";

// Função inicial
async function carregarDados() {
    await buscarLivros();
    await buscarUsuarios();
    await buscarEmprestimos();
}

// Função para livros
async function buscarLivros() {
    try {
        const resposta = await fetch(`${API_URL}/livros`);
        const livros = await resposta.json();
        
        const lista = document.getElementById('listaLivros');
        const selectLivro = document.getElementById('selectLivro');
        
        lista.innerHTML = ''; 
        selectLivro.innerHTML = '';
        
        // Criamos a opção padrão do select
        const optPadrao = document.createElement('option');
        optPadrao.textContent = 'Selecione o Livro';
        optPadrao.value = '';
        selectLivro.appendChild(optPadrao);

        livros.forEach(livro => {
            const item = document.createElement('li');
            item.className = livro.disponivel ? 'disponivel' : 'indisponivel';

            // --- Bloco de Informações (Esquerda) ---
            const info = document.createElement('div');
            info.style.flex = "1";

            const tituloForte = document.createElement('strong');
            tituloForte.textContent = livro.titulo;
            
            const textoInfo = document.createTextNode(` - ${livro.autor} `);
            
            const spanStatus = document.createElement('span');
            spanStatus.textContent = `(${livro.disponivel ? 'Disponível' : 'Emprestado'})`;
            
            info.appendChild(tituloForte);
            info.appendChild(textoInfo);
            info.appendChild(spanStatus);
            item.appendChild(info);

            // --- Bloco de Ações/Botões (Direita) ---
            const acoes = document.createElement('div');
            acoes.className = 'acoes-botoes';

            if (!livro.disponivel) {
                const btnDevolver = document.createElement('button');
                btnDevolver.className = 'btn-devolver';
                btnDevolver.textContent = 'Devolver';
                btnDevolver.onclick = () => devolverLivro(livro.id);
                acoes.appendChild(btnDevolver);
            }

            const btnExcluir = document.createElement('button');
            btnExcluir.className = 'btn-excluir';
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirLivro(livro.id);
            acoes.appendChild(btnExcluir);

            item.appendChild(acoes);
            lista.appendChild(item);

            // --- A PARTE QUE FALTAVA: Preencher o seletor de livros ---
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

// Função para usuário
async function buscarUsuarios() {
    try {
        const resposta = await fetch(`${API_URL}/usuarios`);
        const usuarios = await resposta.json();
        
        const lista = document.getElementById('listaUsuarios');
        const selectUsuario = document.getElementById('selectUsuario');
        
        lista.innerHTML = '';
        selectUsuario.innerHTML = '';
        
        const optPadrao = document.createElement('option');
        optPadrao.textContent = 'Selecione o Usuário';
        optPadrao.value = '';
        selectUsuario.appendChild(optPadrao);

        usuarios.forEach(u => {
            const item = document.createElement('li');
            
            const textoUsuario = document.createTextNode(`👤 ${u.nome} `);
            item.appendChild(textoUsuario);

            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.className = 'btn-excluir'; // Reutilizando a classe CSS que você já tem
            btnExcluir.onclick = () => excluirUsuario(u.id);
            
            item.appendChild(btnExcluir);
            lista.appendChild(item);
            
            const opcao = document.createElement('option');
            opcao.value = u.id;
            opcao.textContent = u.nome;
            selectUsuario.appendChild(opcao);
        });
    } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
    }
}

// Função para cadastrar usuário
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

// Função para excluir o usuário
async function excluirUsuario(id) {
    if (!confirm("Tem certeza que deseja remover este usuário? Todos os empréstimos dele serão apagados.")) return;

    try {
        const resposta = await fetch(`${API_URL}/usuarios/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            await carregarDados();
        }
    } catch (erro) {
        console.error("Erro ao excluir usuário:", erro);
    }
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

// Função para carregar tabela de empréstimos
async function buscarEmprestimos() {
    try {
        const resposta = await fetch(`${API_URL}/emprestimos`);
        const emprestimos = await resposta.json();
        
        const tbody = document.getElementById('tabelaEmprestimos');
        tbody.innerHTML = '';

        emprestimos.forEach(e => {
            const tr = document.createElement('tr');
            
            const tdUsuario = document.createElement('td');
            tdUsuario.textContent = e.usuario;
            
            const tdLivro = document.createElement('td');
            tdLivro.textContent = e.livro;
            
            const tdData = document.createElement('td');
            // Formata a data para o padrão brasileiro
            tdData.textContent = new Date(e.data_emprestimo).toLocaleDateString('pt-BR');

            tr.appendChild(tdUsuario);
            tr.appendChild(tdLivro);
            tr.appendChild(tdData);
            tbody.appendChild(tr);
        });
    } catch (erro) {
        console.error("Erro ao carregar tabela de empréstimos:", erro);
    }
}

// Inicializa o sistema ao carregar a página
carregarDados();