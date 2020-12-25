const  express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  requireLogin = require("../middleware/requireLogin"),
  Post = require("../models/post");

  router.get("/allpost", (req,res)=>{
  Post.find()
  .populate("postedBy","_id username")
  .then(posts =>
    {res.json({posts})})

    .catch(err => {
        console.log(err);
    })
  })

  router.get("/myposts",requireLogin, (req,res) => {
    Post.find({postedBy: req.user._id})
      .populate("postedBy", "_id username")
      .then(results => res.json({myPosts : results}))

      .catch(err => console.log(err));
  })

  router.post("/createpost" , requireLogin, (req,res)=> {
      const{title, body} = req.body;
      if(!title || !body){
          return res.status(422).json({error:"please add all the details"})
      }
      req.user.password = undefined;
      const post = new Post({
      title,
      body,
      postedBy : req.user
      })

      post.save().then(result => {
          res.json({post :result })
      })
      .catch(err => {
          console.log(err)
      })
  })


  module.exports = router;