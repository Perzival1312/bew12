const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
// get the models required in here...

// INDEX
router.get('/', (req, res) => {
  var currentUser = req.user;
  Post.find({}).then((posts) => {
    res.render('post-index', {posts, currentUser});
  }).catch((err) => res.send(err.message))
});

router.get('/post/new', (req, res) => {
  if ( req.user) {
    res.render('new-post')
  } else {
    res.send(401, {messsage: "Not Authorized"})
  }
});

router.post('/post/new', (req, res) => {
  if (req.user) {
    Post.create(req.body).then(() => {
      res.redirect('/');
    }).catch((err) => res.send(err.message));
  } else {
    res.send(401, {messsage: "Not Authorized"})
  }
});

router.get('/post/:id', (req, res) => {
  Post.findById(req.params.id).populate('comments').then((posts) => {
    res.render('post-show', {posts})
  }).catch((err) => res.send(err.message));
});


router.get("/n/:subreddit", (req, res) => {
  Post.find({subreddit: req.params.subreddit}).then((posts) => {
      res.render("post-index", {posts});
    }).catch((err) => res.send(err));
});

module.exports = router