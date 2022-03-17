const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');
const User = require('./models/User');

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [Billie, Stromae, Maneskin] = await Artist.create(
    {
      title: 'Billie',
      image: 'billie.jpg',
      description: 'Billie Eilish Pirate Baird O\'Connell (born December 18, 2001), better known by her stage name Billie Eilish, is an American singer-songwriter signed to Interscope Records.',
    },
    {
      title: 'Stromae',
      image: 'stromae.jpg',
      description: 'Paul Van Haver (born March 12th, 1985), better known by his stage name Stromae, is a Belgian rapper, singer, and songwriter.',
    },
    {
      title: 'Maneskin',
      image: 'maneskin.jpeg',
      description: 'Måneskin (Italian: [ˈmɔːneskin], Danish for \'moonlight\') is an Italian rock band formed in Rome in 2016. The band is composed of vocalist Damiano David, bassist Victoria De Angelis, guitarist Thomas Raggi, and drummer Ethan Torchio.',
    },
  );

  const [DontSmileAtMe, RacineCarree, TeatroDira] = await Album.create(
    {
      artist: Billie,
      title: 'Dont smile at me',
      release: '2017',
      image: 'billie_album.jpg',
    },
    {
      artist: Stromae,
      title: 'Racine carree',
      release: '2013',
      image: 'stromae_album.jpg',
    },
    {
      artist: Maneskin,
      title: 'Teatro d\'ira - Vol. 1',
      release: '2021',
      image: 'maneskin_album.jpg',
    },
  );

  await Track.create(
    {
      title: 'ocean eyes',
      album: DontSmileAtMe,
      duration: '3:20',
    }, {
      title: 'COPYCAT',
      album: DontSmileAtMe,
      duration: '3:18',
    }, {
      title: 'watch',
      album: DontSmileAtMe,
      duration: '3:19',
    }, {
      title: 'hostage',
      album: DontSmileAtMe,
      duration: '3:54',
    }, {
      title: 'bellyache',
      album: DontSmileAtMe,
      duration: '3:31',
    }, {
      title: 'Tous les memes',
      album: RacineCarree,
      duration: '3:37',
    }, {
      title: 'Ta fete',
      album: RacineCarree,
      duration: '2:56',
    }, {
      title: 'batard',
      album: RacineCarree,
      duration: '3:29',
    }, {
      title: 'moules frites',
      album: RacineCarree,
      duration: '2:39',
    }, {
      title: 'sommeil',
      album: RacineCarree,
      duration: '3:39',
    }, {
      title: 'Coraline',
      album: TeatroDira,
      duration: '4:58',
    }, {
      title: 'Zitti e buoni',
      album: TeatroDira,
      duration: '3:30',
    }, {
      title: 'Lividi sui gomiti',
      album: TeatroDira,
      duration: '2:43',
    }, {
      title: 'Vent\'anni',
      album: TeatroDira,
      duration: '4:13',
    }, {
      title: 'La paura del buio',
      album: TeatroDira,
      duration: '3:29',
    },
  );

  await User.create(
    {
      email: 'user@user',
      password: '123',
      avatar: 'user1.png',
      displayName: 'John Doe',
      token: nanoid(),
      role: 'user',
    },
    {
      email: 'admin@admin',
      password: '123',
      avatar: 'user2.jpg',
      displayName: 'Admin',
      token: nanoid(),
      role: 'admin',
    },
  );

  await mongoose.connection.close();
}

run().catch(e => console.error(e));
