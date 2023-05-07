var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bootcamp del Master en Full Stack Web Development de ThreePoints' });
});

router.get('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
