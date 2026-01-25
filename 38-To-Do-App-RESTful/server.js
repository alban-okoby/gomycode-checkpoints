const http = require('http');
const url = require('url');

let todos = [];
let idCounter = 1;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');

  // GET /todos
  if (method === 'GET' && pathParts[0] === 'todos' && pathParts.length === 1) {
    res.statusCode = 200;
    return res.end(JSON.stringify(todos));
  }

  // POST /todos
  if (method === 'POST' && pathParts[0] === 'todos') {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);

      if (!data.title) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Title is required' }));
      }

      // Check if todo already exists by title
      const exists = todos.some(
        todo => todo.title.toLowerCase() === data.title.toLowerCase()
      );

      if (exists) {
        res.statusCode = 409; // Conflict
        return res.end(
          JSON.stringify({ error: 'Todo with this title already exists' })
        );
      }

      const newTodo = {
        id: idCounter++,
        title: data.title,
        completed: data.completed || false
      };

      todos.push(newTodo);

      res.statusCode = 201;
      res.end(JSON.stringify(newTodo));
    } catch {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });

  return;
}

  // PUT /todos/:id
  if (method === 'PUT' && pathParts[0] === 'todos' && pathParts[1]) {
    const id = Number(pathParts[1]);
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const todo = todos.find(t => t.id === id);

        if (!todo) {
          res.statusCode = 404;
          return res.end(JSON.stringify({ error: 'Todo not found' }));
        }

        if (data.title !== undefined) todo.title = data.title;
        if (data.completed !== undefined) todo.completed = data.completed;

        res.statusCode = 200;
        res.end(JSON.stringify(todo));
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });

    return;
  }

  // DELETE /todos/:id
  if (method === 'DELETE' && pathParts[0] === 'todos' && pathParts[1]) {
    const id = Number(pathParts[1]);
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: 'Todo not found' }));
    }

    todos.splice(index, 1);
    res.statusCode = 204;
    return res.end();
  }

  // Not Found
  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
