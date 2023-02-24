var createError = require('http-errors'); //used to create HTTP error objects.
var express = require('express'); // import express
var path = require('path'); // built-in Node.js module that provides utilities for working with file and directory paths.
var cookieParser = require('cookie-parser'); // parse the HTTP request cookie header into a JavaScript object and populate req.cookies.
var logger = require('morgan'); // logging HTTP requests
// express does not allow delete by default so we use methodoverride

var indexRouter = require('./routes/index'); // handled by index js file in routes folder
var usersRouter = require('./routes/users');
var propertiesRouter = require('./routes/properties');
var reservationsRouter = require('./routes/reservations');
var app = express(); // create express application app
app.set('json spaces', 2)

// Cross-Origin Resource Sharing (CORS) is a security mechanism that restricts access to resources hosted on a different domain than the one being requested by a client. It works by adding HTTP headers that specify which origins are allowed to make cross-origin requests to a server.


app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']); // This header specifies which origins are allowed to make cross-origin requests to the server ['*'] means that any origin is allowed to make requests.
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST, DELETE, PATCH'); // header specifies the allowed HTTP methods for cross-origin requests
  res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token'); // header specifies the allowed headers for cross-origin requests
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // specify template engine

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // define endpoints. / -> root. Handled by indexrouter
app.use('/users', usersRouter);
app.use('/properties', propertiesRouter);
app.use('/reservations', reservationsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// This code is an error handling middleware function in an Express application. It is executed whenever an error occurs in any previous middleware or route handling function.
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
