const {Router} = require("express");
const {createUser, getAllUsers, deleteUser, userLogin} = require("../controllers/users.controllers");

const router = Router();

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.post("/users/login", userLogin);

module.exports = router;