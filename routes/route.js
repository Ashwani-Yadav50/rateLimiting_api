const express = require("express");
const signupController = require("../controller/signupController");
const login = require("../controller/loginController");
const getUser = require("../controller/getController");
const verifyToken = require("../middleware/auth");

const router= express.Router();


router.post("/auth/signup", signupController);
router.post("/auth/login",login);
router.get("/auth/getUser",verifyToken, getUser)


module.exports=router;