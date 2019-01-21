const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

/**
* @param {string} productID id of the item
* @param {string} quantity number of items
* @returns {any}
*/
module.exports = (productID, quantity, context, callback) => {
  let uri = process.env['MONGO_URI'];
  try {
    MongoClient.connect(uri, (error, db) => {
      if (error) {
        console.log(error['errors']);
        return callback(error);
      }

      const database = db.db('shop');
      const collection = database.collection('products');

      collection.find({"productID": productID}).toArray((err, items) => {
        let curr = parseInt(items[0]['quantity']);
        let name = items[0]['name']
        let updated = curr - parseInt(quantity);
        if (updated < 0) {
          return callback(null, 'not enough inventory');
        }

        collection.updateOne({"productID": productID}, {"$set": {"quantity": updated.toString()}}, (err, item) => {
          return callback(null, name + ' purchased');
        });
      });
    });
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};
