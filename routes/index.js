var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Welcome Friends'
    });
});

// GET presentation page
router.get("/presentation", function(req, res){
  res.render('presentation', {
    title: 'Stuff I learned'
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

// DELETE post
router.delete('/posts/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('posts');
    var postToDelete = req.params.id;
    collection.remove({
        '_id': postToDelete
    }, function(err) {
        res.send((err === null) ? {
            msg: ''
        } : {
            msg: 'error: ' + err
        });
    });
});


module.exports = router;