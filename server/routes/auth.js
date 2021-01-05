const dotenv = require("dotenv"),
  express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  nodemailer = require("nodemailer"),
  sendgridTransport = require("nodemailer-sendgrid-transport"),
  mongoose = require("mongoose"),
  crypto = require('crypto'),
  jwt = require('jsonwebtoken'),
  requireLogin = require("../middleware/requireLogin");
//const bodyParser= require("body-parser");

const User = require("../models/user");
//const { route } = require("./users");
//router.use(bodyParser.json());

dotenv.config();
// router.get("/protected", requireLogin , (req,res)=>{
// res.send("hello user");
// })

// router.route("/").get((req, res) => {
//   res.send("hello");
// });

//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

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:process.env.API_KEY
}
}))

router.post("/signup", (req, res, next) => {
  const { username, email, password ,image} = req.body;

  if (!username || !email || !password) {
    res.status(422).json({ error: "please fill all the details" });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user != null) {
        res.status(422).json({ error: "User already exists with this mail" });
      } else {
        bcrypt.hash(password,12).then((hashedPassword) => {
          const user = new User({
            username: username,
            password: hashedPassword,
            email: email,
            image : image
            
          });
          user.save().then(
            (user) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ message: "Registeration Successful", user: user });

              transporter.sendMail({
                to:user.email,
                from:"sendmail676@gmail.com",
                subject:"signed up successfully",
                html : "<h1>Welcome to Talk Amigo</h1>"
              })
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
       const {_id ,username, email , followers , following, image}= user;
       res.json({token , user : {_id, username ,email, followers, following, image}});
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


router.post("/reset-password", (req,res)=>{
crypto.randomBytes(32, (err,buffer)=> {
  if(err){
    console.log(err)
  }
  const token = buffer.toString("hex");
  User.findOne({email : req.body.email})
  .then(user => {
    if(!user){
     return res.status(422).json({error : "user doesn't exist with this mail id"})
    }

    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;

    user.save().then((result)=>{
      transporter.sendMail({
        to:user.email,
        from:"sendmail676@gmail.com",
        subject:"password reset",
        html:`<p>You requested for password reset </p>
           <h5>Click on this <a href="${process.env.EMAIL}/reset/${token}">link </a>to reset password </h5>`
      })

      res.json({message:"check your email"})
    })
  })
})
})

router.post("/new-password", (req,res)=>{
  const newPassword = req.body.password;
  const sentToken = req.body.token;

  User.findOne({resetToken : sentToken , expireToken : {$gt : Date.now()}} )
  .then(user => 
    {
      if(!user){
        return res.status(422).json({error : "Try again session expired!"})
      }

      bcrypt.hash(newPassword, 12 ).then((hashedPassword) => {
        user.password= hashedPassword;
        user.resetToken = undefined;
        user.expireToken=undefined;

        user.save((user)=>{
          res.json({message : "Password updated successfully"})
        })
      })
    })

    .catch(err => {
      console.log(err);
    })
})
module.exports = router;
