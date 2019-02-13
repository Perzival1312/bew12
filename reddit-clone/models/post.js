const mongoose = require('mongoose');
const Populate = require("../utils/autopopulate");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  createdAt:  { type: Date },
  updatedAt:  { type: Date },
  title:      { type: String, required: true },
  url:        { type: String, required: true },
  summary:    { type: String, required: true },
  subreddit:  { type: String, required: true },
  comments:   [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  author:     { type: Schema.Types.ObjectId, ref: "user", required: true },
  upVotes:    [{ type: Schema.Types.ObjectId, ref: "user"}],
  downVotes:  [{ type: Schema.Types.ObjectId, ref: "user"}],
  voteScore:  {type: Number}
});

postSchema.pre("save", function(next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});
postSchema.pre('findOne', Populate('author'))
postSchema.pre('find', Populate('author'))

module.exports = mongoose.model("Post", postSchema);