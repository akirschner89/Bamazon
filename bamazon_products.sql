DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(50) auto_increment PRIMARY KEY NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER (100) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Gretsch Drum Set", "Drums", 899.99, 17);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Gibson SG", "Guitars", 1899.99, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Hammond B3", "Keyboards", 10899.99, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Fender Guitar Picks (set of 10)", "Guitars", 9.99, 598);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("DW Drum Set", "Drums", 6899.99, 18);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Fender PBass", "Guitars", 1299.99, 67);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Gold Tone Banjo", "Folk Instruments", 849.49, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Fender Stratocaster", "Guitars", 579.99, 98);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Vic Firth Drum Sticks", "Drums", 129.99, 102);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Gibson 1959 Les Paul", "Guitars", 5589.99, 4);

