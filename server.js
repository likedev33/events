
// imports
var express = require('express');
var bodyParser = require('body-parser');
const helmet = require('helmet');

const httpProxy = require('express-http-proxy');
const compression = require('compression');
const cors = require('cors');

const spdy = require("spdy");
const fs = require('fs');

const PORT = 5000;
const CERT_DIR = `${__dirname}/cert`;


var jwtUtils = require('./utils/jwt.utils');
// var models = require('./models');
// var db = require('./models');
// var dbs = require('./models').db;
// Imports routes
const authRoute = require('./routes/auth');
// const equipeCommandeRoute = require('./routes/equipeCommande');
// const effectifRoute = require('./routes/effectif');
// const ServerSSE = require('./sse');
// const connectDB = require('./config/db');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var corsOptions = {
  origin: ['http://localhost:4200'], // 'https://ticnom.com', 'https://www.ticnom.com'],
  optionsSuccessStatus: 200, // For legacy browser support
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}

app.use(cors(corsOptions));
app.use(compression());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
  res.setHeader('Access-Control-Expose-Headers','Authorization');
  next();
  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.setHeader('Accept', 'text/html', 'utf-8');
      res.send();
  });
});
// app.use(sse());
app.use('/api/users', authRoute);

// ****** fin de récupération des affectations déjà saisies***********************************

app.get('/', (_, res) => {
    res.send('Hello world');
  });
  
server = spdy.createServer(
    {
      key: fs.readFileSync(`${CERT_DIR}/server.key`),
      cert: fs.readFileSync(`${CERT_DIR}/server.cert`),
    },
    app
  );

const port = 5000; // process.env.port || 8082;

 // Launch server
 server.listen(port, function() {
     console.log('Server en écoute on port :', port); // console.log(process.env);
 });

