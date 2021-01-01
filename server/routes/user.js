const  express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  requireLogin = require("../middleware/requireLogin"),
  Post = require("../models/post"),
  User = require("../models/user");

router.get("/:userId" , requireLogin , (req,res)=> {
    User.findOne({_id : req.params.userId})
    .select("-password")
    .then(user => {
        Post.find({postedBy: req.params.userId})
        .populate("postedBy" , "_id username")
        .exec((err,posts) => {
            if(err){
                return res.status(422).json({error : err})
            }
            return res.json({user, posts})
        })
    })
    .catch(err => 
        {
            return res.status(404).json({error : " user not found"})
        })
   

})

  module.exports = router;