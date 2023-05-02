const Router = require('express')
const router = Router()

const Users = require('../../dao/models/Users.model')
const passport = require('passport')


router.get('/callback', (req, res) => {
})

router.post(
    '/',
    passport.authenticate('login', {failureRedirect: 'auth/failllogin'}),
    async (req, res) => {
        try {
            if (!req.user){
                return res
                    .status(401)
                    .json({ status: 'error', error: 'La contraseña y el usuario no coinciden' })
            }

            req.session.user = {
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                email: req.user.email,
            }
            res.json({ status: 'success', message: req.session.user })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ status: 'error', error: 'Internal server error' })
        }
    }
)

router.get(
    '/github',
    passport.authenticate('github', {scope: ['user: email']}),
    async (req, res) => {}
)

router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    async (req, res) => {
      req.session.user = req.user
      res.redirect('/products')
    }
  )

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.json({ error })
        res.redirect('/login')
    })
})

module.exports = router