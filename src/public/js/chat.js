const socket = io()

const btnMail = document.querySelector('#btnMail')
const userName = document.querySelector('.userName')
const email = document.querySelector('#email')
const chatContainer = document.querySelector('.chatContainer')
const texto = document.querySelector('.texto')
const mailContainer = document.querySelector('.mailContainer')
const chats = document.querySelectorAll('.chat')
const btnSend = document.querySelector('#btnSend')
const msg = document.querySelector('#msg')

btnMail.addEventListener('click', e => {
    e.preventDefault()
    userName.innerHTML = email.value
    chatContainer.classList.remove('off')
    texto.classList.remove('off')
    mailContainer.classList.add('off')

    chats.forEach(chat => {
        const user = chat.querySelector('.user')
        if (user.innerHTML.trim() === userName.innerHTML.trim()) chat.classList.add('local')
    })
    chatContainer.scrollTop = chatContainer.scrollHeight;
})

const chatUI = ({ user, message }) => {
    const div = document.createElement('div')
    div.classList.add('chat')
    if (user === userName.innerHTML.trim()) div.classList.add('local')
    div.innerHTML = `
    <div class="user">${user}</div>
    <div class="msg">${message}</div>
    `
    return div
}

btnSend.addEventListener('click', () => {
    const newMsj = {
        user: userName.innerHTML.trim(),
        message: msg.value.trim()
    }
    socket.emit('chat', newMsj)
})

socket.on('chat', ({ message }) => {
    chatContainer.append(chatUI(message))
    chatContainer.scrollTop = chatContainer.scrollHeight;
    msg.value = ''
})