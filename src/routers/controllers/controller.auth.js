const Router = require('express')
const router = Router()

const Users = require('../../dao/models/Users.model')

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email })

        if (!user) 
            return res.status(400)
            .json({ status: 'error', message: 'User and password dont match' })

        if (user.password != password) 
            return res.status(400)
            .json({ status: 'error', message: 'User and password dont match' })


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: 'error', error: 'Internal server error' })
    }
})

module.exports = router