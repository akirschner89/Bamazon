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
    initializeData();
});

var chosenItem;

function initializeData() {
    var query = "SELECT * FROM bamazon.products";
    connection.query(query, function(err, res) {
        console.log("\nHere are the available items" + "\n-----------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Item ID: " + res[i].item_id +
                " || Product: " + res[i].product_name +
                " || Department: " + res[i].department_name +
                " || Price: $" + res[i].price +
                " || Stock: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------------");
        buySomething();
    });
}

function buySomething() {
    inquirer.prompt([{
        name: "makePurchase",
        type: "input",
        message: "Would you like to buy something? Answer Yes or No"
    }]).then(function(answer) {
        if (answer.makePurchase === "Yes") {
            purchaseQuestion();
        } else {
            console.log("\nCome again when you're ready to buy something.");
        }
    });
}

function purchaseQuestion() {
    connection.query("SELECT * FROM bamazon.products", function(err, res) {
        inquirer.prompt([{
                name: "itemID",
                type: "input",
                message: "What is the item's ID that you would like to purchase?"
            }, {
                name: "numUnits",
                type: "input",
                message: "How many units would you like to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }])
            .then(function(answer) {
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (parseInt(res[i].item_id) === parseInt(answer.itemID)) {
                        chosenItem = res[i];
                    }
                }

                var newStock = chosenItem.stock_quantity - parseInt(answer.numUnits);
                var totalPrice = parseFloat(parseInt(answer.numUnits) * chosenItem.price);

                if (chosenItem.stock_quantity >= parseInt(answer.numUnits)) {
                    connection.query(
                        "UPDATE bamazon.products SET ? WHERE ?", [{
                            stock_quantity: newStock
                        }, {
                            item_id: chosenItem.item_id
                        }],
                        function(error) {
                            if (error) throw err;
                            console.log("\nYou've successfully purchased " + answer.numUnits + " of " + chosenItem.product_name + ".\nThe total cost is: $" + totalPrice + ".");
                            initializeData();
                        }
                    );
                } else {
                    console.log("\nSorry, we don't have that many in stock. Try again.");
                    initializeData();
                }

            });
    });
}
