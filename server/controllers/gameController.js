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
        newGame.host = emptyBoard.emptyBoard
        newGame.guest = emptyBoard.emptyBoard
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

    async endGame(req, res) {
        const db = req.app.get('db')
        const {gameroom_id, winner_id} = req.params

        const gameroom = await db.get_gameroom(gameroom_id)
        const friendship = await db.check_friendship([gameroom[0].host_id, gameroom[0].guest_id])
        if (+friendship[0].friend1 === +winner_id) {
            const friend1_updated = await db.update_friend1_wins([friendship[0].friendship_id, friendship[0].friend1_wins + 1])
        } else {
            const friend2_updated = await db.update_friend2_wins([friendship[0].friendship_id, friendship[0].friend2_wins + 1])
        }

        const winner = await db.get_user(winner_id)

        let xp = winner[0].xp
        let level = winner [0].level
        if (xp + 10 >= 200) {
            xp = 0
            level += 1
        } else {
            xp += 10
        }
        const winner_updated = await db.update_winner([winner_id, xp, level])
        const deleted_gameroom = await db.delete_gameroom(gameroom_id)
        res.status(200).send({message: {text: 'Game deleted!'}, type: 'success'})
    },

    async getGame(req, res) {
        const db = req.app.get('db')
        const {gameroom_id} = req.params

        // GET GAMEROOM
        
        const gameroom = await db.get_gameroom(gameroom_id)
        console.log(gameroom)

        // GET FRIENDSHIP STATS

        const friendship = await db.check_friendship([gameroom[0].host_id, gameroom[0].guest_id])
        console.log(friendship)

        gameroomObj = gameroom[0]
        friendshipObj = friendship[0]
        
        // GET GAME
        Game.findById(gameroom[0].game_id, function (err, game) {
            if (err) {
                console.log('error fetching game')
                throw err
            } else {
                res.status(200).send({gameroom: gameroomObj, friendship: friendshipObj, game})
            }
        })
    },

    async updateGame(req, res) {
        const db = req.app.get('db')
        const {gameroom_id, user_id} = req.params
        const {grid, message} = req.body
        const {turn_result, ship_sunk} = req.query

        console.log(message)


        // GET GAMEROOM INFO

        const gameroom = await db.get_gameroom(gameroom_id)

        // CHECK IF USER WHO TOOK THE TURN IS THE HOST OR GUEST

        let user
        if (+user_id === +gameroom[0].host_id) {
            user = 'host'
        } else {
            user = 'guest'
        }

        if (user === 'host') {
            let host_hits = gameroom[0].host_hits
            let host_misses = gameroom[0].host_misses
            let host_ships_sunk = gameroom[0].guest_ships_sunk
            if (turn_result === 'miss') {
                host_misses++
            } else {
                host_hits++
                if (ship_sunk === 'true') {
                    host_ships_sunk++
                }
            }
            const host_update = await db.update_gameroom_host_turn([gameroom[0].guest_id, host_hits, host_misses, host_ships_sunk, gameroom_id, message])

            Game.findByIdAndUpdate(gameroom[0].game_id, {"guest": grid}, function (err, game) {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send({gameroom: gameroom[0], game})
                }
            })

        } else {
            let guest_hits = gameroom[0].guest_hits
            let guest_misses = gameroom[0].guest_misses
            let guest_ships_sunk = gameroom[0].guest_ships_sunk
            let total_turns = gameroom[0].total_turns
            if (turn_result === 'miss') {
                guest_misses++
                total_turns++
            } else {
                guest_hits++
                total_turns++
                if (ship_sunk === 'true') {
                    guest_ships_sunk++
                }
            }
            const guest_update = await db.update_gameroom_guest_turn([gameroom[0].host_id, guest_hits, guest_misses, guest_ships_sunk, total_turns, gameroom_id, message])
            // UPDATE GUEST BOARD AND SEND
            Game.findByIdAndUpdate(gameroom[0].game_id, {"host": grid}, function (err, game) {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send({gameroom: gameroom[0], game})
                }
            })

        }
    },

    async setShips(req, res) {
        const db = req.app.get('db')
        const {gameroom_id, user_id} = req.params
        const {grid} = req.body

        const gameroom = await db.get_gameroom(gameroom_id)

        let user
        if (+user_id === +gameroom[0].host_id) {
            user = 'host'
        } else {
            user = 'guest'
        }

        if (user === 'host') {
            let update_turn = await db.update_turn([gameroom[0].guest_id, gameroom_id])
            Game.findByIdAndUpdate(gameroom[0].game_id, {"host": grid}, function (err, game) {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send({gameroom: gameroom[0], game})
                }
            })
        } else {
            let finish_ship_placement = await db.finish_ship_placement([gameroom[0].host_id, gameroom_id])
            Game.findByIdAndUpdate(gameroom[0].game_id, {"guest": grid}, function (err, game) {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send({gameroom: gameroom[0], game})
                }
            })
        }
    }
}