const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const messageController = require('./controllers/messageController');

const bodyParser = require('body-parser');

const messageRouter = require('./routes/messageRouter');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/messages', messageRouter);

io.on('connection', socket => {
  socket.on('send', (payload, fn) => {
    messageController.send(payload).then(result => {
      fn({
        '_id': result,
        'text': payload.message,
      });
      socket.broadcast.emit('new-message', {
        '_id': result,
        'text': payload.message,
      });
    });
  });
});

server.listen(3000, () => {
  console.log('server done at 3000');
});
