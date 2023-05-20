const Users = require("../models/users.model");
const bcrypt = require("bcrypt");

/*1. un endpoint para crear usuarios*/

const createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(typeof(username) != "string" || !username) {
            return res.status(400).json({
                error: "invalid username",
                message: "username most be just a string"
            })
        }
        if(typeof(email) != "string" || !email) {
            return res.status(400).json({
                error: "invalid email",
                message: "email most be just a string"
            })
        }
        if(typeof(password) != "string" || !password) {
            return res.status(400).json({
                error: "invalid password",
                message: "password most be just a string"
            })
        }

        const hashed = await bcrypt.hash(password,10);

        await Users.create({username, email, password: hashed});
        res.status(201).send();
      
        
    } catch (error) {
        res.status(400).json(error);
    }
}

//Ver todos los usuarios
const getAllUsers = async (req, res, next)=>{
    try{
        const users = await Users.findAndCountAll();
        res.json(users);
    } catch(error){
        res.status(400).json(error);
    }

}

//Eliminar un usuario
const deleteUser = async (req, res, next)=>{
    try{
        const {id} = req.params;
        await Users.destroy({where:{id: id,}});
        res.send(204).send();
        
    } catch(error){
        res.sendStatus(400);
    }

}




module.exports = {
    createUser,
    getAllUsers,
    deleteUser
}
