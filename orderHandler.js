var connection= require("./bamazonCustomer");
var mysql = require("mysql");

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
          stockAMT = response[0].stock_quantity;
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

module.exports = orderHandler;