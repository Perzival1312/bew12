const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
const validator = require('express-validator')
const https = require('https');
const http = require('http');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// database connection goes here
require('./database/mongooseConnection');

require('dotenv').config();

// Template Engine //
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
// override with POST having ?_method=DELETE & ?_method=PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(cookieParser());

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, {complete: true}) || {};
    req.user = decodedToken.payload;
  }
  next();
};
app.use(checkAuth);

// Call in the ROUTES
const postController = require('./controllers/posts');
app.use(postController);
const commentController = require('./controllers/comments');
app.use(commentController);
const authController = require('./controllers/auth');
app.use(authController);
const replyController = require('./controllers/replies');
app.use(replyController);



app.listen(port, () => {
  console.log(`Port is listening on ${port}`)
});
// for testing
module.exports = {app};
