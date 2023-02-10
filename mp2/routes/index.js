var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' });
});
router.get('/articles/article1', function(req, res, next) {
  res.render('pages/article1', {navLocation: 'main'});
});
router.get('/articles/article2', function(req, res, next) {
  res.render('pages/article2', {navLocation: 'main'});
});
router.get('/contact', function(req, res, next) {
  res.render('pages/contact', {navLocation: 'contact'});
});
router.get('/login', function(req, res, next) {
  res.render('pages/login-page', {navLocation: 'main'});
});

module.exports = router;