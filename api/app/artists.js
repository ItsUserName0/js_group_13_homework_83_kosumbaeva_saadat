const express = require('express');
const {artists} = require('../multer');
const auth = require("../middleware/auth");
const roles = require('../middleware/roles');
const Artist = require('../models/Artist');
const mongoose = require("mongoose");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', roles, async (req, res, next) => {
  try {
    let artists;

    if (req.user && req.user.role === 'admin') {
      artists = await Artist.find({}, null, {sort: {'_id': -1}});
    } else {
      artists = await Artist.find({is_published: true}, null, {sort: {'_id': -1}});
    }

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

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    await Artist.findByIdAndDelete(req.params.id);
    return res.send({message: 'Deleted'});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
