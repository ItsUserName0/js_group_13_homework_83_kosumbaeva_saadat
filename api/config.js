const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  mongo: {
    db: 'mongodb://localhost/music',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '1021247045450529',
    appSecret: 'c23863f0e52b3f2fc6cbfe0533db65fa',
  }
};