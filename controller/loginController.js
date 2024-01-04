const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const data = await userModel.findOne({ email: req.body.email });

        if (data) {
            // Check if the provided password matches the hashed password in the database
            if (await bcrypt.compare(req.body.password, data.password)) {
                // Generate a JWT token with the user's ID
                const token = jwt.sign({ userId: data._id }, 'your-secret-key', { expiresIn: '1h' });
                res.status(200).send({ result: "Login successfully", access_token: token });
            } else {
                res.status(401).send({ result: "Fail", message: "Invalid Username or Password" });
            }
        } else {
            res.status(401).send({ result: "Fail", message: "Invalid Username or Password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" });
    }
};

module.exports = login;
