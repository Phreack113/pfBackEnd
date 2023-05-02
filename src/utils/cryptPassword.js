const bcrypt = require('bcryptjs')

exports.hashPassword = password => {
    console.log(password)
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

exports.isValidPassword = (password, user) => {
    console.log(password)
    console.log(user)
    return bcrypt.compareSync(password, user.password)
}