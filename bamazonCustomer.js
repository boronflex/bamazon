
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
  this.stockAMT = 0;
  this.currPrice = 0;

  this.inStock = function(){

    return new Promise((resolve) => {
      connection.query(
        'SELECT stock_quantity FROM products WHERE ?',
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
          resolve(true);
          resolve(this.stockAMT = response[0].stock_quantity);
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

    newStockQuantity = this.stockAMT - this.productAmount;
    
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

        resolve(console.log(response));
        //console.log(response)
        
      });
    })

  };

  this.getPrice = function(){

  }
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
      
        stocked = await stocked.inStock();
      
        return stocked
      }
      
      validateStock().then(v => {

        var a = true;
        
        a = v;
      
        switch (a) {

          case true:

            console.log("product available")

            currOrder = new orderHandler(command.productID, command.productAMT);

            async function newPlaceOrder(){
      
              //ordered = await currOrder.placeOrder();
            
              console.log(`sanity check: ${currOrder.stockAMT}`)
            }
            
            newPlaceOrder();

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

module.exports = connection;

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
    //UPDATE query here
//    * Once the update goes through, show the customer the total cost of their purchase.
    //function here probably
