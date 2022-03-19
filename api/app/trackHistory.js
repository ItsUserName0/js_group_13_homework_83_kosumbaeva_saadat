const express = require('express');
const auth = require('../middleware/auth');
const TrackHistory = require('../models/TrackHistory');
const Album = require('../models/Album');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const trackHistory = await TrackHistory.find({user: req.user._id}, null, {sort: {'_id': -1}}).populate('track', 'title album');
    const arr = [];
    for (let i = 0; i < trackHistory.length; i++) {
      const [album] = await Album.find({_id: trackHistory[i]['track'].album._id}).populate('artist', 'title');
      const data = {
        trackHistory: trackHistory[i],
        artist: album['artist'].title,
      };
      arr.push(data);
    }
    return res.send(arr);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    if (!req.body.track) {
      return res.status(422).send({error: 'Track is required!'});
    }
    const trackHistoryData = {
      user: req.user._id,
      track: req.body.track,
    };
    const trackHistory = new TrackHistory(trackHistoryData);
    await trackHistory.save();

    return res.send(trackHistory);
  } catch (e) {
    next(e);
  }
});

module.exports = router;