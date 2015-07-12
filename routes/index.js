var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Welcome friends'
    });
});

// GET ALL users
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs) {
        res.render('userlist', {
            "userlist": docs

        });
    });
});

// GET NEW user
router.get('/newuser', function(req, res, next) {
    res.render('newuser', {
        title: 'Become new user!'
    });
});

// POST NEW user
router.post('/adduser', function(req, res) {
    var db = req.db
    var userName = req.body.username;
    var email = req.body.email;
    var collection = db.get('usercollection');

    collection.insert({
            "username": userName,
            "email": email
    },

    function(err, doc) {
        if (err) {
            res.send("there was a problem writing to the database");
        } else {
            res.redirect("userlist");
        }
    });
});

// GET ALL Posts
router.get('/posts', funtion(req, res) {
    var db = req.db
    var collection = db.get('posts');
    collection.find({}, {}, function(e, docs) {
        res.render('allposts', {
            "posts": docs
        });
    });
});


module.exports = router;
