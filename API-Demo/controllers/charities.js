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
  res.send(world)
});

router.get('/pokemon/remove', (req, res) => {
  world["trainer"]["pokemon"].remove("Bulbasaur")
})



module.exports = router




