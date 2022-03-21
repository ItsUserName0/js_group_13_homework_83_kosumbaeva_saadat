const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (value) {
          if (!this.isModified('title')) return true;
          const artist = await Artist.findOne({title: value});
          return !artist;
        },
        message: 'This artist is already exists!',
      }
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
