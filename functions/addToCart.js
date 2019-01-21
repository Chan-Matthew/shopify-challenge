const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

/**
* @param {string} username
* @param {string} productID id of the item
* @param {string} quantity number of items
* @returns {any}
*/
module.exports = (username, productID, quantity, context, callback) => {
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
        let cart = items[0]['cart'];
        cart = addItem(cart, productID, quantity);

        //
        let shoppingCart = cart['items'];
        let keys = Object.keys(shoppingCart);
        let values = Object.values(shoppingCart);
        let total = 0;
        for (let i = 0; i < keys.length; i++){
          productCollection.find({"productID": keys[i]}).toArray((err, items) => {
            let price = parseInt(items[0]['price']);
            total = total + (price * parseInt(values[i]));
            cart['total'] = total.toString();
            userCollection.updateOne({"username": username}, {"$set": {"cart": cart}}, (err, item) => {

            });
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

function addItem(cart, productID, quantity){
  if (cart['items'].hasOwnProperty(productID)) {
    cart['items'][productID] = (parseInt(cart['items'][productID]) + parseInt(quantity)).toString();
  }
  else {
    cart['items'][productID] = quantity.toString();
  }
  return cart;
}

function updateTotal(username, cart, productCollection){
  let shoppingCart = cart['items'];
  let keys = Object.keys(shoppingCart);
  return keys
  let values = Object.values(shoppingCart);
  let total = 0;
  for (let i = 0; i < keys.length; i++){
    productCollection.find({"productID": keys[i]}).toArray((err, items) => {
      return keys[i]
      let price = parseInt(items[0]['price']);
      total = total + (price * parseInt(values[i]));
      cart['total'] = total.toString();
    });
  }
  //return total;
}
