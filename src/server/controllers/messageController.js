const connection = require('../database');

const getCollection = async () => {
  const db = await connection;
  const collection = db.collection('messages');
  return collection;
};

exports.get = async (req, res) => {
  const collection = await getCollection();
  const searchResult = await collection.find().toArray();
  res.json({
    messages: searchResult,
  });
};

exports.send = async (name) => {
  const collection = await getCollection();
  const data = name;
  const resultInsert = await collection.insertOne({text: data.message});
  return resultInsert.insertedId;
};
