const mongoose = require('mongoose');
const Populate = require('../utils/autopopulate');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content:  {type: String, required: true},
  author:   { type: Schema.Types.ObjectId, ref: "user", required: true },
  comments: [{type: Schema.Types.ObjectId, ref: "comment"}]
});

commentSchema.pre('findOne', Populate('comments'))
commentSchema.pre('find', Populate('comments'))
commentSchema.pre('findOne', Populate('author'))
commentSchema.pre('find', Populate('author'))

module.exports = mongoose.model('comment', commentSchema);