require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fixins', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
const shopsRouter = require('./routes/shops');
const productsRouter = require('./routes/products');
const repairsRouter = require('./routes/repairs');
const messagesRouter = require('./routes/messages');

app.use('/api/shops', shopsRouter);
app.use('/api/products', productsRouter);
app.use('/api/repairs', repairsRouter);
app.use('/api/messages', messagesRouter);

// Socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('join_chat', (chatId) => {
    socket.join(chatId);
  });
  
  socket.on('send_message', (data) => {
    io.to(data.chatId).emit('receive_message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
