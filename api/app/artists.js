const express = require('express');
const {artists} = require('../multer');
const auth = require("../middleware/auth");
const roles = require('../middleware/roles');
const published = require('../shared/functions');
const Artist = require('../models/Artist');
const mongoose = require("mongoose");

const router = express.Router();

router.get('/', roles, async (req, res, next) => {
  try {
    const artists = await published(req.user.role, Artist);
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, artists.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(422).send({error: 'Title is required!'});
    }

    const artistData = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
      is_published: req.user.role === 'admin',
    };

    const artist = new Artist(artistData);
    await artist.save();

    return res.send({message: 'Created artist', id: artist._id});
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }
    next(error);
  }
});

module.exports = router;
