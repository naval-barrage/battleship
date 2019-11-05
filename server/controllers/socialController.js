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
    },

    async updateUserImg(req, res) {
        const db = req.app.get('db')
        const {user_id} = req.params
        const level1 = 'https://cdn1.vectorstock.com/i/1000x1000/88/90/raft-vector-1228890.jpg'
        const level2 = 'https://image.flaticon.com/icons/png/512/184/184049.png'
        const level3 = 'https://media.istockphoto.com/vectors/wooden-canoe-isolated-icon-vector-id850422606?k=6&m=850422606&s=612x612&w=0&h=FP8HL3YWWhMOw1yTGrAhLY_QAFT4yriOMQsfzEhpJP8='
        const level4 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQzYvx5tfCksPzUMmiVV-yoMX5p-poGXWj92gnoPHwMhz4OVWb&s'
        const level5 = 'http://www.myiconfinder.com/uploads/iconsets/256-256-d8d329b704d34cf035a25811e32ba733-boat.png'
        const level6 = 'https://cdn3.vectorstock.com/i/1000x1000/15/47/fishing-boat-icon-cartoon-style-vector-11951547.jpg'
        const level7 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkStOetnnzzaEalFmsLNWjzslN4ChJqxVMGOlRkHdczVxSBQxCPQ&s'
        const level9 = 'https://cdn4.vectorstock.com/i/1000x1000/62/68/flat-style-icon-of-blue-warship-battleship-vector-20286268.jpg'
        const level8 = 'https://image.flaticon.com/icons/svg/1461/1461906.svg'
        const level10 = 'https://image.shutterstock.com/image-vector/mascot-icon-illustration-american-destroyer-260nw-1114934243.jpg'
        
        const user = await db.get_user(user_id)
        console.log(user[0].level)

        switch (user[0].level) {
            case 1:
                await db.update_user_img([level1, user_id])
                break
            case 2:
                await db.update_user_img([level2, user_id])
                break
            case 3:
                await db.update_user_img([level3, user_id])
                break
            case 4:
                await db.update_user_img([level4, user_id])
                break
            case 5: 
                await db.update_user_img([level5, user_id])
                break
            case 6:
                await db.update_user_img([level6, user_id])
                break
            case 7:
                await db.update_user_img([level7, user_id])
                break
            case 8:
                await db.update_user_img([level8, user_id])
                break
            case 9:
                await db.update_user_img([level9, user_id])
                break
            default:
                await db.update_user_img([level10, user_id])
                break
        }
        res.status(200).send({message: {text: `${user[0].username} leveled up!`, type: 'success'}})
    },

    async getUser(req, res) {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        let user = await db.get_user(user_id)
        res.status(200).send(user)
    }
}