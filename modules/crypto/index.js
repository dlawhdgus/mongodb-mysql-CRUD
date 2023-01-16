const cryptojs = require('crypto-js')
const config = require('../../config.json')

exports.encodig = (password) => {
    return cryptojs.AES.encrypt(JSON.stringify(password), config.crypto.SECRET_KEY).toString()
}

exports.decoding = (password) => {
    const bytes = cryptojs.AES.decrypt(password, config.SECRET_KEY)
    const decode = JSON.parse(bytes.toString(cryptojs.enc.Utf8))
    return decode
}