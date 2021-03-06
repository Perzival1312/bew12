const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
const https = require('https');
const http = require('http');

// database connection goes here
// require('./database/mongooseConnection');


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


// const charities = require('./controllers/charities');
// // Call in the ROUTES
// app.use(charities);

var world = {
  "trainer" : {
    "stats" : ["height", "age", "Name"],
    "pokemon" : ["Charmander", "Arceus", "Pickachu"] 
  }  
}

app.get('/', (req, res) => {
  res.send(world)
});

app.put('/pokemon/new', (req, res) => {
  world["trainer"]["pokemon"].push("Bulbasaur")
  res.send("added bulbasaur")
  res.redirect('/')
});


app.delete('/pokemon/remove', (req, res) => {
  delete world.trainer.pokemon[0];
  // world["trainer"]["pokemon"].remove(0)
  res.redirect('/')
});

app.post('/pokemon/modify', (req, res) => {
  world["trainer"]["pokemon"][0] = "Squirtle"
  res.send(world)
});


app.listen(port, () => {
  console.log(`Port is listening on ${port}`)
});
// for testing
module.exports = { app };
