--  1. Create a MySQL Database called `bamazon`.

DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

--  2. Then create a Table inside of that database called `products`.

CREATE TABLE products(

--  3. The products table should have each of the following columns:

--     * item_id (unique id for each product)

  item_id INT NOT NULL AUTO_INCREMENT,

--     * product_name (Name of product)

  product_name VARCHAR(100) NOT NULL,

--     * department_name

  department_name VARCHAR(30) NOT NULL,

--     * price (cost to customer)

  price DECIMAL(10,2) NOT NULL,

--     * stock_quantity (how much of the product is available in stores)

  stock_quantity INT NULL,

  PRIMARY KEY(item_id)

);
