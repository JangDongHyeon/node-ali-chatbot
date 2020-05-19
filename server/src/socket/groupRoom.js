module.exports = function (io) {
    const groupRoom = io.of('/groupRoom');
    groupRoom.on('connection', socket => {
        console.log('groupRoom connected');
        socket.on('groupRoom', async (callback) => {

            //socket.broadcast.emit('groups');
            callback();
        });
        socket.on('userLength', (id) => {
            socket.broadcast.emit('userLength', id);
        });
        socket.on('disconnect', () => {
            console.log("groupRoom bye");
        });

    });
}