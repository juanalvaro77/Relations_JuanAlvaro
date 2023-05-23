const {Sequelize} = require("sequelize");
require("dotenv").config();

/*const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false }}
});*/

const db = new Sequelize({
    host: "localhost",
    database: "relations",
    port: 5432,
    username: "postgres",
    password: "root",
    dialect: "postgres",
    //dialectOptions: { ssl: { require: true, rejectUnauthorized: false }}
});




module.exports = db;
