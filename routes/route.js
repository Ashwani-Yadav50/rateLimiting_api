const express = require("express");
const signupController = require("../controller/signupController");
const login = require("../controller/loginController");

const router= express.Router();


router.post("/auth/signup",signupController);
router.post("/auth/login",login);


module.exports=router;