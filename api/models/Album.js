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
});

const Album = mongoose.model('Album', AlbumData);

module.exports = Album;