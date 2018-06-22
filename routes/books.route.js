var express = require('express');
var Book = require('../models/book.model'); 

var router = express.Router();


router.get('/listing',function(req,res){
    Book.find({})
    .populate('user')
    .populate('reviews')
    .exec(function(err,books){
        if(err){
            res.send('error has occured');
        }else{
            res.json(books);
        }
    });
});

router.post('/listing',function(req,res){
    Book.findOne({
        ISBN : req.body.isbn
    })
    .exec(function(err,existBook){
        if(!existBook){
            var newBook = new Book({
                title: req.body.title,
                ISBN: req.body.isbn,
                author: req.body.author,
                rating : req.body.rating,
                user: req.body.userId,
                reviews: req.body.reviews
              });
        
              newBook.save(function(err,book){
                if(err){
                  res.send(err);
                }else{
                  res.json(book);
                }
              });
        }else{
            res.send('ISBN is already exist');
        }
    });
});

router.get('/listing/:id',function(req,res){
    Book.findOne({
        _id : req.params.id
    })
    .populate('user')
    .populate('reviews')
    .exec(function(err,book){
        if(err){
            res.send('error has occured');
        }else{
            res.json(book);
        }
    });
});


module.exports = router;
