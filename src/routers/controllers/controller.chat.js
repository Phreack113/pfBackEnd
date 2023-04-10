const { Router } = require('express')
const router = Router()

const Messages = require('../../dao/models/Messages.model')

router.get('/chat', async (req, res) => {
    try {
        const chats = await Messages.find().lean()
        res.render('chat.handlebars', {
            chats,
            title: 'Chat',
            style: 'Chat.css'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Bad request' })
    }
})

router.post('/chat', async (req, res) => {
    const { user, message } = req.body
    const msj = {
        user,
        message
    }
    const newMsj = await Messages.create(msj)
    res.json(newMsj)
})

module.exports = router