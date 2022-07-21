"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServer = void 0;
const socketServer = (socket) => {
    socket.on('joinRoom', (id) => {
        socket.join(id);
        // console.log({ joinRoom: (socket as any).adapter.rooms });
    });
    socket.on('leaveRoom', (id) => {
        socket.leave(id);
        // console.log({ leaveRoom: (socket as any).adapter.rooms });
    });
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });
};
exports.socketServer = socketServer;
