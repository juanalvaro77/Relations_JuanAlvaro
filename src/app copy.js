const express = require("express");
require("dotenv").config();
const db = require("./utils/database");
const Todos = require("./models/todos.model");
const Users = require("./models/users.model");
const initModels = require("./models/initModels");
const Categories = require("./models/categories.model");
const Completeds = require("./models/completeds.model");
const userRoutes = require("./routes/users.router");
const cors = require("cors");
initModels();

const app = express();
const PORT = process.env.PORT || 8000;

db.authenticate()
    .then(()=>console.log("BD conectada"))
    .catch((err)=>console.log("Fallo al conectar BD"));

//db.sync({force: true})
db.sync()
    .then(()=>{
        console.log("Base de datos sincronizada");
    })
    .catch((error)=>console.log(error));
app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Servidor conectado");
});

app.use(userRoutes);

/*Obtener todas las tareas*/
app.get("/todos", async (req, res, next)=>{
    try{
        const todos = await Todos.findAll({
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
    } catch(error){
        res.status(400).json(error);
    }

})
////////////////////////////////////////////////////////

/*Obtener una tarea por id de la tarea con el nombre de estado, el usuario que la creó y
la categoria a la que pertenece.*/
app.get("/todos/id/:id", async (req,res, next)=>{
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
    next();
})
/////////////////////////////////////////////////////////////////////////////
/*
2. Un endpoint para que un usuario pueda crear tareas 
    (Cuando un usuario crea una tarea debe seleccionarse la categoria a la que esta pertenece)
    categoryId*/
    app.post("/todos", async (req, res, next)=>{
        try{
            const newTask = req.body;
            await Todos.create(newTask);
            res.status(201).send();
                
        } catch(error){
            res.status(400).json(error);
        }
    
    })
/////////////////////////////////////////////////////////////////////////////
/*3. Un endpoint para obtener todas las tareas de un usuario incluidas sus categorias 
    (filtros (where), include)*/

    app.get("/todos/userId/:userId", async (req, res, next)=>{
        try{
            const {userId} = req.params;
            const todos = await Todos.findAll({
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
    
            },{where: {userId}});
            res.json(todos);
        } catch(error){
            res.status(400).json(error);
        }
    
    })

/////////////////////////////////////////////////////////////////////////////
/*4. Un endpoint para que un usuario pueda cambiar el atributo completed de una tarea 
    (false a true o viceversa ) por defecto una tarea se crea con el atributo completed false*/

    app.put("/todos/:id", async (req, res, next)=>{
        try{
            const {id} = req.params;
            const {completedId} = req.body
            await Todos.update(
                {     
                    "completedId": completedId
                }, 
                {
                    where: {id: id}
                });
            res.status(204).send();
            
        } catch(error){
            res.status(400).json(error);
        }
    
    })

    /////////////////////////////////////////////////////////////////////////////
//5. Un endpoint que permita eliminar tareas
app.delete("/todos/:id", async (req, res, next)=>{
    try{
        const {id} = req.params;
        const task = await Todos.destroy({where:{id: id,}});
        res.send(204).send();
        //console.log(todos);    
    } catch(error){
        res.status(400).json(error);
    }

})

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando puerto ${PORT}`);
});


//id: {    type: DataTypes.INTEGER,    autoIncrement: true,    primaryKey: true,},