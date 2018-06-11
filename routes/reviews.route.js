var express = require('express');
var Review = require('../models/review.model'); 

var router = express.Router();

router.get('/listing',function(req,res){
    Review.find({})
    .populate('book')
    .populate('user')
    .exec(function(err,reviews){
        if(err){
            res.send('error has occured');
        }else{
            res.json(reviews);
        }
    });
});

router.post('/listing',function(req,res){
    
    var newReview = new Review({
            textReview: req.body.textReview,
            rating: req.body.rating,
            book: req.body.bookId, 
            user: req.body.userId
        });

        newReview.save(function(err,review){
            if(err){
                res.send(err);
            }else{
                res.json(review);
            }
        });
});


module.exports = router;

