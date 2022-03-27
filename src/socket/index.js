

function socket(io) {
    /**io lắng nghe khi có connect đến */
    io.on('connection', (socket) => {
        console.log('----------- Đã kết nối socket ----------------------');
        socket.on('on-chat', data => {
            console.log(data);
            if (data.role === null) {
                io.emit('user-chat', data);
                io.emit(data.id, data);
            }
        })
    })
}

module.exports = socket;