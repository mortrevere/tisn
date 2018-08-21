Array.prototype.equals=function(e){if(!e)return!1;if(this.length!=e.length)return!1;for(var r=0,t=this.length;t>r;r++)if(this[r]instanceof Array&&e[r]instanceof Array){if(!this[r].equals(e[r]))return!1}else if(this[r]!=e[r])return!1;return!0},Object.defineProperty(Array.prototype,"equals",{enumerable:!1});

var UI = require('./other/UI.js');

conf = { swipe : {} };

var handleButton1 = function(serial, devices, widget, coords) {
  console.log("pwet");
};

UI.widget.button("middle", [165,29,12], handleButton1, "top");

var homeLayout = UI.export();
console.log(homeLayout);

homeLayout.panel = 3;

console.log(homeLayout, UI.state);

conf.swipe.lt   = function(serial, devices) {
  console.log('called lt');
};

//conf.swipe.mt = function(serial, devices) {};

conf.swipe.rt = function(serial, devices) {};

conf.swipe.lb = function(serial, devices) {};

//conf.swipe.mb = function(serial, devices) {};

conf.swipe.rb = function(serial, devices) {};

conf.swipe.tl = function(serial, devices) {
  console.log('called tl');
};

//conf.swipe.ml = function(serial, devices) {};

conf.swipe.bl = function(serial, devices) {};

conf.swipe.tr = function(serial, devices) {};

//conf.swipe.mr = function(serial, devices) {};

conf.swipe.br = function(serial, devices) {};

conf.touch = function(serial, devices, coords) {
  /*var toggleConf = coords.reduce(function(prev, next) {
    return prev | next.equals([26,8]);
  }, false);*/
  UI.touch(coords).action(serial, devices, widget, coords);
};


module.exports = function(serial, data, devices) {

  console.log("got capaled :", data);

  var args = data.split(' ');
  console.log(args);

  switch(args[0]) {

  case 'swipe':
    console.log("swipe dir : ", args[1]);
    conf.swipe[args[1]](serial, devices);
    break;
  case 'mtouch':
    console.log("touch coords : ", args[1]);
    try {
      var coords = JSON.parse(args[1]);
      console.log("touch coords : ", coords);
      conf.touch(serial, devices, coords);
    } catch(e) {
      console.log("CAPALED fail with error", e);
    }
    break;
  default:
    break;

  }

}
