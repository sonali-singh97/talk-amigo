const  express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  requireLogin = require("../middleware/requireLogin"),
  Post = require("../models/post");

  router.get("/posts/allposts",requireLogin, (req,res)=>{
  Post.find()
  .populate("postedBy","_id username image")
  .populate("comments.postedBy", "_id username image")
  .sort("-createdAt")
  .then(posts =>
    {res.json({posts})})

    .catch(err => {
        console.log(err);
    })
  })

  router.get("/posts/getfollowingposts",requireLogin, (req,res)=>{
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id username image")
    .populate("comments.postedBy", "_id username image")
    .sort("-createdAt")
    .then(posts =>
      {res.json({posts})})
  
      .catch(err => {
          console.log(err);
      })
    })

  router.get("/posts/myposts",requireLogin, (req,res) => {
    Post.find({postedBy: req.user._id})
      .populate("postedBy", "_id username image")
      .populate("comments.postedBy", "_id username image")
      .then(results => res.json({myposts : results}))

      .catch(err => console.log(err));
  })

  router.post("/posts/createpost" , requireLogin, (req,res)=> {
      const{caption, photo} = req.body;
      if(!caption || !photo){
          return res.status(422).json({error:"please add all the details"})
      }
      req.user.password = undefined;
      const post = new Post({
     caption,
      photo,
      postedBy : req.user
      })

      post.save().then(result => {
          res.json({post :result, message :" post created successfully" })
      })
      .catch(err => {
          console.log(err)
      })
  })

   router.put("/posts/like" , requireLogin , (req,res)=> {
  Post.findByIdAndUpdate(req.body.postId , {$push : { likes : req.user._id   }},
    { new : true}) 
    .populate("postedBy", "_id username image")
    .exec((err , result) => {
        if(err){
            return res.status(422).json({error : err});
        }
        else 
        return res.json(result);
    })
})

router.put("/posts/unlike" , requireLogin , (req,res)=> {
    Post.findByIdAndUpdate(req.body.postId , {$pull : { likes : req.user._id   }},
      { new : true}) 
      .populate("postedBy", "_id username image")
      .exec((err , result) => {
          if(err){
              return res.status(422).json({error : err});
          }
          else {
             
          return res.json(result);}
      })
  })

  router.put("/posts/comment" , requireLogin , (req,res)=> {
      const comment = {
          text : req.body.text,
          postedBy : req.user._id
      }
    Post.findByIdAndUpdate(req.body.postId , {$push : { comments : comment  }},
      { new : true}) 
      .populate("comments.postedBy", "_id username image")
      .populate("postedBy", "_id username image")
      .exec((err , result) => {
          if(err){
              return res.status(422).json({error : err});
          }
          else 
          return res.json(result);
      })
  })
  

  router.delete("/posts/delete/:postId", requireLogin,(req,res)=>{
      Post.findOne({_id : req.params.postId} )
      .populate("postedBy", "_id")
      .exec((err,post)=> {
          if(err ){
              return res.status(422).json({error : err});
          }

          else if(!post){
              return res.status(402).json({message: "post doesn't exist"})
          }
          console.log(post.postedBy._id );
          console.log( req.user._id);

          if(post.postedBy._id.toString() === req.user._id.toString())
          post.remove()
          .then(result => res.json(result))
          .catch(err => console.log(err));
      })

  })

  router.put("/post/:postId/comment/:commentId" , requireLogin , (req,res)=> {
   Post.findByIdAndUpdate(req.params.postId , {$pull : {comments : {_id : req.params.commentId} }},
     {new : true} , (err,result)=> {
        if (err) {
            return res.status(422).json({ error: err });
          }
          return res.json(result);
     })

  })

  module.exports = router;