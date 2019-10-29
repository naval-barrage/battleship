require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const chalk = require('chalk')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const authCtrl = require('./controllers/authController')

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

// AUTH ENDPOINTS
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

// SOCIAL ENDPOINTS

// GAME ENDPOINTS


massive(CONNECTION_STRING)
    .then(dbInstance =>{
        app.set('db', dbInstance);
        console.log(chalk.cyan('database is connected'));
        
    })
    .catch(error=> console.log(chalk.red('database connection severed'))
    )

    app.listen(SERVER_PORT, ()=> console.log(chalk.cyan("Server is on mLord")
    ))
