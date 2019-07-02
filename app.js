var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var authRouter = require ('./routes/auth')

var app = express();
var jwt = require('jsonwebtoken');

function ensureToken(req, res, next) {
  var bearerHeader = req.headers['authorization']
  if (typeof bearerHeader=='undefined'){
    console.log('Cant find a token');
    res.status(403).send({
      'message':'token not provided'
    })
  } else {
    var bearerToken = bearerHeader.split(' ')
    console.log(bearerToken)
    var tokenBracket = bearerToken[0]
    var tokenProvided = bearerToken[1]

    if(tokenBracket !== 'JWT'){
      res.status(403).send({
        'message':'wrong format header Authorization'
      })
    }

    jwt.verify(tokenProvided, 'testtest', function(err, decoded) {
      if(err){
        console.log('not allowed');
        res.status(403).send({
          'message':'token is not valid'
        })
      }
    });
    next()
  }
}

// app.post('/login', async function(req, res){
	
//   var token = await jwt.sign({ foo: 'bar' }, 'privateKey');
//   res.send({
//     'token':token
//   })
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users',ensureToken, usersRouter);
app.use('/posts',ensureToken, postsRouter);
app.use('/auth', authRouter);


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