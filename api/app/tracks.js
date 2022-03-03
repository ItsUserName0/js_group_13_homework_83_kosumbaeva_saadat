const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.query.album) {
      const tracks = await Track.find({album: req.query.album});
      return res.send(tracks);
    }
    const tracks = await Track.find();
    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.duration) {
      return res.status(422).send({error: 'Title and duration are required!'});
    }
    const trackData = {
      title: req.body.title,
      album: null,
      duration: req.body.duration,
    }
    if (req.body.duration) {
      trackData.album = req.body.album;
    }
    const track = new Track(trackData);
    await track.save();

    return res.send({message: 'Created new track!', id: track._id});
  } catch (e) {
    next(e);
  }
});

module.exports = router;