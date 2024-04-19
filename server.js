// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para análise de JSON
app.use(express.json());

// Dados fictícios de usuários (substitua com um banco de dados real em uma aplicação real)
let users = [
  { id: 1, name: 'Usuário 1' },
  { id: 2, name: 'Usuário 2' },
  { id: 3, name: 'Usuário 3' }
];

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
  res.json(users);
});

// Rota para obter um usuário por ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  res.json(user);
});

// Rota para adicionar um novo usuário
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O nome do usuário é obrigatório' });
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Rota para excluir um usuário por ID
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.json({ message: 'Usuário excluído com sucesso' });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
