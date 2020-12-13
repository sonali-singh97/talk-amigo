import dotenv from 'dotenv';

import mongoose from "mongoose";
dotenv.config();

//GyDJyZva4U17GJSh
//mongodb+srv://Sonali:<password>@cluster0.xvevf.mongodb.net/<dbname>?retryWrites=true&w=majority

const url= process.env.MONGOURL;
mongoose.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology: true

})

mongoose.connection.on('connected',()=>{
  console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
  console.log("err connecting",err)
})