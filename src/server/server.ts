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

const players: Record<string, unknown> = {};

io.on('connection', (socket) => {
  const { id } = socket;
  const player = {
    name: `Socket ${socket.id}`,
  };
  players[id] = player;
  console.log('player.connect', id, player);

  socket.emit('player.list', players);
  socket.broadcast.emit('player.connect', player);

  socket.on('disconnect', () => {
    const { id } = socket;
    console.log('player.disconnect', id);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete players[id];
    socket.broadcast.emit('player.disconnect', id);
  });

  socket.on('keyboard', (key: string) => {
    console.log('Keyboard', key);
  });
});

app.use('/static', express.static(path.join(__dirname, '..', 'client')));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
