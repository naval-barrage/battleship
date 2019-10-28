const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const {username, email, password} = req.body
        console.log(username, email, password)

        const user = await db.find_username(username)
        if (user[0]) return res.status(200).send({message: {text: 'Username already in use.', type: 'warning'}})

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        console.log(salt)
        console.log(hash)

        const userId = await db.add_user([username, email])
        console.log(userId)
        // db.add_hash({user_id: userId[0].user_id, hash}).catch(err => {
        //     return res.sendStatus(503)
        // })

    }
}