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
    is_published: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {versionKey: false}
);

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
