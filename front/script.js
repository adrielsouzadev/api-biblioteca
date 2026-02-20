const API_URL = "http://localhost:3000";

// Função para buscar os livros e mostrar na tela
async function buscarLivros() {
    try {
        const resposta = await fetch(`${API_URL}/livros`);
        const livros = await resposta.json();
        
        const lista = document.getElementById('listaLivros');
        lista.innerHTML = ''; // Limpa a lista antes de atualizar

        livros.forEach(livro => {
            const item = document.createElement('li');
            item.innerHTML = `
                <strong>${livro.titulo}</strong> - ${livro.autor} 
                <span class="status ${livro.disponivel ? 'disponivel' : 'indisponivel'}">
                    (${livro.disponivel ? 'Disponível' : 'Emprestado'})
                </span>`;
            lista.appendChild(item);
        });
    } catch (erro) {
        console.error("Erro ao carregar livros:", erro);
    }
}

// Função para cadastrar um novo livro
async function cadastrarLivro() {
    const titulo = document.getElementById('tituloLivro').value;
    const autor = document.getElementById('autorLivro').value;

    if (!titulo || !autor) {
        console.warn("Preencha todos os campos!");
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/livros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor })
        });

        if (resposta.ok) {
            // Limpa os campos do formulário
            document.getElementById('tituloLivro').value = '';
            document.getElementById('autorLivro').value = '';
            
            // Atualiza a lista automaticamente
            buscarLivros();
        }
    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
    }
}

// Carrega os livros assim que a página abre
buscarLivros();