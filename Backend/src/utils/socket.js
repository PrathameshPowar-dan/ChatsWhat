import { Server } from 'socket.io';
import { createServer } from 'http';
import app from '../app.js';

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    const userId = socket.handshake.query.userId; // Assuming userId is sent as a query parameter

    if (userId) userSocketMap[userId] = socket.id;

    io.emit('getActiveUsers', Object.keys(userSocketMap));


    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete userSocketMap[userId];
        io.emit('getActiveUsers', Object.keys(userSocketMap));
    });
});

export { io, server };