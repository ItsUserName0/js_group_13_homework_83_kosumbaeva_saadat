const express = require('express');
const {artists} = require('../multer');
const Artist = require('../models/Artist');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, artists.single('image'), async (req, res, next) => {
  try {
    console.log(req.body);
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
    next(error);
  }
});

module.exports = router;
