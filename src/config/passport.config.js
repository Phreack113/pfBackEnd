const passport = require('passport')
const local = require('passport-local')
const User = require('../dao/models/Users.model')
const GithubStrategy = require('passport-github2')
const { hashPassword } = require('../utils/cryptPassword')
const { isValidPassword } = require('../utils/cryptPassword')
require('dotenv').config()

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, username, password, done) => {
                try {
                    const { first_name, last_name, email, age, password } = req.body
                    const user = await User.findOne({ email: username })

                    if (user) {
                        console.log('El usuario ya existe')
                        return done(null, false)
                    }

                    const newUserInfo = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: hashPassword(password),
                    }

                    const newUser = await User.create(newUserInfo)
                    done(null, newUser)
                } catch (error) {
                    done(error)
                }
            }
        )
    )
    
    passport.use(
        'login',
        new LocalStrategy(
            { usernameField: 'email' },
            async (username, password, done) => {
                try {
                    const user = await User.findOne({ email: username })
                    if (!user) {
                        console.log('El usuario no existe')
                        return done(null, false)
                    }

                    if (!isValidPassword(password, user)) return done(null, false)
                    
                    done(null, user)
                } catch (error) {
                    done(error)
                }
            }
        )
    )

    passport.use(
        'github',
        new GithubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callBackURL: 'http://localhost:3002/auth/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await User.findOne({ email: profile._json.email })
                    if (!user) {
                        const newUserInfo = {
                            first_name : profile._json.name,
                            last_name : '',
                            age: 18,
                            email: profile._json.email,
                            password: '',
                        }
                        const newUser = await User.create(newUserInfo)
                        return done(null, newUser)
                    }
                    done(null, user)
                } catch (error) {
                    done(error)
                }
            }
            )
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser( async (id, done) => {
        const user = await User.findById(id)
        done(null, user)
    })
}

module.exports = initializePassport