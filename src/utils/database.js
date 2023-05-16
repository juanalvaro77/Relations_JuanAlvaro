const {Sequelize} = require("sequelize");
require("dotenv").config();

const db = new Sequelize({
    host: "localhost",
    por: 5432,
    database: "relations",
    username: "postgres",
    password: "root",
    dialect: "postgres"   
});

module.exports = db;
