

function socket(io){
    /**io lắng nghe khi có connect đến */
    io.on('connection', (socket) => {
        console.log('user connect ................................................................');
    })
}

module.exports = socket;