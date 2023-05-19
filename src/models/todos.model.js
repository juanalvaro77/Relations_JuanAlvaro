const db = require("../utils/database");
const {DataTypes} = require("sequelize");

const Todos = db.define("todos", {
    title: {
        type: DataTypes.STRING(70),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        
    },
    completedId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        field: "completed_id"

    },
    userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        field: "category_id",
        allowNull: false
    }

}, {
    timestamps: true,
    updatedAt: false,
    createdAt: "created_at" 
    
});

module.exports = Todos;