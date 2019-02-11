const express = require('express');
const router = express.Router();
const Code = require('../models/charity');
// get the models required in here...

var world = {
  "trainer" : {
    "stats" : ["height", "age", "Name"],
    "pokemon" : ["Charmander", "Arceus", "Pickachu"] 
  }  
}

// INDEX
router.get('/', (req, res) => {
  res.send(world)
});

router.get('/pokemon/new', (req, res) => {
  world["trainer"]["pokemon"].push("Bulbasaur")
  res.redirect('/')
});


router.get('/pokemon/remove', (req, res) => {
  delete world.trainer.pokemon[0];
  // world["trainer"]["pokemon"].remove(0)
  res.redirect('/')
});

router.get('/pokemon/modify', (req, res) => {
  world["trainer"]["pokemon"][0] = "Squirtle"
  res.send(world)
});

module.exports = router




