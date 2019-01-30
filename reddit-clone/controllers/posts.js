const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
// get the models required in here...

// INDEX
router.get('/', (req, res) => {
  Post.find({}).then((posts) => {
    res.render('post-index', {posts});
  }).catch((err) => res.send(err.message))
});

router.get('/post/new', (req, res) => {
  res.render('new-post')
});

router.post('/post', (req, res) => {
  Post.create(req.body).then(() => {
    res.redirect('/');
  }).catch((err) => res.send(err.message));
});

router.get('/post/:id', (req, res) => {
  Post.findById(req.params.id).then((posts) => {
    Comment.find({postId: req.params.id}).then((comments) => {
      res.render('post-show', {posts : posts, comments : comments});
    })
  }).catch((err) => res.send(err.message));
});

module.exports = router
