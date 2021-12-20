const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

loginRouter.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ error: 'username and password must be input' });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'username not registered yet' });

    const correctPassword = await bcrypt.compare(password, user.passwordHash);
    if (!correctPassword) return res.status(400).json({ error: 'password wrong' });

    const userForToken = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });

    return res.status(200).json({ token, username: user.username, name: user.name });
  } catch (err) {
    return next(err);
  }
});

module.exports = loginRouter;
