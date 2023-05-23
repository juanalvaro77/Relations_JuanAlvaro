const {Router} = require("express");
const {createTask, changeStatusOfTask, deleteTask, getTasksByUser, getAllTasks, getTaskById} = require("../controllers/todos.controllers");
const authenticate = require("../middlewares/authetication.middleware");

const router = Router();

//router.post("/todos", authenticate, createTask);
router.post("/todos", createTask);
router.put("/todos/:id", changeStatusOfTask);
router.delete("/todos/:id", deleteTask);
router.get("/todos", getAllTasks);
router.get("/todos/userId/:userId", getTasksByUser);
router.get("/todos/id/:id", getTaskById);

module.exports = router;