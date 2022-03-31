const express = require('express');
const Track = require('../models/Track');
const Album = require('../models/Album');
const TrackHistory = require('../models/TrackHistory');
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', roles, async (req, res, next) => {
  try {
    let tracks;

    if (req.query.artistId) {
      if (req.user && req.user.role === 'admin') {
        const albums = await Album.find({artist: req.query.artistId}, null, {sort: {'_id': -1}});
        tracks = await Track.find({album: albums}, null, {sort: {'_id': -1}});
      } else {
        const albums = await Album.find({artist: req.query.artistId, is_published: true}, null, {sort: {'_id': -1}});
        tracks = await Track.find({album: albums, is_published: true}, null, {sort: {'_id': -1}});
      }
    }

    if (req.query.album) {
      if (req.user && req.user.role === 'admin') {
        tracks = await Track.find({album: req.query.album}, null, {sort: {'_id': -1}});
      } else {
        tracks = await Track.find({album: req.query.album, is_published: true}, null, {sort: {'_id': -1}});
      }
    }

    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

router.get('/byAlbum/:albumId', roles, async (req, res, next) => {
  try {
    let albums;

    if (req.user && req.user.role === 'admin') {
      albums = await Album.find({_id: req.params.albumId}, null, {sort: {'_id': -1}}).populate('artist');
    } else {
      albums = await Album.find({
        _id: req.params.albumId,
        is_published: true
      }, null, {sort: {'_id': -1}}).populate('artist');
    }

    if (albums.length === 0) {
      return res.status(422).send({error: 'No such album!'});
    }

    let tracks;

    if (req.user && req.user.role === 'admin') {
      tracks = await Track.find({album: albums}, null, {sort: {'_id': -1}});
    } else {
      tracks = await Track.find({album: albums, is_published: true}, null, {sort: {'_id': -1}});
    }

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

router.post('/', auth, async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.duration) {
      return res.status(422).send({error: 'Title and duration are required!'});
    }

    const trackData = {
      title: req.body.title,
      album: null,
      duration: req.body.duration,
      is_published: req.user.role === 'admin',
    }

    if (req.body.album) {
      trackData.album = req.body.album;
    }

    const track = new Track(trackData);
    await track.save();

    return res.send({message: 'Created new track!', id: track._id});
  } catch (e) {
    next(e);
  }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res, next) => {
  try {
    await Track.updateOne({_id: req.params.id}, {is_published: true});
    return res.send({message: 'Updated successful'});
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    await TrackHistory.deleteMany({track: req.params.id});
    await Track.findByIdAndDelete(req.params.id);

    return res.send({message: 'Deleted'});
  } catch (e) {
    next(e);
  }
});

module.exports = router;