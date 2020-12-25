const dotenv = require("dotenv"),
      jwt = require("jsonwebtoken")
      mongoose = require('mongoose'),
      User = require("../models/user");

      dotenv.config();
module.exports = (req,res,next) => {
    const {authorization} = req.headers;

    if(!authorization){
      console.log(req.headers);
        return res.status(401).json({error: "you must be logged in"})
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token , process.env.JWT_SECRET, (err, payload)=>{
        if(err)
        {   console.log(err)
            return   res.status(401).json({error:"you must be log in"})
        }
        const{_id} = payload;

        User.findById(_id).then(userdata => {
            req.user = userdata
            next()
        })
        
    })

}