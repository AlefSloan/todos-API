const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(req, res, next) {
  const { username } = req.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  req.user = user;

  next();
}

app.post('/users', (req, res) => {
  const { name, username } = req.body;

  const userExist = users.some((user) => user.username === username);

  if (userExist) {
    return res.status(400).json({ error: "Usuário com esse username já existe!" })
  }

  const newUser = {
    id: crypto.randomUUID(),
    username,
    name,
    todos: []
  }

  users.push(newUser);

  return res.status(201).json(newUser);
});

app.get('/todos', checksExistsUserAccount, (req, res) => {
  const { user } = req;

  return res.status(200).json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (req, res) => {
  const { user } = req;
  const { title, deadline } = req.body;

  const newTodo = {
    id: crypto.randomUUID(),
    title,
    done: false,
    deadline,
    created_at: new Date()
  }

  user.todos.push(newTodo);

  return res.status(201).json(newTodo);
});

app.put('/todos/:id', checksExistsUserAccount, (req, res) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (req, res) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (req, res) => {
  // Complete aqui
});

module.exports = app;