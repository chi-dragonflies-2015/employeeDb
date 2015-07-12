var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Welcome Friends'
    });
});


// GET ALL posts
router.get("/posts", function(req, res) {
    var db = req.db;
    var collection = db.get('posts');
    collection.find({}, {}, function(e, docs) {
        res.render('allposts', {
            "posts": docs
        });
    });
});

// GET NEW post
router.get("/posts/new", function(req, res) {
    res.render('newpost', {
        title: "Write an excellent new post"
    });
});

// POST NEW post
router.post('/posts', function(req, res) {
    // db variables
    var db = req.db;
    var collection = db.get('posts');

    // form variables
    var title = req.body.title;
    var body = req.body.body;
    var author = req.body.author;
    var date = req.body.date;

    collection.insert({
            "title": title,
            "body": body,
            "author": author,
            "date": date
        }, function(err, doc) {
            if (err) {
                res.send("There was a problem updating the DB");
            } else {
              res.redirect('posts');
        }
    });
});

module.exports = router;