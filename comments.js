// Create web server
const express = require('express');
const app = express();
// Create server
const server = require('http').Server(app);
// Create socket
const io = require('socket.io')(server);
// Create comments array
let comments = [];

// Create route
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Create route
app.post('/comments', (req, res) => {
  const comment = req.query.comment;
  comments.push(comment);
  io.emit('new-comment', comment);
  res.send(comment);
});

// Listen to port 3001
server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});

// Create socket connection
io.on('connection', (socket) => {
  socket.on('new-comment', (comment) => {
    comments.push(comment);
    io.emit('new-comment', comment);
  });
});
// Path: index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Comments</title>
  </head>
  <body>
    <ul id="comments"></ul>
    <input id="comment" type="text" placeholder="Enter your comment" />
    <button id="submit">Submit</button>
    <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
    <script>
      const socket = io('http://localhost:3001');
      const comments = document.getElementById('comments');
      const comment = document.getElementById('comment');
      const submit = document.getElementById('submit');

      socket.on('new-comment', (comment) => {
        const li = document.createElement('li');
        li.innerHTML = comment;
        comments.appendChild(li);
      });

      submit.addEventListener('click', () => {
        socket.emit('new-comment', comment.value);
        comment.value = '';
      });
    </script>
  </body>
</html>