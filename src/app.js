const express = require("express");
require("dotenv").config();
const db = require("./utils/database");
const initModels = require("./models/initModels");
initModels();



const app = express();
const PORT = process.env.PORT || 8000;

db.sync()
    .then(()=>{
        console.log("Base de datos sincronizada");
    })
    .catch((error)=>console.log(error));

app.get("/", (req,res)=>{
    res.send("Servidor conectado");
});
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando puerto ${PORT}`);
});

//{force: true}
//id: {    type: DataTypes.INTEGER,    autoIncrement: true,    primaryKey: true,},