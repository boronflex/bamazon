var inquirer = require("inquirer");
var mysql = require("mysql");

//var orderHandler = require("./orderHandler");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "8Ya[qsu0KdY",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected")
  customerOrder(); //run app if connection successful
});

//################################begin order handler constructor

var orderHandler = function(productID, productAmount) {

  this.productID = productID;
  this.productAmount = productAmount;
  var stockAMT = 0;
  var currPrice = 0;

  this.inStock = function(){

    return new Promise((resolve) => {
      connection.query(
        'SELECT stock_quantity, price FROM products WHERE ?',
      {
        item_id: productID
      },

      function(error, response){
        if(error){
          throw error;
        }
        
        if (response.length === 0){
          resolve(false);
        } else if (response[0].stock_quantity < productAmount) {
          resolve(false)
        } else {
          //console.log(response);
          stockAMT = response[0].stock_quantity
          currPrice = response[0].price
          //console.log(currPrice);
          resolve(true);
        }
        
      });
    })
  };
  
  this.listAvailable = function(){

    itemList = "Items for sale: ";

    return new Promise((resolve) => {

      connection.query(

        'SELECT * FROM products',
  
          function(error, response){
            if(error){
              throw error;
            }
      
            //response = JSON.stringify(response, null, 2)
        
              let iterable = response;
        
              for (let value of iterable){
                itemList += `\n${value.item_id} - ${value.product_name} -$${value.price}`
              }

              resolve(itemList);

            //console.log(response);
            
          });

    })

  };

  this.placeOrder = function(){

    //console.log(`stock amount ${stockAMT}`)
    //console.log(`product amount ${productAmount}`)

    newStockQuantity = stockAMT - productAmount;
    
    return new Promise((resolve) => {
      connection.query(
        'UPDATE products SET stock_quantity = ? WHERE item_id = ?',
      [
        newStockQuantity,
        productID
      ],

      function(error, response){
        if(error){
          throw error;
        }

        resolve(response);
        
      });
    })

  };

  this.getPrice = function(){

    newStockQuantity = stockAMT - productAmount;
    
    return new Promise((resolve) => {

      resolve(console.log(`Total Amount: $${productAmount * currPrice}`))

    })
  };
}

var myOrder = new orderHandler;


//################################end order handler constructor

// 6. The app should then prompt users with two messages.

async function customerOrder(){

  console.log(await myOrder.listAvailable())

  inquirer.prompt([// consider throwing an autocomplete in here https://github.com/mokkabonna/inquirer-autocomplete-prompt
    
          //also there is a validate feature i could use here in the docs, returns promise
          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    
    //    * The first should ask them the ID of the product they would like to buy.
          
    {
      type: "input",
      name: "productID",
      message: "Enter a Number for order, press E to exit: "
    },

//    * The second message should ask how many units of the product they would like to buy.

    {
      type: "input",
      name: "productAMT",
      message: "How many do you want to purchase?",
    }

  
  ]).then(function(command) {

    // console.log(`product ID: ${command.productID}`)
    // console.log(`product Amount: ${command.productAMT}`)

    if (command.productID === 'e'){
      console.log('thanks for visiting bamazon');
    } else {


      stocked = new orderHandler(command.productID, command.productAMT);//

      async function validateStock(){
      
        isStocked = await stocked.inStock();
      
        return isStocked
      }
      
      validateStock().then(v => {

        var a = true;
        
        a = v;
      
        switch (a) {

          case true:

            console.log("product available")

            async function newPlaceOrder(){
      
              ordered = await stocked.placeOrder();

              console.log(`Order Placed!`)

            }

            async function newGetPrice(){
      
              totaled = await stocked.getPrice();

            }

            newPlaceOrder();

            newGetPrice();

            break;
    
          case false:
            console.log("Product not available or insufficient quantity, place a different order")
            customerOrder();
            break;
    
        }
      
      });

    }

  });

}

// customerOrder();

//module.exports = connection;

//    * Once the update goes through, show the customer the total cost of their purchase.
    //function here probably
