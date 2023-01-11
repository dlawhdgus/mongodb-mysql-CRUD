const mongoose = require('mongoose')
const config = require('../config.json')

mongoose.connect(config.mongodb.connect_string, {
    dbName : db
})

const db = mongoose.connection

exports.db_connect = db.once("open",() => {
    console.log('mongodb connected')  
})

db.on("error", (e) => {
    if(e) throw e
})