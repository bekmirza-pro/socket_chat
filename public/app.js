const socket = io('http://localhost:9000/')

btn.addEventListener('click', sendFn)

const name = prompt('Ismingizni kiriting')

// 

function youJoined() {
    const h5 = document.createElement('h5')

    h5.style.color = 'red'
    h5.style.margin = "5px"

    h5.innerHTML += `Siz qo'shildingiz muloqotga`

    msg_container.appendChild(h5)
}

youJoined()

// Emitting events

socket.emit('new-user', name)

const dataMessage = []

function sendFn() {

    const value = document.getElementById('input').value

    const btn = document.createElement('button')
    const h5 = document.createElement('h5')
    const div = document.createElement('div')

    btn.addEventListener('click', () => {
        const foundPost = dataMessage.find(e => e.id === div.id)
        const index = dataMessage.indexOf(foundPost);

        if (foundPost) {
            dataMessage.splice(index, 1);

            for (let i = 0; i < dataMessage.length; i++) {
                const element = dataMessage[i];
                msg_container.appendChild(element)
            }
        }
    })

    div.style.display = "flex"
    div.style.alignItems = "center"

    h5.innerHTML += `Siz: ${value}`
    h5.style.margin = "5px"

    btn.style.fontSize = "10px"
    btn.innerHTML += "Delete"
    btn.style.marginLeft = "20px"

    div.appendChild(h5)
    div.appendChild(btn)

    div.id = dataMessage.length + 1;
    dataMessage.push(div);

    for (let i = 0; i < dataMessage.length; i++) {
        const elementDiv = dataMessage[i];
        msg_container.appendChild(elementDiv)
    }
    socket.emit('new-message', { value, name })
}

// Listening events

socket.on('chat-message', data => {
    const h5 = document.createElement('h5')
    const btn = document.createElement('button')
    const div = document.createElement('div')

    btn.addEventListener('click', () => {
        const foundPost = dataMessage.find(e => e.id === div.id)
        const index = dataMessage.indexOf(foundPost);

        if (foundPost) {
            dataMessage.splice(index, 1);

            for (let i = 0; i < dataMessage.length; i++) {
                const element = dataMessage[i];
                msg_container.appendChild(element)
            }
        }
    })

    div.style.display = "flex"
    div.style.alignItems = "center"

    btn.innerHTML += "Delete"
    btn.style.fontSize = "10px"
    btn.style.marginLeft = "20px"

    h5.innerHTML += `${data.name}: ${data.message}`
    h5.style.margin = "5px"

    div.appendChild(h5)
    div.appendChild(btn)

    div.id = dataMessage.length + 1;
    dataMessage.push(div);

    for (let i = 0; i < dataMessage.length; i++) {
        const elementDiv = dataMessage[i];
        msg_container.appendChild(elementDiv)
    }
})

console.log(dataMessage);

socket.on('new-user-joined', name => {
    const h5 = document.createElement('h5')

    h5.style.color = 'red'
    h5.style.margin = "5px"

    h5.innerHTML += `${name} qo'shildi muloqotga`

    msg_container.appendChild(h5)
})