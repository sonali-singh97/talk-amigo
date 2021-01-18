var dotenv = require('dotenv');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
//var cors = require("cors");

var mongoose = require('mongoose');
dotenv.config();


const PORT = process.env.PORT || 5000


var authRouter = require("./routes/auth");
var userRouter = require('./routes/user');
var postsRouter = require('./routes/post');
var app = express();




const url= process.env.MONGOURL;
mongoose.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology: true

})

mongoose.connection.on('connected',()=>{
  console.log("conneted to mongo yeahh!!")
})
mongoose.connection.on('error',(err)=>{
  console.log("err connecting",err)
})



//app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use( authRouter);
app.use(postsRouter);
app.use( userRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});





// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


if(process.env.NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname, "client", "build")))

  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(PORT,()=>{
  console.log("server is running on",PORT)
})

module.exports = app;
