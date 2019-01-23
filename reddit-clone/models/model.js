const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thingSchema = new Schema({
  name: {type: String, required:true},
})
let thing = mongoose.model('thing', thingSchema)

module.exports = thing;
