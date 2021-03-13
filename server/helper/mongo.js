const mongoose = require('mongoose');
class MongoConnect {
  constructor() {
    this.connectMaster();
  }

  connectMaster() {
    const mongoConfig = global.CONFIG['mongo'];
    const username = mongoConfig['username'];
    const password = mongoConfig['password'];
    const hosts = mongoConfig['host'];
    const database = mongoConfig['db_name'];
    const debug = mongoConfig['debug'] || true;

    this.uri = 'mongodb://';

    if (username !== '' && password !== '') {
      this.uri += `${username}:${password}@`;
    }

    this.uri += `${hosts}/${database}?authSource=${database}`;

    const options = {
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    mongoose.set('debug', debug);
    global.Mongoose = mongoose;
    mongoose.connect(this.uri, options)
      .then(
        () => console.info(`Worker ${process.pid} connected to Mongo Database`),
        err => console.error(`Worker ${process.pid} failed connecting to Mongo Database: ${err}`)
      );
  }
}

module.exports = MongoConnect;
