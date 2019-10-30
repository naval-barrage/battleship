const Game = require('../models/Game')
const emptyBoard = require('../emptyBoard')

module.exports = {
    async createNewGame(req, res) {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {guest_id} = req.params
        const timestamp = Date.now()
        // console.log(user_id)
        // console.log(guest_id)
        // console.log(timestamp)

        const gameroom_id = await db.add_gameroom([user_id, guest_id, timestamp])
        console.log(gameroom_id)
        const game_active = await db.add_active_game([gameroom_id[0].gameroom_id, user_id, guest_id])
        // console.log(gameroom_id)
        // console.log(emptyBoard.emptyBoard)
        let newGame = new Game()
        newGame.gameroom_id = gameroom_id[0].gameroom_id;
        newGame.hostBoard = emptyBoard.emptyBoard
        newGame.guestBoard = emptyBoard.emptyBoard
        newGame.save(async function (err, data) {
            if (err) {
                console.log(`you have an error in createNewGame method`, err)
                throw err
            } else {
                res.send(data)
                let newId = JSON.stringify(data._id)
                let evenNewerId = new String()
                evenNewerId = newId.toString().replace(/"/g, "")
                const gameroom_updated = await db.insert_game_id([gameroom_id[0].gameroom_id, evenNewerId])
            }
            
        })

    },

    // async endGame(req, res) {
    //     const db = req.app.get('db')
    //     const {gameroom_id, winner_id} = req.params

    //     const gameroom = await db.get_gameroom(gameroom_id)
    //     console.log([gameroom[0].host_id, gameroom[0].guest_id])
    //     const friendship = await db.check_friendship([gameroom[0].host_id, gameroom[0].guest_id])
    //     console.log(gameroom)
    //     console.log(friendship)
    //     if (friendship[0].friend1 === winner_id) {
    //         const friend1_updated = await db.update_friend1_wins([friendship[0].friendship_id, friendship[0].friend1_wins + 1])
    //     } else {
    //         const friend2_updated = await db.update_friend2_wins([friendship[0].friendship_id, friendship[0].friend2_wins + 1])
    //     }

    //     const winner = await db.get_user(winner_id)

    // }
}