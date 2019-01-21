# Matthew Chan
 Everything hosted through http://matthewchan.stdlib.com/shopify@dev/
 
 products are defined as 
 {
  productID: ,
  name: ,
  price ,
  quantity
 }
 where productID's are unique between different products
 
 users are defined as 
  {
  username: ,
  cart: {
    total: ,
    items: {
    }
  }
 }
 where usernames are unique between different users
 
 # endpoints
 <h2> / </h2>
 Parameter {string} onlyAvailable (can only be 'true' or 'false')
 
 Example: http://matthewchan.stdlib.com/shopify@dev/?onlyAvailable=false
 
 Displays all products with the option to show products with available stock
 
<h2> createProduct </h2>

Parameter {string} productID (unique identifier)
Parameter {string} name (name of the item)
Parameter {string} price (price of the item)
Parameter {string} quantity (number of items)

Example: https://matthewchan.lib.id/shopify@dev/createProduct/?productID=item6&name=watermelon&price=10&quantity=20

Creates a product in the store
