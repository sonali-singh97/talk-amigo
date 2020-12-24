var dotenv = require('dotenv');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var mongoose = require('mongoose');
dotenv.config();

//var indexRouter = require('./routes/index');
var authRouter = require("./routes/auth");
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testRoute");
var app = express();

const Users = require("./models/user");



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



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);




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

module.exports = app;
