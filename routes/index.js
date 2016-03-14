var express = require('express');
var router = express.Router();
var customerRouter = require('./customer');
var personRouter = require('./person');

/* GET home page. */
module.exports = function (app) {
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.use('/customer', customerRouter);
app.use('/person', personRouter);

app.use(function (err, req, res, next) {
        var status = err.status || 500;
        res.status(status).send(err);
 });


module.exports = router;
}