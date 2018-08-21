var UI = require('./UI.js');
var config = require('../../config.js');

fromHex = function(hex) {
  return [(bigint = parseInt(hex, 16)) >> 16 & 255, bigint >> 8 & 255, bigint & 255];
}

//console.log(UI.state);
//UI.destroy();
//console.log(UI.state);

/*UI.widget.slider("left", [127,12,0], 1);
UI.widget.slider("middle", [127,12,0], 0.3);
UI.widget.slider("right", [127,12,0], 0.6);*/

//console.log(UI.state);

//UI.widget.button("left", [165,29,12]);
//UI.widget.button("middle", [165,29,12], function() {}, "top");
//UI.widget.button("middle", [165,29,12], "bottom");


//console.log(UI.touch([4,17]));

//console.log(UI.state.widgets);
//UI.render()
//console.log(UI.state.LEDs);

//console.log(JSON.stringify(UI.output), UI.state.colors);

UI.widget.slider("left", UI.colors.GOLD, 0.2, function() {});
UI.widget.slider("middle", UI.colors.RED, 0.4, function() {});
UI.widget.button("right", UI.colors.CYAN, function() {}, "top");
UI.widget.button("right", UI.colors.GOLD, function() {}, "bottom");
var soundLayout = UI.export(); UI.destroy();


UI.widget.slider("left", UI.colors.GOLD, 0.2, function() {});
UI.widget.button("middle", UI.colors.RED, function() {});
UI.widget.button("right", UI.colors.GOLD, function() {}, "top");
var lampLayout = UI.export();
UI.render();
console.log(UI.output);
UI.destroy();


/*UI.widget.button("left", UI.colors.RED, function() {}, "top");
UI.widget.button("left", UI.colors.CYAN, function() {}, "bottom");
UI.widget.button("middle", UI.colors.GREEN, function() {}, "top");
UI.widget.button("middle", UI.colors.WHITE, function() {}, "bottom");
UI.widget.button("right", UI.colors.BLUE, function() {}, "top");
UI.widget.button("right", UI.colors.GOLD, function() {}, "bottom");*/

config.setColor('widget', 'left-top', UI.colors.RED);
config.setColor('widget', 'left-bottom', UI.colors.CYAN);
config.setColor('widget', 'middle-top', UI.colors.GREEN);
config.setColor('widget', 'middle-bottom', UI.colors.WHITE);
config.setColor('widget', 'right-top', UI.colors.BLUE);
config.setColor('widget', 'right-bottom', UI.colors.GOLD);

config.setColor('lamp', 'left-top', UI.colors.RED);
config.setColor('lamp', 'left-bottom', UI.colors.RED);
config.setColor('lamp', 'middle-top', UI.colors.RED);
config.setColor('lamp', 'middle-bottom', UI.colors.WHITE);
config.setColor('lamp', 'right-top', UI.colors.WHITE);
config.setColor('lamp', 'right-bottom', UI.colors.WHITE);

config.getAllColors('widget', function(reply) {
  Object.keys(reply).forEach(function(key) {
    var pos = key.split('-');
    console.log(pos, reply[key]);
    UI.widget.button(pos[0], reply[key], function() {}, pos[1]);
  });
});



/*['left', 'middle', 'right'].forEach(function(posX) {
  ['top', 'bottom'].forEach(function(posY) {
    config.getColor('widget-' + posX + '-' + posY, function(reply) {
      console.log('widget-' + posX + '-' + posY, reply);
      UI.widget.button(posX, reply, function() {}, posY);
    });
  });
});*/
/*
UI.widget.button("left", UI.colors.RED, function() {}, "top");
UI.widget.button("left", UI.colors.CYAN, function() {}, "bottom");
UI.widget.button("middle", UI.colors.GREEN, function() {}, "top");
UI.widget.button("middle", UI.colors.WHITE, function() {}, "bottom");
UI.widget.button("right", UI.colors.BLUE, function() {}, "top");
UI.widget.button("right", UI.colors.GOLD, function() {}, "bottom");
*/

UI.render();
console.log(UI.output);
console.log(UI.state.colors);


var colorLayout = UI.export(); UI.destroy();




UI.widget.button("middle", [165,29,12], function() {
  // sound menu
  UI.destroy();
  

}, "top");

var homeLayout = UI.export();

UI.destroy();
UI.widget.button("left", [255,255,255], function(k) {console.log("2 : ", k); });

var layout2 = UI.export();

//console.log(layout2);

UI.load(homeLayout);

UI.touch([2,17]).action("kk");

UI.load(layout2);

UI.touch([4,4]).action("ka");

//console.log(homeLayout);

/*homeLayout.panel = 3;

console.log(homeLayout, UI.state);
*/
