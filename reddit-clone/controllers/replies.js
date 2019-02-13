const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
 
router.get('/post/:postId/comments/:commentId/replies/new', (req, res) => {
    let post;
    Post.findById(req.params.postId).then((p) => {
        post = p;
        return Comment.findById(req.params.commentId);
    }).then((comment) => {
        res.render("replies-new", {post, comment});
    }).catch((err) => res.send(err.message));
});

router.post('/post/:postId/comments/:commentId/replies', (req, res) => {
    const reply = new Comment(req.body);
    reply.author = req.user._id
    Post.findById(req.params.postId).then((post) => {
        Promise.all([
            reply.save(),
            Comment.findById(req.params.commentId),
        ]).then(([reply, comment]) => {
            comment.comments.unshift(reply._id);
            return Promise.all([comment.save()]);
        }).then(() => {
            res.redirect(`/post/${req.params.postId}`);
        }).catch(console.error);
        return post.save();
    })
});

module.exports = router