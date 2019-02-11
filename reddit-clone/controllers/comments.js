const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');

router.post('/comment/new', (req, res) => {
    Comment.create(req.body).then(() => {
        console.log(req.body)
        res.redirect('back');
    }).catch((err) => res.send(err.message));
});

module.exports = router;