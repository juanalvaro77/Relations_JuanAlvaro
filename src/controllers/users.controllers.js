const Users = require("../models/users.model");

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
        await Users.create({username, email, password});
        res.status(201).send();
      
        
    } catch (error) {
        res.status(400).json(error);
    }
}



module.exports = {
    createUser
}
