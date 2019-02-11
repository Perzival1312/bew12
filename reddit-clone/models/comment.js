const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  title:    {type: String, required: true},
  comment:  {type: String, required: true},
  postId:   {type: Schema.Types.ObjectId, ref: 'post', required: true }
});

let comment = mongoose.model('comment', commentSchema)

module.exports = comment;
