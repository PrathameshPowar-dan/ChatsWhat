import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

// Create express app here
const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit('getActiveUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete userSocketMap[userId];
        io.emit('getActiveUsers', Object.keys(userSocketMap));
    });
});

export { io, server, app };