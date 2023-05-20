const {Router} = require("express");
const {createUser, getAllUsers, deleteUser} = require("../controllers/users.controllers");

const router = Router();

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;