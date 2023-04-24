const { Router } = require('express')
const router = Router()

const Users = require('../../dao/models/Users.model')

router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body
        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password,
        }
        
        const existingUser = await Users.findOne({email})
        if (existingUser) return res.status(400).json({status: 'error', error: 'bad request'})
        
        const user = await Users.create(newUser)
        res.json({ status: 'success' , user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: error, message: 'Internal server error' })
    }
})

module.exports = router