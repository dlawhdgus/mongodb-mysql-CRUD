const express = require('express')
const app = express()
const cofig = require('./config.json')
const { mongodb_connect } = require('./dbs/mongodb-connect')
const { mysql_connect } = require('./dbs/mysql-connect')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStroe = require('session-file-store')(session)
const routes = require('./routes')

app.use(session({
    secret: 'luwygdfo',
    resave: false,
    saveUninitialized: true,
    store: new FileStroe({ logFn: () => { } })
}))


app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)

app.set('views', './public/views')
app.set('view engine', 'ejs')

app.listen(cofig.port, () => {
    mongodb_connect
    mysql_connect
    console.log(`https://login.jp.ngrok.io`)
})