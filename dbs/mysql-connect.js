const mysql = require('mysql2/promise')
const config = require('../config.json')

const connect = async () => {
    const connection = await mysql.createConnection(config.mysql)
    console.log('Mysql Connected')
    return connection
}

module.exports = { connect }