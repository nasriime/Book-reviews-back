var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../models/user.model'); 
var bcrypt = require('bcryptjs');


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}) 
  .exec(function(err,users){
    if(err){
      res.send(err);
    }else{
      res.send(users);
    }
  });
});

router.post('/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});


router.post('/login', (req, res) => {
  
  User.findOne({userName:req.body.username})
    .exec(function(err,user){
      if(err){
        res.send(err);
      }else{
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if(result){
            jwt.sign({user}, 'secretkey', { expiresIn: '2 days' }, (err, token) => {
              res.json({
                token,
                id:user._id
              });
            }); 
          }else{
            res.status(400).send();
          }
            
        });
      }
    });
});


router.post('/signup', (req, res) => {

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          var newUser = new User({
            userName: req.body.username,
            password: hash
          });
        
          newUser.save(function(err,user){
            if(err){
              res.send(err);
            }else{
              res.json(user);
            }
          })
          
        });
    });

});


function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }

}

module.exports = router;
