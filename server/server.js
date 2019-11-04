require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const chalk = require('chalk')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, MONGO_CONNECTION_STRING} = process.env
const mongoose = require('mongoose')
const authCtrl = require('./controllers/authController')
const socialCtrl = require('./controllers/socialController')
const gameCtrl = require('./controllers/gameController')

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

app.post('/api/friends/:new_friend_id', socialCtrl.newFriends)
app.get('/api/friends', socialCtrl.getFriends)
app.get('/api/users', socialCtrl.getUsers)
app.get('/api/games', socialCtrl.getActiveGames)
app.put('/api/users/img/:user_id', socialCtrl.updateUserImg)

// GAME ENDPOINTS

app.post('/api/games/new/:guest_id', gameCtrl.createNewGame)
app.delete('/api/games/end/:gameroom_id/:winner_id', gameCtrl.endGame)
app.get('/api/game/:gameroom_id', gameCtrl.getGame)
app.put('/api/game/:gameroom_id/:user_id', gameCtrl.updateGame)
app.put('/api/game/start/:gameroom_id/:user_id', gameCtrl.setShips)



// DB STUFF

mongoose.connect(MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(dbInstance => {
    app.set('mdb', dbInstance)
    console.log(chalk.blue('mongo db connected'))
})
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

massive(CONNECTION_STRING)
    .then(dbInstance =>{
        app.set('db', dbInstance);
        console.log(chalk.cyan('database is connected'));
        
    })
    .catch(error=> console.log(chalk.red('database connection severed'))
    )

    app.listen(SERVER_PORT, ()=> console.log(chalk.cyan("Server is on mLord")
    ))
