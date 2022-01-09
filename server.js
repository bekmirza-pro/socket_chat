const express = require('express')
const app = express()
const socketIO = require('socket.io')

app.use(express.static('public'))

const server = app.listen(9000, () => {
    console.log(9000)
})

const io = socketIO(server)

io.on('connection', socket => {
    socket.on('new-message', data => {
        console.log(data)
        socket.broadcast.emit('chat-message', {
            name: data.name,
            message: data.value
        })
    })

    socket.on('new-user', name => {
        socket.broadcast.emit('new-user-joined', name)
    })
})