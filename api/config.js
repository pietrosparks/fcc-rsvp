const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const secrets = require('./dbconfig/secrets');
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
const logger = require('morgan');

//CORS CONFIGURATION

const incomingOriginWhitelist = [
  //for machines that use 'origin'
  'http://localhost:5000',
  //for machines that use 'host'
  'localhost:5000',
]

//CORS only takes requests hence the (req , next )
//Takes the request checks the header and passes it on to the next process

const corsConfig = (req, next) => {
  let corsOptions;
  let incomingOrigin = req.header('host') || req.header('origin');
  if (incomingOriginWhitelist.indexOf(incomingOrigin !== -1)) {
    corsOptions = {
      origin: true
    }
    return next(null, corsOptions);
  } else
    corsOptions = {
      origin: false
    }
  return next(new Error('You like going under the hood, i like you. Contact me '))

}

module.exports = (app, express) => {

  const api = require('./routes/api')(express);
  //Initializing the Cors configuration 
  app.use(cors(corsConfig), (req, res, next) => {
    next();
  })

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(serveStatic(__dirname + "/../dist"));
  app.use('/api', api);
  app.use(history({
    verbose: true
  }))
  app.use(logger('short'));


  //catch errors 
  app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  })
  // error handler 
  app.use((err, req, res) => {
    res.locals.message = err.message
    //Only prviding errors in development 
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    console.log(err);
    res.render('error')
  })

}