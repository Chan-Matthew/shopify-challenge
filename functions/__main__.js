const MongoClient = require('mongodb').MongoClient;
var { graphql, buildSchema } = require('graphql');

/**
* @param {string} onlyAvailable
* @returns {any}
*/
module.exports = (onlyAvailable, context, callback) => {
  let uri = process.env['MONGO_URI'];

  try {
    MongoClient.connect(uri, (error, db) => {
      if (error) {
        console.log(error['errors']);
        return callback(error);
      }
      let products = {}
      const database = db.db('shop');
      const collection = database.collection('products');
      collection.find().toArray((err, items) => {
        for (let i = 0; i < items.length; i++){
          if (onlyAvailable == "true"){
            if (parseInt(items[i]['quantity']) > 0) {
              products[items[i]['productID']] = items[i];
              delete products[items[i]['productID']]['_id'];
            }
          }
          else if (onlyAvailable == "false") {
            products[items[i]['productID']] = items[i];
            delete products[items[i]['productID']]['_id'];
          }
          else {
            return callback(null, "incorrect parameter: onlyAvailable=(true/false)");
          }
        }
        console.log(products);
        return callback(null, products);
      });

    });
  } catch (error) {
    console.log(error);
    return callback(error);
  }



};
