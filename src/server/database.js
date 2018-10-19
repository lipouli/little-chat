const MongoClient = require('mongodb').MongoClient;

module.exports = (async () => {
  
  const url = 'mongodb://localhost:27017/chat';

  const dbName = 'chat';
  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    await client.connect();
    console.log('db connected');

    const db = client.db(dbName);
    return db;

  } catch (err) {
    console.log(err.stack);
  }

  client.close();
})();
