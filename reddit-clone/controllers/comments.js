const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

router.post('/post/:postId/comments', (req, res) => {
  const comment = new Comment(req.body);
  comment.author = req.user._id;
  comment.save().then((comment) => {
    return Promise.all([Post.findById(req.params.postId)]);
    }).then(([post, user]) => {
      post.comments.unshift(comment);
      return Promise.all([post.save()]);
    }).then(post => {
      res.redirect(`/post/${req.params.postId}`);
    }).catch((err) => res.send(err));
});

module.exports = router