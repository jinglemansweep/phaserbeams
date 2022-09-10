import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import { Server } from 'socket.io';

const app = express();
const port = 8080;
const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
});

app.use('/static', express.static(path.join(__dirname, '..', 'client')));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
