const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(req, res, next) {
  // Complete aqui
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
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (req, res) => {
  // Complete aqui
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