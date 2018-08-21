var UI = require('./UI.js');
var config = require('../config.js');

fromHex = function(hex) {
  return [(bigint = parseInt(hex, 16)) >> 16 & 255, bigint >> 8 & 255, bigint & 255];
}

UI.widget.line("hor", 1);
UI.render();


UI.output = "\0" + String.fromCharCode(UI.output.length) + UI.output;
var frame = Buffer.from(UI.output, 'ascii').toString('hex');
console.log(frame);

console.log(UI.output.length, frame.length);
