let users = {};

const initSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('🟢 User connected:', socket.id);

        // Join Room
        socket.on('joinRoom', ({ roomId, userId }) => {
            socket.join(roomId);
            users[socket.id] = userId;

            console.log(`${userId} joined room ${roomId}`);
        });

        // Send Message
        socket.on('sendMessage', (data) => {
            const { roomId, message } = data;

            // Broadcast to room
            io.to(roomId).emit('receiveMessage', message);
        });

        // Typing Indicator
        socket.on('typing', ({ roomId }) => {
            socket.to(roomId).emit('typing');
        });

        socket.on('stopTyping', ({ roomId }) => {
            socket.to(roomId).emit('stopTyping');
        });

        // Disconnect
        socket.on('disconnect', () => {
            console.log('🔴 User disconnected:', socket.id);
            delete users[socket.id];
        });
    });
};

export default initSocket;