const express=require("express");
const { connection } = require("./db");
const router=require("./routes/parkingCarRoute")
require('dotenv').config();
const app=express()
app.use(express.json())

// app.use('/',(req,res)=>{
//     try{
//         res.status(200).json("Welcome to Car Parking")
//     }
//     catch(err)
//     {
//         res.status(401).json(err.message)
//     }
// })


app.use("/parking",router)

app.listen(6000,async()=>{
    try{
        await connection;
        console.log("Connected to Database")

        console.log(`server is running at ${process.env.PORT}`)

    }catch(err)
    {
        console.log(err.message)
    }
})