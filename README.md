# Desafio Técnico para Desenvolvedor(a) Full Stack - Executiva Service

## 📍 Objetivo
Criar uma aplicação _Full-Stack_ simples para gerenciar tarefas (_To-Do_ / _Task Manager_), com autenticação de usuário.

## 📜 Sumário

1. [🧰 Ferramentas](#-ferramentas)
2. [🔙 Acessando e criando o Backend](#-acessando-e-criando-o-backend)
3. [💻 Acessando e criando o Frontend](#-acessando-e-criando-o-frontend)

## 🧰 Ferramentas
O seguinte desafio foi realizado com as seguintes ferramentas e SO:

- ![React](https://img.shields.io/badge/React%20-%20black?logo=react&logoColor=%2349c9fc)
- ![Node.js](https://img.shields.io/badge/Node.js%20-%20black?logo=node.js&logoColor=green)
- ![MongoDB](https://img.shields.io/badge/MongoDB%20-%20black?logo=mongodb&logoColor=%2336f763%20)
- ![Linux](https://img.shields.io/badge/Linux%20-%20black?logo=linux&logoColor=white)

## 🔙 Acessando e criando o Backend

```bash
$ cd backend/ 
```

### Variáveis de ambiente

Crie um arquivo `.env` para suas variáveis de ambiente que contenham os seguintes dados:

- Exemplo em bash:

```bash
$ touch .env
$ nano .env
```

Então escreva e salve:

```py
MONGODB_URI='mongodb://localhost:27017/executiva'
JWT_SECRET='o_seu_segredo_aqui'
FRONTEND_URL='http://localhost:5173'
PORT=3001
```

Depois continue com o processo de instalação e execução do sistema

```bash
$ npm install  # ou somente 'npm i'
$ npm run build
$ npm run start
```

## 💻 Acessando e criando o Frontend

```bash
$ cd frontend/
```

### Variáveis de ambiente

Crie um arquivo `.env` para suas variáveis de ambiente que contenham os seguintes dados:

- Exemplo em bash:

```bash
$ touch .env
$ nano .env
```

Então escreva e salve:

```py
VITE_BACKEND_URL='http://localhost:3001'
```

Depois continue com o processo de instalação e execução do sistema

```bash
$ npm install  # ou somente 'npm i'
$ npm run dev
```