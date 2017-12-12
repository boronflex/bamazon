// 5. Then create a Node application called `bamazonCustomer.js`.

var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //customerOrder(); run app if connection successful
});


// 6. The app should then prompt users with two messages.

function customerOrder(){

//Running this application will first display all of the items available for sale. Include the ids, names, 
//and prices of products for sale.
  
    inquirer.prompt([

//    * The first should ask them the ID of the product they would like to buy.

      
        {
          type: "confirm",
          name: "userInput",
          message: "Do you want play again?",
        },

//    * The second message should ask how many units of the product they would like to buy.

        {

        }
    
      
      ]).then(function(command) {
  
        switch (command.userInput) {
          case true:
            setUp()
            runGame();
            break;
  
          case false:
            console.log("ok- maybe later")
            break;
  
        }
  
      });
  
  }

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet
// the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.