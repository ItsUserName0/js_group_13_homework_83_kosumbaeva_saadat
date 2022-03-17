const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const Artist = require('../models/Artist');
const permit = require("../middleware/permit");
const auth = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(422).send({error: 'Title is required!'});
    }
    const artistData = {
      title: req.body.title,
      description: req.body.description,
      image: null,
    };
    if (req.file) {
      artistData.image = req.file.filename;
    }
    const artist = new Artist(artistData);
    await artist.save();

    return res.send({message: 'Created artist', id: artist._id});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
