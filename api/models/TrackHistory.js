const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    track: {
      type: Schema.Types.ObjectId,
      required: true,
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