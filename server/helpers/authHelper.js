const bcrypt = require('bcrypt')

// HASHING FUNCTION
exports.hashPass = (pass) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(pass, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

// COMPARE || DECRYPT FUNCTION
exports.comparePass = (pass, hashed) => {
    return bcrypt.compare(pass, hashed)
}