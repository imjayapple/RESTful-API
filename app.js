// Create a Basic Express Server

const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("Server is listening at http://localhost:${port}");
});

/*
Implement Basic CRUD Operations:
- Create routes for handling CRUD Operations for your To-Do List
*/

// Sample Data
let todos = [
    { id: 1, text: 'Learn Node.js', done: false},
    { id: 2, text: 'Build a RESTful API', done: false},
];

// Middleware to parse JSON
app.use(express.json());

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a specific todo by ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);

    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Create a new todo
app.post(/'todos', (req, res) => {
    const { text } = req.body;
    const newTodo = { id: todos.length + 1, text, done: false};
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo by ID
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { text, done } = req.body;
    const todoIndex = todos.findIndex((t) => t.id === id);
  
    if (todoIndex !== -1) {
      todos[todoIndex] = { ...todos[todoIndex], text, done };
      res.json(todos[todoIndex]);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  });

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter((t) => t.id !== id);
    res.json( { message: 'Todo deleted successfully' });
});

app.listen(port, () => {
    console.log('Server is listening at http://localhost:${port}');
});