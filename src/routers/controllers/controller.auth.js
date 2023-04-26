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

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        }

        res.json({ status: 'success', message: req.session.user })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: 'error', error: 'Internal server error' })
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.json({ error })
        res.redirect('/login')
    })
})

module.exports = router