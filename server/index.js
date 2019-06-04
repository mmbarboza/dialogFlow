const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
require('../secrets');
const runSample = require('./getMessage');

//logging middleware
app.use(morgan('dev'));

//static middleware
app.use(express.static(path.join(__dirname, '../public')));

//parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//starting the server
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {

  console.log(`Your server, listening on port ${port}`);
});

// mount api routes on apiRoutes
//app.use('/api', require('../apiRoutes')); // matches all requests to /api
app.get('/runSample', async(req, res, next) => {
  console.log(runSample());
  const answer = await runSample();
  res.send(answer);
});


//send index html
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//handle 500 errors
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
