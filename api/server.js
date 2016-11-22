var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var fs = require('fs');
var redis = require('redis');
var redclient = redis.createClient();

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

function Error(id, info)
{
  var error = {error : id, info : info};
  console.log(error);
  return error;
}

function isSHA(hash)
{
  if(hash.length != 64) return false;
  if(typeof hash != 'string') return false;
  var r = /[A-Fa-f0-9]{64}/;
  return r.test(hash);
}

redclient.on('connect', function() {
    console.log('[OK] Redis connection established');
});

/*app.use(responseTime(function (req, res, time) {
  redclient.rpush('rT', time);
  var logline = (req.ip + '_____________').substr(0,15) + " | " + req.url + ' (' + Math.round(time) + ' ms)'; 
  redclient.rpush('logs', logline);

  redclient.hgetall('requests', function(err, object) {
    //console.log(object);
    if(object === null)
      object = {};

    if(object[req.url] === undefined)
      object[req.url] = 1;
    else
      object[req.url]++;

    //console.log(object);
    redclient.hmset('requests', object);
  });

}));*/

//setInterval(function() {process.stdout.write('.'); }, 10000);

app.enable('trust proxy');
app.use(cors());
app.use(morgan('dev'));
//app.use(morgan('dev', {stream : fs.createWriteStream(__dirname + '/../access.log', {flags: 'a'})}));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
http.globalAgent.maxSockets = 1000;

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  //res.header('Cache-Control', 'no-cache');
  //console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
  next();
});

app.all('/p/*', function(req, res, next) {
  var token = req.header('token');
  if(token === undefined) return res.status(400).json(Error(3,"Missing token."));
  if(!isSHA(token)) return res.status(400).json(Error(31, "Malformed token"));

  pg.connect(connectionURL, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ error: 1, info: "Unable to join master DB"});
    }

    var query = client.query("SELECT * FROM accounts WHERE token = $1;", [token]);

    query.on('error', function(err) {
      console.log(err);
      return res.status(500).json(Error(0,"db error."));
    });

    query.on('row', function(row, result) {
      result.addRow(row);
    });

    query.on('end', function(result) {
      done();
      if(result.rowCount)
      {
        row = result.rows[0];
        req.userinfo = {};
        req.userinfo.id = parseInt(row.id);
        req.userinfo.club = parseInt(row.club);
        req.userinfo.token = token;
        next();
      }
      else
      {
        console.log("Invalid token :", token);
        return res.status(403).json({ error: 11, info: "Invalid token." });
      }
    });
  });
});



//Automatically include every file in the modules directory
var normalizedPath = require("path").join(__dirname, "modules");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  process.stdout.write("Loading " + file + "...");
  require("./modules/" + file)(app, redclient);
  console.log("done.");
});

var banpool = {};
//console.log(http.globalAgent);
app.use(function(req,res) {
  res.status(403).json({ error: 4, info: "Bad method."});
})
.listen(7777, 'localhost');
