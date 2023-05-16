const db = require("../utils/database");
const {DataTypes} = require("sequelize");

const Completeds = db.define("completeds", {
    
    completed: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },

}, {
    timestamps: false
});

module.exports = Completeds;