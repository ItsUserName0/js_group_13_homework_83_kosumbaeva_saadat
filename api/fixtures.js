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

  const [Billie, Stromae, Maneskin, Lana] = await Artist.create(
    {
      title: 'Billie',
      image: 'fixtures/billie.jpg',
      description: 'Billie Eilish Pirate Baird O\'Connell (born December 18, 2001), better known by her stage name Billie Eilish, is an American singer-songwriter signed to Interscope Records.',
      is_published: true,
    },
    {
      title: 'Stromae',
      image: 'fixtures/stromae.jpg',
      description: 'Paul Van Haver (born March 12th, 1985), better known by his stage name Stromae, is a Belgian rapper, singer, and songwriter.',
      is_published: true,
    },
    {
      title: 'Maneskin',
      image: 'fixtures/maneskin.jpeg',
      description: 'Måneskin (Italian: [ˈmɔːneskin], Danish for \'moonlight\') is an Italian rock band formed in Rome in 2016. The band is composed of vocalist Damiano David, bassist Victoria De Angelis, guitarist Thomas Raggi, and drummer Ethan Torchio.',
      is_published: true,
    },{
      title: 'Lana Del Rey',
      image: 'fixtures/lana.webp',
      description: 'Description',
      is_published: false,
    },
  );

  const [DontSmileAtMe, RacineCarree, TeatroDira, DieForMe] = await Album.create(
    {
      artist: Billie,
      title: 'Dont smile at me',
      release: '2017',
      image: 'fixtures/billie_album.jpg',
      is_published: true,
    },
    {
      artist: Stromae,
      title: 'Racine carree',
      release: '2013',
      image: 'fixtures/stromae_album.jpg',
      is_published: true,
    },
    {
      artist: Maneskin,
      title: 'Teatro d\'ira - Vol. 1',
      release: '2021',
      image: 'fixtures/maneskin_album.jpg',
      is_published: true,
    },{
      artist: Lana,
      title: 'Die for me',
      release: '2021',
      image: 'fixtures/lana_album.jpg',
      is_published: false,
    },
  );

  await Track.create(
    {
      title: 'ocean eyes',
      album: DontSmileAtMe,
      duration: '3:20',
      is_published: true,
    }, {
      title: 'COPYCAT',
      album: DontSmileAtMe,
      duration: '3:18',
      is_published: true,
    }, {
      title: 'watch',
      album: DontSmileAtMe,
      duration: '3:19',
      is_published: true,
    }, {
      title: 'hostage',
      album: DontSmileAtMe,
      duration: '3:54',
      is_published: true,
    }, {
      title: 'bellyache',
      album: DontSmileAtMe,
      duration: '3:31',
      is_published: true,
    }, {
      title: 'Tous les memes',
      album: RacineCarree,
      duration: '3:37',
      is_published: true,
    }, {
      title: 'Ta fete',
      album: RacineCarree,
      duration: '2:56',
      is_published: true,
    }, {
      title: 'batard',
      album: RacineCarree,
      duration: '3:29',
      is_published: true,
    }, {
      title: 'moules frites',
      album: RacineCarree,
      duration: '2:39',
      is_published: true,
    }, {
      title: 'sommeil',
      album: RacineCarree,
      duration: '3:39',
      is_published: true,
    }, {
      title: 'Coraline',
      album: TeatroDira,
      duration: '4:58',
      is_published: true,
    }, {
      title: 'Zitti e buoni',
      album: TeatroDira,
      duration: '3:30',
      is_published: true,
    }, {
      title: 'Lividi sui gomiti',
      album: TeatroDira,
      duration: '2:43',
      is_published: true,
    }, {
      title: 'Vent\'anni',
      album: TeatroDira,
      duration: '4:13',
      is_published: true,
    }, {
      title: 'La paura del buio',
      album: TeatroDira,
      duration: '3:29',
      is_published: true,
    },{
      title: 'track1',
      album: DieForMe,
      duration: '4:13',
      is_published: false,
    }, {
      title: 'track2',
      album: DieForMe,
      duration: '3:29',
      is_published: false,
    },
  );

  await User.create(
    {
      email: 'user@user',
      password: '123',
      avatar: 'fixtures/user1.png',
      displayName: 'John Doe',
      token: nanoid(),
      role: 'user',
    },
    {
      email: 'admin@admin',
      password: '123',
      avatar: 'fixtures/user2.jpg',
      displayName: 'Admin',
      token: nanoid(),
      role: 'admin',
    },
  );

  await mongoose.connection.close();
}

run().catch(e => console.error(e));
