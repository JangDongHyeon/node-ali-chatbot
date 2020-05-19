import axios from 'axios';
module.exports = function (io) {
    const groupChat = io.of('/groupChat');
    groupChat.on('connection', socket => {
        console.log('groupChat connected');
        const req = socket.request;
        const {
            headers: {
                referer
            }
        } = req;
        const roomId = referer.split('/')[referer.split('/').length - 1];

        socket.on('join', (params, callback) => {

            socket.join(params.room);

            socket.to(params.room).emit('usersList', params.room);
            callback();
        });


        socket.on('userDeleteCall', async userId => {
            socket.to(roomId).emit('userDelete', userId);
        });


        socket.on('createMesage', async message => {
            socket.to(message.room).emit('newMessage', message.chatList);
        });

        socket.on('modeChange', async data => {

            socket.to(roomId).emit('modeChange', data.data);
        })

        socket.on('disconnect', async () => {



            // let user = users.RemoveUser(socket.id);

            console.log("나느 떠남")
            //socket.to(roomId).emit('userDelete', roomId);
            socket.leave(roomId);
        });
    });
};