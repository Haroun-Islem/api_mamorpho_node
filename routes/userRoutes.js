const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/user", UserController.createUser);
// router.post("/user", verifyToken.verifyToken, UserController.createUser);

module.exports = router;
