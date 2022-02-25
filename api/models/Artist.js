const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  description: String,
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
