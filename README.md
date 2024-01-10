# Beck-ECOM-Store

# Description 
This project is a back-end application for an e-commerce website. It provides the necessary server and database functionality to power a digital retail company's website. 

To use this application, follow these steps:

Clone this repository and install the required dependencies by running:
- npm install 
Configure your database connection by adding your database name, MySQL username, and MySQL password to an environment variable file (e.g., .env).

Create the database and seed it with test data by running the following commands:
-mysql -u username -p

SOURCE db/schema.sql

exit

npm run seed

node server.js

# Acceptance Criteria

A functional Express.js API is provided.
Database name, MySQL username, and MySQL password can be configured via environment variables to connect to a database using Sequelize.
Running schema and seed commands creates a development database seeded with test data.
The application starts the server, and Sequelize models are synchronized with the MySQL database.
API GET routes for categories, products, and tags return data in formatted JSON.
API POST, PUT, and DELETE routes for categories, products, and tags allow for successful data manipulation in the database.

# Screenshots

![POST](<SS 13 .png>)
![POST 2](<SS 13 Post.png>)
![Put](<SS 13 3.png>)
![GET](<SS 13 Get.png>)

Link to video - https://drive.google.com/file/d/1Wtr8nOqaCtf9yxe7x31FBTl6UEMaOONH/view
