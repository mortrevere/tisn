function info(text) {
  return {info : text}
}

function error(text) {
  return {error : text}
}

var crypto = require('crypto');
var HMAC = require('crypto-js/hmac-sha256');
var validator = require('node-validator');

var checkPixel = validator.isObject()
  .withRequired('x', validator.isInteger())
  .withRequired('y', validator.isInteger())
  .withRequired('r', validator.isInteger())
  .withRequired('g', validator.isInteger())
  .withRequired('b', validator.isInteger())
  .withRequired('i', validator.isInteger({min: 0, max: 100}));

var checkFrame = validator.isArray(checkPixel);
var checkAnimation = validator.isObject()
  .withRequired('frames', validator.isArray(checkFrame, {min : 1}))
  .withRequired('name', validator.isString())
  .withRequired('delta', validator.isInteger())
  .withRequired('duration', validator.isInteger())
  .withRequired('mode', validator.isString())

module.exports = function(app, red) {

app.get('/users', function(req, res) {
  red.smembers('users', function(err, object) {
    res.json(object);
  });
});

app.put('/users', function(req, res) {
  var nick = req.body.username;
  var pw = req.body.password;

  red.sadd('users', nick, function(err, reply) {
    if(reply)
      res.json(info("Nouvel utilisateur enregistré"));
    else
      res.json(error("Cet utilisateur existe déjà"));
  });
});

app.put('/rfid', function(req, res) {
  var nick = req.body.username;
  var rfid = req.body.rfid;
  red.hset('rfid-users', rfid, nick, function(err, reply) {
    if(reply)
      res.json(info("Nouveau RFID enregistré"));
    else
      res.json(error("RFID mis à jour"));
  });
});

app.get('/rfid/:rfid', function(req, res) {
  var rfid = req.body.rfid;
  red.hget('rfid-users', rfid, function(err, reply) {
    res.json(reply);
  });
});
/*app.post('/connect', function(req, res) {

});*/

app.get('/animations', function(req, res) {
  red.hgetall('animations', function(err, object) {
    if(object === null)
      object = {};

    res.json(object);
  });
});

app.get('/u/:nick/animations', function(req, res) {
  red.smembers(req.params.nick + '-animations', function(err, object) {
    console.log(object);
    if(object === null)
      res.json(error("Cette utilisateur n'existe pas"));
    else
      res.json(object);
  });
});

app.put('/u/:nick/animations/:id', function(req, res) {
  red.sadd(req.params.nick + '-animations', req.params.id, function(err, reply) {
    if(reply)
      res.json(info("Animation ajoutée à la bibliothèque"));
    else
      res.json(error("Cette animation est déjà dans votre bibliothèque"));
  });
});

app.delete('/u/:nick/animations/:id', function(req, res) {
  red.srem(req.params.nick + '-animations', req.params.id, function(err, reply) {
    if(reply)
      res.json(info("Animation supprimée de la bibliothèque"));
    else
      res.json(error("Impossible de supprimer l'animation de votre bibliothèque"));
  });
});


app.get('/animations/:id', function(req, res) {
  red.hget('animations', req.params.id, function(err, object) {
    console.log(object);
    if(object === null)
      res.json(error("Cette animation n'existe pas"));
    else
      res.json(JSON.parse(object));
  });
});

app.put('/animations', function(req, res) {
  console.log(req.body);

  validator.run(checkAnimation, req.body.animation, function(errorCount, errors) {
    if(errorCount)
      res.json(error("L'animation fournie est mal formée"));
    else
      red.hgetall('animations', function(err, object) {
        if(object === null)
          object = {};

        var id = '';
        do {
          id = crypto.randomBytes(4).toString('hex')
        } while(object[id] !== undefined);

        object[id] = JSON.stringify(req.body.animation);

        red.hmset('animations', object);
        res.json(object);
      });
  });
});

app.post('/animations/:id', function(req, res) {

  validator.run(checkAnimation, req.body.animation, function(errorCount, errors) {
    if(errorCount)
      res.json(error("L'animation fournie est mal formée"));
    else
      red.hget('animations', req.params.id, function(err, object) {
        console.log(object);
        if(object === null)
          res.json(error("Cette animation n'existe pas"));
        else
        {
          red.hset('animations', req.params.id, JSON.stringify(req.body.animation), function(err, reply) {
            if(!err && reply === 0)
              res.json(info("Mise à jour de l'animation effectuée"));
            else
              res.json(error("Impossible de mettre à jour l'animation"));
          });
        }
      });
  });
});


}
