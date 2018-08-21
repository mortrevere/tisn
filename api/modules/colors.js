var config = require('../../core/config.js');

function info(text) {
  return {info : text}
}

function error(text) {
  return {error : text}
}

var crypto = require('crypto');
var HMAC = require('crypto-js/hmac-sha256');
var validator = require('node-validator');

var checkColor = validator.isInteger({min: 0, max: 255});
var checkPixel = validator.isArray(checkColor);

var checkColorSet = validator.isObject()
  .withOptional('left-top', checkPixel)
  .withOptional('left-bottom', checkPixel)
  .withOptional('middle-top', checkPixel)
  .withOptional('middle-bottom', checkPixel)
  .withOptional('right-top', checkPixel)
  .withOptional('right-bottom', checkPixel);

var check = validator.isObject().withOptional('menu', checkColorSet).withOptional('lamp', checkColorSet);

module.exports = function(app, red) {

app.get('/colors', function(req, res) {
  var out = {menu : {}, lamp : {}};
  config.getAllColors('widget', function(reply) {
    out.menu = reply;
    config.getAllColors('lamp', function(reply) {
      out.lamp = reply;
      res.json(out);
    });
  });
});

app.post('/colors', function(req, res) {
  console.log(req.body);
  validator.run(check, req.body, function(errorCount, errors) {
    if(errorCount)
    {
      console.log(errors);
      res.json(error("Composante malformée"));
    }
    else
    {
      if(req.body.menu !== undefined)
        config.setAllColors('widget', req.body.menu);
      if(req.body.lamp !== undefined)
        config.setAllColors('lamp', req.body.lamp);
      res.json(info('Modifications effectuées.'))
    }

  });
});

}

