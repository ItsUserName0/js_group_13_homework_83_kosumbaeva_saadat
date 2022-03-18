const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    track: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Track',
    },
    datetime: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {versionKey: false}
);

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

module.exports = TrackHistory;