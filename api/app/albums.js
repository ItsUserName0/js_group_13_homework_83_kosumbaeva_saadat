const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const config = require('../config');
const Album = require('../models/Album');

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
    if (req.query.artist) {
      const albums = await Album.find({artist: req.query.artist});
      return res.send(albums);
    }
    const albums = await Album.find().populate("artist");
    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const albums = await Album.find({_id: req.params.id});
    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.artist) {
      return res.status(400).send({error: 'Title and artist are required!'});
    }
    const albumData = {
      title: req.body.title,
      artist: req.body.artist,
      release: null,
      image: null,
    };
    if (req.body.release) {
      const date = new Date(req.body.release);
      if (isNaN(date.getDate())) {
        return res.status(400).send({error: 'The date is incorrect!'});
      }
      albumData.release = date;
    }
    if (req.file) {
      albumData.image = req.file.filename;
    }
    const album = new Album(albumData);
    await album.save();

    return res.send({message: 'Created album', id: album._id});
  } catch (e) {
    next(e);
  }
});

module.exports = router;