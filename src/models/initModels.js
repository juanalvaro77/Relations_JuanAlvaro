const Categories = require("./categories.model"); 
const Completeds = require("./completeds.model");
const Todos = require("./todos.model");
const Users = require("./users.model");

const initModels = () => {
/*  - Un usuario puede tener muchas tareas M
    - una tarea tiene muchos usuarios 1*/
    Users.hasMany(Todos, {foreignKey: "userId"});
    Todos.belongsTo(Users, {foreignKey: "userId"});

/*  - Una categoria puede pertenecer a muchas tareas. M
    - Una tarea tiene muchas categorias. 1*/
    Categories.hasMany(Todos, {foreignKey: "categoryId"});
    Todos.belongsTo(Categories, {foreignKey: "categoryId"});

/*  - Una tarea puede tener muchos estadops. 1
    - Un estado puede tener muchas tareas. M */
    Completeds.hasMany(Todos, {foreignKey: "completedId"});
    Todos.belongsTo(Completeds, {foreignKey: "completedId"});
    


}
module.exports = initModels;