const express = require('express');
const Track = require('../models/Track');
const Album = require('../models/Album');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.query.artistId) {
      const albums = await Album.find({artist: req.query.artistId});
      const tracks = await Track.find({album: albums});
      return res.send(tracks);
    }
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

router.get('/byAlbum/:albumId', async (req, res, next) => {
  try {
    const albums = await Album.find({_id: req.params.albumId}).populate('artist');
    if (albums.length === 0) {
      return res.status(422).send({error: 'No such album!'});
    }
    const tracks = await Track.find({album: albums});
    const responseData = {
      artist: albums[0].artist,
      album: albums[0],
      tracks: tracks,
    };
    return res.send(responseData);
  } catch (e) {
    next(e);
  }
})

router.post('/', auth, permit('admin'), async (req, res, next) => {
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