const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {logger} = require('./utils/logger')

const gameRoutes = require('./routes/gameRoutes');
const timerRoutes = require('./routes/timerRoutes');
const rectangleRoutes = require('./routes/rectangleRoutes');

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/games', gameRoutes);
app.use('/api/timer', timerRoutes);
app.use('/api/rectangles', rectangleRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});


