const express = require('express');
const auth = require('../middleware/auth');
const TrackHistory = require('../models/TrackHistory');

const router = express.Router();

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