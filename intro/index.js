const http = require('http');
const port = 3000;

('basic server');
const server = http.createServer((req, res) => {
  res.end('reddy');
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
