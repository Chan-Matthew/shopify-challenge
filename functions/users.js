const MongoClient = require('mongodb').MongoClient;
var { graphql, buildSchema } = require('graphql');

/**
* @returns {any}
*/
module.exports = (context, callback) => {
  let uri = process.env['MONGO_URI'];

  try {
    MongoClient.connect(uri, (error, db) => {
      if (error) {
        console.log(error['errors']);
        return callback(error);
      }
      let users = {}
      const database = db.db('shop');
      const collection = database.collection('users');
      collection.find().toArray((err, items) => {
        for (let i = 0; i < items.length; i++){
            users[items[i]['username']] = items[i];
            delete users[items[i]['username']]['_id'];
        }
        return callback(null, users);
      });

    });
  } catch (error) {
    console.log(error);
    return callback(error);
  }



};
