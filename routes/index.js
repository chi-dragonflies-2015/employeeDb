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


module.exports = router;