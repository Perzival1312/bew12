const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get('/signup', (req, res) => {
    res.render('sign-up')
})

router.post('/signup', (req, res) => {
    const user = new User(req.body);
    user.save().then((user) => {
        var token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: "60 days"});
        res.cookie('nToken', token, {maxAge: 900000, httpOnly: true});
        res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
      return res.send(400, {err: err});
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username}, "username password").then((user) => {
        if (!user) {
            return res.send(401, {message: "Wrong Username or Password"});
        }
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                return res.send(401, {message: "Wrong Username or password"});
            }
            const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, {expiresIn: "60 days"});
            res.cookie("nToken", token, {maxAge: 900000, httpOnly: true});
            res.redirect("/");
        });
    }).catch((err) => console.log(err));
});

module.exports = router;