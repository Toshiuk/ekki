const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const apiRouter = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use(cors());

app.use('/', apiRouter);

server.listen(3001);


module.exports = app;
