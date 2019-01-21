const MongoClient = require('mongodb').MongoClient;

/**
* @param {string} username name of the user
* @returns {any}
*/
module.exports = (username, context, callback) => {
  let uri = process.env['MONGO_URI'];
  try {
    MongoClient.connect(uri, (error, db) => {
      if (error) {
        console.log(error['errors']);
        return callback(error);
      }

      const database = db.db('shop');
      const collection = database.collection('users');
      let user = {
        username: username,
        cart: {
          total: "0",
          items: {}
        }
      }
      collection.createIndex({username:1},{unique:true});

      collection.insertOne(user, (err, result) => {
      })

      return callback(null, username + " added");
    });
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};
