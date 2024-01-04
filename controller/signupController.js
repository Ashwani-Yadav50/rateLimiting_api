const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const passwordValidator = require('password-validator');

var schema = new passwordValidator();
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have uppercase letters
    .has().lowercase(1)                             // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digit
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Password@123', 'Password123', 'Admin@123', 'Admin123', 'User@123']);

const createUser = async (req, res) => {
    try {
        const data = new userModel(req.body);

        // Validate required fields in the Mongoose schema
        await data.validate();

        if (schema.validate(req.body.password)) {
            const salt = await bcrypt.genSalt(10);
         const hash = await bcrypt.hash(data.password, salt);
          data.password = hash;
            await data.save();
            res.send({ result: "Done", message: "User is Created!!!!!", data:data });
        } else {
            res.status(401).send({ result: "Fail", message: "Password Must Containe Atleast 8 Character, Max 100, Must container atleast 1 Lower Case Alphabet,1 Upper Case Alphabet,1 Digit and it can't Contain any Space" })
        }
    } catch (error) {
        console.log("----------- ", error);
        if (error.code === 11000) {
            // Duplicate key error (unique constraint violation)
            res.status(401).send({ result: "Fail", message: "Email already exists" });
        } else if (error.name === 'ValidationError') {
            // Handle validation errors (e.g., required fields missing)
            res.status(401).json({ status: "fail", message: "Validation error", error: error.message });
        } else {
            res.status(500).send({ result: "Fail", message: "Internal Server Error" });
        }
    }
};

module.exports = createUser;





    // try{
    //     const data =new  userModel(req.body);

    //     console.log("---- ",data);

    //     await data.save();

    //     res.status(201).json({
    //         status: "success",
    //         message: "User created successfully",
    //         data: data,
    //       });

    // }catch(error){
    //     res.status(500).json({
    //         status:"fail",
    //         message:"Internal server error",
    //         error:error.message
    //     })
    // }
// }

// module.exports=userSignup;