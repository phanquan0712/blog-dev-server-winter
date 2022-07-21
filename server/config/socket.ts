import { Socket  } from "socket.io";


export const socketServer = (socket: Socket) => {
   socket.on('joinRoom', (id: string) => {
      socket.join(id);
      // console.log({ joinRoom: (socket as any).adapter.rooms });
   })
   socket.on('leaveRoom', (id: string) => {
      socket.leave(id)
      // console.log({ leaveRoom: (socket as any).adapter.rooms });
   })
   socket.on('disconnect', () => {
      console.log(socket.id + ' disconnected');
   })
}