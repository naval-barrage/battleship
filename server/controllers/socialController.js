module.exports = {
    async newFriends(req, res) {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {new_friend_id} = req.params

        const friendship = await db.check_friendship([user_id, new_friend_id])
        console.log(friendship)
        if (friendship[0]) return res.status(200).send({message: {text: 'You are already friends with this user.', type: 'warning'}})
        
        const friend = await db.add_friendship([user_id, new_friend_id])
        console.log(friend)

        res.status(200).send({message: {text: `You are now friends with ${friend[0].username}!`, type: 'success'}})
    },

    async getFriends(req, res) {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        const friends = await db.get_friends(user_id)

        const friendList = await Promise.all(friends.map(async el => {
            if (el.friend1 !== user_id) {
                const friend_info = await db.get_user(el.friend1)
                return ({friendship_info: el, friend_info})
            } else {
                const friend_info = await db.get_user(el.friend2)
                return ({friendship_info: el, friend_info})
            }
        }))
        res.status(200).send(friendList)
    },

    async getUsers(req, res) {
        const db = req.app.get('db')
        const {username} = req.query

        const users = await db.get_users(`%${username}%`)
        res.status(200).send(users)
    },

    async getActiveGames(req, res) {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        const activeGames = await db.get_games(user_id)
        console.log(activeGames)

        const activeGamesList = await Promise.all(activeGames.map(async el => {
            if (el.host_id !== user_id) {
                const friend_info = await db.get_user(el.host_id)
                return ({game_info: el, friend_info})
            } else {
                const friend_info = await db.get_user(el.guest_id)
                return ({game_info: el, friend_info})
            }
        }))
        res.status(200).send(activeGamesList)
    }
}