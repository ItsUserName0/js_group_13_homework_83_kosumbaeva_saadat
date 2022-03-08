const express = require('express');
const {nanoid} = require('nanoid');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const User = require('../models/User');
const mongoose = require("mongoose");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

router.post('/', upload.single('avatar'), async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.displayName || !req.body.confirmPassword) {
      return res.status(422).send({error: 'Email, password, confirm password and display name are required!'});
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(422).send({errors: {confirmPassword: {message: 'Incorrect password confirmation!'}}});
    }

    const userData = {
      email: req.body.email,
      password: req.body.password,
      repeatPassword: req.body.repeatPassword,
      displayName: req.body.displayName,
      avatar: null
    }

    if (req.file) {
      userData.avatar = req.file.filename;
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

    return res.send({token: user.token});
  } catch (e) {
    next(e);
  }
});

module.exports = router;