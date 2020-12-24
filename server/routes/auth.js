const dotenv = require("dotenv"),
  express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  mongoose = require("mongoose"),
  jwt = require('jsonwebtoken');

//const bodyParser= require("body-parser");

const User = require("../models/user");
const { route } = require("./users");
//router.use(bodyParser.json());

router.route("/").get((req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(422).json({ error: "please fill all the details" });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user != null) {
        var err = new Error("User already exists with this mail");
        err.status = 403;
        next(err);
      } else {
        bcrypt.hash(password, process.env.SALT).then((hashedPassword) => {
          const user = new User({
            username: username,
            password: hashedPassword,
            email: email,
          });
          user.save().then(
            (user) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ status: "Registeration Successful", user: user });
            },
            (err) => next(err)
          );
        })
        .catch(err => next(err));


      }
    })

    .catch((err) => next(err));
});

router.post("/signin" , (req,res,next)=>{
const {email, password} = req.body;

if(!email || !password){
    res.status(422).json({ error: "please add email or password!" });
}

User.findOne({email: email})
.then ((user) =>
 {   if(!user){
    res.status(422).json({ error: "Invalid email or password" });
 }
     bcrypt. compare(password, user.password)
 .then(doMatch => {
     if(doMatch){
       // res.json({ "status" : "user signed in successfully " , user: user});
       const token = jwt.sign({_id :user._id }, process.env.JWT_SECRET);
       res.json({token});
     }
   
     else{
        res.status(422).json({ error: "Invalid email or password" });
     }
 })
 .catch (err => next(err));
}
)
.catch(err => next(err));

})

module.exports = router;
