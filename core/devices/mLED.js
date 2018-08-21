Array.prototype.equals=function(e){if(!e)return!1;if(this.length!=e.length)return!1;for(var r=0,t=this.length;t>r;r++)if(this[r]instanceof Array&&e[r]instanceof Array){if(!this[r].equals(e[r]))return!1}else if(this[r]!=e[r])return!1;return!0},Object.defineProperty(Array.prototype,"equals",{enumerable:!1});

var UI = require('./other/UI.js');

UI.widget.slider("left", UI.colors.GOLD, 0.7, function() {});
UI.widget.slider("middle", UI.colors.RED, 0.4, function() {});
UI.widget.button("right", UI.colors.CYAN, function() {}, "top");
UI.widget.button("right", UI.colors.GOLD, function() {}, "bottom");
UI.render();
//var soundLayout = UI.export();

var pos = 0;

module.exports = function(serial, data, devices) {

  //console.log("got mLED :", data);

  var args = data.split(' ');
  //console.log(args);

  switch(args[0]) {

  case 'ok':
    pos++;
    if(pos == UI.output.length || pos == 0)
    {
      pos = 0;
      serial.write('reset\n', function(err) {
        if (err) return console.log('Error on write for mLED : ', err.message);
        //console.log('sent DRAW');
      });
    }
    else
    {
      cmd = UI.output[pos];
      //serial.drain(function() {
        serial.write(cmd + '\n', function(err) {
          if (err) return console.log('Error on write for mLED : ', err.message);
          //console.log('sent', cmd);
        });
    }
   //});
  case 'reqFrame':
    //console.log(UI.output);
    //UI.output.forEach(function(cmd) {
      //console.log("sending", cmd);
    cmd = UI.output[pos];
    serial.drain(function() {
      serial.write(cmd + '\n', function(err) {
        if (err) return console.log('Error on write for mLED : ', err.message);
        //console.log('sent', cmd);
      });
    });
    //});

  default:
    break;

  }

}
