const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

/**
* @param {string} username
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
      const userCollection = database.collection('users');
      const productCollection = database.collection('products');

      userCollection.find({"username": username}).toArray((err, items) => {
        let user = items[0]['cart'];
        let keys = Object.keys(user['items']);
        let values = Object.values(user['items']);

        for (let i = 0; i < keys.length; i++){
          productCollection.find({"productID": keys[i]}).toArray((err, items) => {
            let updated = parseInt(items[0]['quantity']) - parseInt(values[i]);
            if (updated >= 0) {
              productCollection.updateOne({"productID": keys[i]}, {"$set": {"quantity": updated.toString()}}, (err, item) => {
                console.log(keys[i] + " purchased");
                delete user['items'][keys[i]];
                userCollection.updateOne({"username": username}, {"$set": {"cart": user}}, (err, item) => {
                  
                });
              });
            }
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};
