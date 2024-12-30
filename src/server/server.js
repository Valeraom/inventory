import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let activeSessions = 0;

io.on('connection', socket => {
  activeSessions++;
  io.emit('updateSessions', activeSessions);

  socket.on('disconnect', () => {
    activeSessions--;
    io.emit('updateSessions', activeSessions);
  });
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

server.listen(3000, () => {
  console.log('Server is running');
});
