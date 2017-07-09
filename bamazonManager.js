var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    loadMenu();
});

function loadMenu() {
    inquirer.prompt({
            name: "option",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function(answer) {
            switch (answer.option) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    newProduct();
                    break;
            }
        });
}

function viewProducts() {
    var query = "SELECT * FROM bamazon.products";
    connection.query(query, function(err, res) {
        console.log("\nHere are the available products" + "\n-----------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Item ID: " + res[i].item_id +
                " || Product: " + res[i].product_name +
                " || Department: " + res[i].department_name + 
                " || Price: $" + res[i].price +
                " || Stock: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------------");
        loadMenu();
    });
}

function lowInventory() {
    var query = "SELECT * FROM bamazon.products";
    connection.query(query, function(err, res) {
        console.log("\nHere are the products where the inventory is less than 5" + "\n-----------------------------------------");
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log(
                    "Item ID: " + res[i].item_id +
                    " || Product: " + res[i].product_name +
                    " || Price: $" + res[i].price +
                    " || Stock: " + res[i].stock_quantity);
            }
        }
        console.log("-----------------------------------------");
        loadMenu();
    });

}

function addInventory() {
    connection.query("SELECT * FROM bamazon.products", function(err, res) {
            inquirer.prompt([{
                name: "product",
                type: "input",
                message: "What product would you like to add inventory to?"
            }, {
                name: "newStock",
                type: "input",
                message: "How many new items to add to that product's stock?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }]).then(function(answer) {
                    var chosenItem;
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].product_name === answer.product) {
                            chosenItem = res[i];
                        }
                    }
                    var updatedStock = chosenItem.stock_quantity + parseInt(answer.newStock);
                    connection.query(
                        "UPDATE bamazon.products SET ? WHERE ?", [{
                            stock_quantity: updatedStock
                        }, {
                            product_name: chosenItem.product_name
                        }],
                        function(error) {
                            if (error) throw err;
                            console.log("\nThe product " + chosenItem.product_name + " now has " + updatedStock + " available for purchase.\n");
                            loadMenu();
                        });
                    });
            });
    }

    function newProduct() {
    	  inquirer.prompt([
      {
        name: "productName",
        type: "input",
        message: "What is the name of the product you would like to submit?"
      },
      {
        name: "department",
        type: "input",
        message: "What department would you like to place this product in?"
      },
      {
        name: "price",
        type: "input",
        message: "How much does this product cost?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
      	name: "stock",
        type: "input",
        message: "How many units of this product do we have available?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ]).then(function(answer) {
      connection.query(
        "INSERT INTO bamazon.products SET ?",
        {
          product_name: answer.productName,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.stock
        },
        function(err) {
          if (err) throw err;
          console.log("\nYour new product was created successfully!");
          viewProducts();
        }
      );
    });
    }
