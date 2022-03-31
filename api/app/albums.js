const express = require('express');
const {albums} = require('../multer');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Track = require('../models/Track');
const TrackHistory = require('../models/TrackHistory');
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', roles, async (req, res, next) => {
  try {
    let albums;

    if (req.user && !req.query.artist) {
      if (req.user.role === 'user') {
        albums = await Album.find(
          {is_published: true},
          null,
          {sort: {'_id': -1}});
      } else {
        albums = await Album.find({}, null, {sort: {'_id': -1}});
      }
    } else if (req.query.artist && !req.user) {
      albums = await Album.find(
        {artist: req.query.artist, is_published: true},
        null,
        {sort: {'_id': -1}}).populate("artist", "title");
    } else if (req.user && req.query.artist) {
      if (req.user.role === 'user') {
        albums = await Album.find(
          {artist: req.query.artist, is_published: true},
          null,
          {sort: {'_id': -1}}).populate("artist", "title");
      } else {
        albums = await Album.find(
          {artist: req.query.artist},
          null,
          {sort: {'_id': -1}}).populate("artist", "title");
      }
    }

    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', roles, async (req, res, next) => {
  try {
    let albums;

    if (req.user && req.user.role === 'admin') {
      albums = await Album.find({_id: req.params.id}, null, {sort: {'_id': -1}}).populate("artist");
    } else {
      albums = await Album.find({_id: req.params.id, is_published: true}, null, {sort: {'_id': -1}}).populate("artist");
    }

    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

router.get('/withArtist/:id', roles, async (req, res, next) => {
  try {
    let artist;
    let albums;

    if (req.user && req.user.role === 'admin') {
      [artist] = await Artist.find({_id: req.params.id}, null, {sort: {'_id': -1}});
      albums = await Album.find({artist: req.params.id});
    } else {
      [artist] = await Artist.find({_id: req.params.id, is_published: true}, null, {sort: {'_id': -1}});
      albums = await Album.find({artist: req.params.id, is_published: true}, null, {sort: {'_id': -1}});
    }

    const albumsWithArtist = [{
      artist: artist,
      albums: albums,
    }];

    res.send(albumsWithArtist);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, albums.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.artist) {
      return res.status(422).send({error: 'Title and artist are required!'});
    }

    const albumData = {
      title: req.body.title,
      artist: req.body.artist,
      release: null,
      image: req.file ? req.file.filename : null,
      is_published: req.user.role === 'admin',
    };

    if (req.body.release) {
      const date = new Date(req.body.release);
      if (isNaN(date.getDate())) {
        return res.status(422).send({error: 'The date is incorrect!'});
      }
      albumData.release = date;
    }

    const album = new Album(albumData);
    await album.save();

    return res.send({message: 'Created album', id: album._id});
  } catch (e) {
    next(e);
  }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res, next) => {
  try {
    await Album.updateOne({_id: req.params.id}, {is_published: true});
    return res.send({message: 'Updated successful'});
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const tracks = await Track.find({album: req.params.id});

    await TrackHistory.deleteMany({track: tracks});
    await Track.deleteMany({album: req.params.id});
    await Album.findByIdAndDelete(req.params.id);

    return res.send({message: 'Deleted'});
  } catch (e) {
    next(e);
  }
});

module.exports = router;