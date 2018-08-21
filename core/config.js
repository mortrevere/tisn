var redis = require('redis');
var red = redis.createClient();

red.on('connect', function() {
    console.log('[CONF] [OK] Redis connection established');
});

module.exports = {
  getColor : function(sub, id, cb) {
    red.hget('conf:color-' + sub, id, function(err, reply) {
      if(cb !== undefined)
        cb(JSON.parse(reply));
    });
  },
  getAllColors : function(sub, cb) {
    red.hgetall('conf:color-' + sub, function(err, reply) {
      console.log(reply);
      if(reply !== undefined && reply !== null)
        Object.keys(reply).forEach(function(key) {
          reply[key] = JSON.parse(reply[key]);
        });

      if(cb !== undefined)
        cb(reply);

    });
  },
  setColor : function(sub, id, val, cb) {
    red.hset('conf:color-' + sub, id, JSON.stringify(val), function(err, reply) {
      if(err)
        console.log(err);
      if(cb !== undefined)
        cb(reply);
    });
  },
  setAllColors : function(sub, val, cb) {
    Object.keys(val).forEach(function(key) {
      val[key] = JSON.stringify(val[key]);
    });

    red.hmset('conf:color-' + sub, val, function(err, reply) {
      if(err)
        console.log(err);
      if(cb !== undefined)
        cb(reply);
    });
  }
}
