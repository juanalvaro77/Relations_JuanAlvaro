const Todos = require("../models/todos.model");
const Users = require("../models/users.model");
const Categories = require("../models/categories.model");
const Completeds = require("../models/completeds.model");

////////////////////////////////////////////////////////////////////////////////////
/*2. Un endpoint para crear tareas*/
const createTask = async (req, res, next)=>{
    try{
        const newTask = req.body;
        await Todos.create(newTask);
        res.status(201).send();
            
    } catch(error){
        res.status(400);
    }

}

////////////////////////////////////////////////////////////////////////////////////
/*3. Un endpoint para obtener todas las tareas de un usuario*/
const getTasksByUser = async (req, res)=>{
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
        }, {where: {userId: userId}});
        res.json(todos);
        
    } catch(error){
        res.status(400).json(error);
        
    }
}

////////////////////////////////////////////////////////////////////////////////////
/*4. Un endpoint para que un usuario pueda cambiar el estado de una tarea;*/
const changeStatusOfTask =  async (req, res, next)=>{
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
        res.status(400);
    }
    next();
}

////////////////////////////////////////////////////////////////////////////////////
/*5. Un endpoint que permita eliminar tareas*/
const deleteTask = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const task = await Todos.destroy({where:{id: id,}});
        res.send(204).send();
        //console.log(todos);    
    } catch(error){
        res.status(400);
    }

}

////////////////////////////////////////////////////////////////////////////////////
/*Obtener TODAS las tareas*/
const getAllTasks = async (req, res, next)=>{
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

}
////////////////////////////////////////////////////////////////////////////////////
/*Obtener una tarea por id.*/
const getTaskById = async (req,res, next)=>{
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
}

module.exports = {
    createTask,
    changeStatusOfTask,
    deleteTask,
    getTasksByUser,
    getAllTasks,
    getTaskById,
    
}
