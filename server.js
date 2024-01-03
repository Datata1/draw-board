const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle the base route by sending the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for draw events from clients
  socket.on('draw', (data) => {
    // Broadcast the draw event to all connected clients
    io.emit('draw', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
