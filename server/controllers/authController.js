const bcrypt = require("bcryptjs");

module.exports = {
  async register(req, res) {
    const db = req.app.get("db");
    const { username, email, password } = req.body;

    const user = await db.find_username(username);
    if (user[0])
      return res
        .status(200)
        .send({
          message: { text: "Username already in use.", type: "warning" }
        });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userId = await db.add_user([username, email]);
    db.add_hash({ user_id: userId[0].user_id, hash }).catch(err => {
      return res.sendStatus(503);
    });

    req.session.user = { username, userId: userId[0].user_id };
    req.session.loggedIn = true;
    res
      .status(201)
      .send({
        message: { text: "Registered and logged in!", type: "success" },
        user: req.session.user,
        loggedIn: req.session.loggedIn
      });
  },

  async login(req, res) {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const user = await db.find_user(username);

    if (!user[0])
      return res
        .status(200)
        .send({ message: { text: "Username does not exist.", type: "error" } });

    const result = bcrypt.compareSync(password, user[0].hash);

    if (!result)
      return res
        .status(200)
        .send({
          message: { text: "Incorrect Username or Password", type: "error" }
        });

    req.session.user = { username, user_id: user[0].user_id };
    req.session.loggedIn = true;
    res
      .status(200)
      .send({
        message: { text: "Logged in!", type: "success" },
        user: req.session.user,
        loggedIn: req.session.loggedIn
      });
  },

  async logout(req, res) {
    req.session.destroy();
    res
      .status(200)
      .send({
        message: { text: "Logged out!", type: "success" },
        loggedIn: false
      });
  },

  async getUser(req, res) {
    return res
      .status(200)
      .send({ user: req.session.user, loggedIn: req.session.loggedIn });
  }
};
