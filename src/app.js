const express = require("express");
require("dotenv").config();
const db = require("./utils/database");
const Todos = require("./models/todos.model");
const Users = require("./models/users.model");
const initModels = require("./models/initModels");
const Categories = require("./models/categories.model");
const Completeds = require("./models/completeds.model");
initModels();

const app = express();
const PORT = process.env.PORT || 8000;

//db.sync({force: true})
db.sync()
    .then(()=>{
        console.log("Base de datos sincronizada");
    })
    .catch((error)=>console.log(error));



app.get("/", (req,res)=>{
    res.send("Servidor conectado");
});

/*Obtener una tarea con el nombre de estado, el usuario que la creó y
la categoria a la que pertenece.*/
app.get("/todos/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const todos = await Todos.findByPk(id, {
            attributes:{
                exclude: ["userId", "categoryId", "completedId"]
            },
            include: [{
                model: Users,
                attributes: ["id", "username"]
            }, {
                model: Categories,
                attributes: ["id", "name"]
            },{
                model: Completeds,
                    attributes: ["id", "completed"]
                
            }]

        });
        res.json(todos);

    } catch (error) {
        res.status(400).json(error);
    }
})
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando puerto ${PORT}`);
});


//id: {    type: DataTypes.INTEGER,    autoIncrement: true,    primaryKey: true,},