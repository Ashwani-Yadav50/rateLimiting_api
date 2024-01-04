const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase= require("./config/db");
const routes = require("./routes/route");
connectDatabase()


app.use(express.json());
app.use(cors());



app.use("/api/",routes)


app.get("/", (req,res)=>{
    res.send("Hello")
})




app.listen(3000, ()=>{
    console.log(`Server is running on port 3000`);
})