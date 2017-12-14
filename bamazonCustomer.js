// 5. Then create a Node application called `bamazonCustomer.js`.


var inquirer = require("inquirer");
var mysql = require("mysql");

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
  //customerOrder(); run app if connection successful
});

//################################begin order handler constructor

var orderHandler = function(productID, productAmount) {
  this.productID = productID;
  this.productAmount = productAmount;
  this.inStock = function(){

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
        console.log("item is not available please try a different product")
      } else {

        //console.log(response);
        console.log(response[0].stock_quantity);

      }
      
    });
  };
  this.listAvailable = function(){

    connection.query(
      'SELECT * FROM products',

    function(error, response){
      if(error){
        throw error;
      }

      //response = JSON.stringify(response, null, 2)

      console.log("Items for sale: ")

      let iterable = response;

      for (let value of iterable){
        console.log(
          `${value.item_id} - ${value.product_name} -$${value.price}`
        );
      }

      //console.log(response);
      
    });

  };
}

var myTestOrder = new orderHandler(7);

//myTestOrder.listAvailable();

//myTestOrder.inStock();

//################################end order handler constructor

// 6. The app should then prompt users with two messages.

function customerOrder(){

  myTestOrder.listAvailable()

//Running this application will first display all of the items available for sale. Include the ids, names,
//and prices of products for sale.
  //SELECT * FROM products;
  
    inquirer.prompt([// consider throwing an autocomplete in here https://github.com/mokkabonna/inquirer-autocomplete-prompt

      //also there is a validate feature i could use here in the docs, returns promise
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

//    * The first should ask them the ID of the product they would like to buy.

      
        {
          type: "input",
          name: "productID",
          message: "Enter a Number for order: "
          //choices: [1,2,3,4]
        },

//    * The second message should ask how many units of the product they would like to buy.

        {
          type: "input",
          name: "productAMT",
          message: "How many do you want to purchase?",
        }
    
      
      ]).then(function(command) {

        //var inStock = verifyInStock Function(command.productID, command.productAMT)
        //promise and asysc
  
        switch (inStock) {
          case true:
            //function to place order
            break;
  
          case false:
            console.log("Insufficient quantity!")
            break;
  
        }
  
      });
  
  }

customerOrder();


// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet
// the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.




    //need order constructor to pass orders to - validates this crap before it runs sql
    //SELECT query validate amout is greater than requested

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
    //UPDATE query here
//    * Once the update goes through, show the customer the total cost of their purchase.
    //function here probably
