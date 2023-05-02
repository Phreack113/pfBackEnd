const { Router } = require('express')
const router = Router()
const passport = require('passport')

const Users = require('../../dao/models/Users.model')

router.post(
    '/',
    passport.authenticate('register', { failureRedirect: '/users/failregister' }),
    async (req, res) => {
      try {
        res.status(201).json({ status: 'success', message: 'Usuario registrado' })
      } catch (error) {
        console.log(error.message)
        if (error.code === 11000) {
          return res.status(400).json({ status: 'error', error: 'User existed' })
        }
        res.status(500).json({ status: 'error', error: 'Internal server error' })
      }
    }
  )
  
  router.get('/failregister', (req, res) => {
    console.log('falló estrategia de registro')
  
    res.json({ error: 'Failed register' })
  })

module.exports = router