const userModal = require("../model/userModel");


const getUser= async(req,res)=>{
    try{
        const user= await userModal.find(req.body.email);

        console.log("user --- ",user);
        res.status(200).send({
            status:"success",
            data:user
        })

    }catch(error) {
        res.status(500).json({
            status:"Fail",
            message:"Internal server error",
            error:error.message
        })
    }
}

module.exports= getUser