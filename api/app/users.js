const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(422).send({error: 'Email and password are required!'});
    }

    const userData = {
      email: req.body.email,
      password: req.body.password,
    }

    const user = new User(userData);
    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
});

router.post('/sessions', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(422).send({error: 'Email and password are required!'});
    }

    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(422).send({error: 'Email or password are incorrect!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({error: 'Email or password are incorrect!'});
    }

    user.generateToken();
    await user.save();

    return res.send({token: user.token});
  } catch (e) {
    next(e);
  }
});

module.exports = router;