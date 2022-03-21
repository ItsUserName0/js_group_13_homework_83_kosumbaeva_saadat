const express = require('express');
const mongoose = require("mongoose");
const {avatar} = require('../multer');
const User = require('../models/User');

const router = express.Router();

router.post('/', avatar.single('avatar'), async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.displayName) {
      return res.status(422).send({error: 'Email, password, and display name are required!'});
    }

    const userData = {
      email: req.body.email,
      password: req.body.password,
      repeatPassword: req.body.repeatPassword,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    }

    const user = new User(userData);
    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
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

    return res.send(user);
  } catch (e) {
    next(e);
  }
});

router.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const message = {message: 'OK'};

    if (!token) return res.send(message);

    const user = await User.findOne({token});

    if (!user) return res.send(message);

    user.generateToken();
    await user.save();

    return res.send(message);
  } catch (e) {
    next(e);
  }
})

module.exports = router;