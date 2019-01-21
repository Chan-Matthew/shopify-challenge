# Matthew Chan
 Everything hosted through http://matthewchan.stdlib.com/shopify@dev/
 
 Built using stdlib and mongodb

 All actions are done through POST/GET requests

 Timeouts occur occasionally but all users and products are still updated fine
 
 
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
 
 each of the items in the cart is in the format [productID: quantity]
 
 
 # endpoints
 <h2> / </h2>
 Parameters: 
 
 {string} onlyAvailable (can only be 'true' or 'false')
 
 Example: http://matthewchan.stdlib.com/shopify@dev/?onlyAvailable=false
 
 Displays all products with the option to show products with available stock
 
 
 <h2> /users </h2>
 
 http://matthewchan.stdlib.com/shopify@dev/users
 
 Displays all user information (for the sake of keeping track of what is in every cart)
 
 
<h2> /createProduct </h2>

Parameters:

{string} productID (unique identifier)

{string} name (name of the item)

{string} price (price of the item)

{string} quantity (number of items)

Example: https://matthewchan.lib.id/shopify@dev/createProduct/?productID=item6&name=watermelon&price=10&quantity=20

Creates a product in the store


<h2> /createUser </h2>

Parameters:

{string} username (unique identifier)

Example: https://matthewchan.lib.id/shopify@dev/createUser/?username=shopify

Creates a user


<h2> /addToCart </h2>

Parameters:

{string} username

{string} productID (id of the item)

{string} quantity (number of items)

Example: https://matthewchan.lib.id/shopify@dev/addToCart/?productID=item1&username=admin&quantity=1

Adds a product with a specific quantity into the user's cart


<h2> /deleteFromCart </h2>

Parameters:

{string} username

{string} productID (id of the item)

{string} quantity (number of items)

Example: https://matthewchan.lib.id/shopify@dev/deleteFromCart/?productID=item1&username=admin&quantity=1

Deletes a product with a specific quantity from the user's cart


<h2> /purchaseCart </h2>

Parameters:

{string} username

Example: https://matthewchan.lib.id/shopify@dev/purchaseCart/?username=admin

Purchases all items in the cart with available stock


<h2> /purchase </h2>

Parameters:

{string} productID
{string} quantity

Example: https://matthewchan.lib.id/shopify@dev/purchase/?productID=item1&quantity=1

Purchases a single product
