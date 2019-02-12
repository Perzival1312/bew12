const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
// get the models required in here...

// INDEX
router.get('/', (req, res) => {
  var currentUser = req.user;
  Post.find().populate('author').then((posts) => {
    res.render('post-index', { posts, currentUser });
  // Post.find({}).then((posts) => {
  //   res.render('post-index', {posts, currentUser});
  }).catch((err) => res.send(err.message))
});

router.get('/post/new', (req, res) => {
  if (req.user) {
    res.render('new-post')
  } else {
    res.send(401, {messsage: "Not Authorized"})
  }
});

router.post('/post/new', (req, res) => {
  if (req.user) {
    var post = new Post(req.body);
    post.author = req.user._id;
    post.save().then((post) => {
      return User.findById(req.user._id);
    }).then((user) => {
      user.posts.unshift(post);
      user.save();
      res.redirect(`/post/${post._id}`);
    }).catch((err) => console.log(err.message));
  } else {
    res.send(401, {messsage: "Not Authorized"})
  }
});

router.get('/post/:id', (req, res) => {
  var currentUser = req.user;
  Post.findById(req.params.id).populate('comments').populate('author').then((posts) => {
    res.render('post-show', {posts, currentUser})
  }).catch((err) => res.send(err.message));
});


router.get("/n/:subreddit", (req, res) => {
  var currentUser = req.user;
  Post.find({subreddit: req.params.subreddit}).populate('author').then((posts) => {
      res.render("post-index", {posts, currentUser});
    }).catch((err) => res.send(err));
});

module.exports = router