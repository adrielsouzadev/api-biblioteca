# 📚 Sistema de Biblioteca - Full-Stack

Este projeto é um sistema completo de gestão de biblioteca, a aplicação permite o gerenciamento de livros, usuários e o controle de empréstimos em tempo real, utilizando uma arquitetura organizada e moderna.

## 🚀 Tecnologias Utilizadas

### Backend
* **Node.js**: Ambiente de execução para o servidor.
* **Express**: Framework utilizado para a criação da API REST e gerenciamento de rotas.
* **MySQL**: Banco de dados relacional para armazenamento dos dados.
* **CORS**: Middleware para permitir que o Frontend acesse a API.
* **MySQL2 (Promise)**: Driver para comunicação assíncrona com o banco de dados.

### Frontend
* **HTML5 & CSS3**: Estrutura e estilização moderna com **CSS Grid** para um layout responsivo.
* **JavaScript (Vanilla)**: Lógica do cliente com manipulação dinâmica do DOM.

## 🛠️ Funcionalidades

* **Gerenciamento de Livros**: Cadastro, listagem e exclusão de títulos.
* **Gerenciamento de Usuários**: Cadastro e exclusão de usuários com lógica de devolução automática: ao excluir um usuário, todos os livros emprestados a ele ficam disponíveis novamente.
* **Controle de Empréstimos**: Registro de empréstimos que atualiza o status de disponibilidade do livro no banco de dados.
* **Tabela de Empréstimos Ativos**: Dashboard que utiliza **SQL JOINs** para exibir o nome do usuário e o título do livro de forma centralizada.

## 📦 Como rodar o projeto

### 1. Requisitos
* Node.js instalado.
* Servidor MySQL rodando.

### 2. Configuração do Banco de Dados
Importe o arquivo `database.sql` no seu MySQL Workbench para criar a estrutura necessária (banco `biblioteca` e tabelas `usuarios`, `livros` e `emprestimos`).

### 3. Instalação do Backend
Na pasta raiz do projeto:
```bash
# Instalar as dependências
npm install

# Iniciar o servidor (Rodando por padrão na porta 3000)
node src/server.js
```
### 4. Execução do Frontend
Abra o arquivo `front/index.html` em seu navegador ou utilize a extensão **Live Server** do VS Code para uma melhor experiência.

## 📝 Licença
Este projeto está sob a licença **MIT**.

---
Desenvolvido por **Adriel Souza**.
