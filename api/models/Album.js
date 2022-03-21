const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumData = new Schema({
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
    },
    release: Date,
    image: String,
    is_published: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {versionKey: false}
);

const Album = mongoose.model('Album', AlbumData);

module.exports = Album;