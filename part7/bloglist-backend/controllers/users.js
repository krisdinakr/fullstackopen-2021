const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
    if (!users.length) return res.status(200).json('No Data');

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

userRouter.post('/', async (req, res, next) => {
  try {
    const {
      username, name, password, blogs,
    } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "'username' and 'password' required" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username, name, passwordHash, blogs,
    });

    const savedUser = await user.save();

    return res.status(201).json(savedUser);
  } catch (err) {
    return next(err);
  }
});

module.exports = userRouter;
