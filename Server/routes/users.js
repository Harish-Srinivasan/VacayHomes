var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/VacayHome');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

