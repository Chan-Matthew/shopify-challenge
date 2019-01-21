const MongoClient = require('mongodb').MongoClient;

/**
* @param {string} productID
* @param {string} name name of the item
* @param {string} price price of the item
* @param {string} quantity number of items
* @returns {any}
*/
module.exports = (productID, name, price, quantity, context, callback) => {
  let uri = process.env['MONGO_URI'];
  try {
    MongoClient.connect(uri, (error, db) => {
      if (error) {
        console.log(error['errors']);
        return callback(error);
      }

      const database = db.db('shop');
      const collection = database.collection('products');

      collection.createIndex({productID:1},{unique:true});

      let item = {
        productID: productID,
        name: name,
        price: price,
        quantity: quantity
      }
      
      collection.insertOne(item, (err, result) => {
      })

      return callback(null, name + " added");
    });
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};
