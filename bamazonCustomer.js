var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  initializeData();
});

function initializeData() {
	var query = "SELECT * FROM bamazon.products";
      connection.query(query, function(err, res) {
      	console.log ("\nHere are the available items" + "\n-----------------------------------------");
        for (var i = 0; i < res.length; i++) {
          console.log(
          	"Item ID: " + res[i].item_id + 
          	" || Product: " + res[i].product_name + 
          	" || Department: " + res[i].department_name + 
          	" || Price: $" + res[i].price + 
          	" || Stock: " + res[i].stock_quantity);
        }
      });
}