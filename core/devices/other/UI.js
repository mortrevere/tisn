Array.prototype.equals=function(e){if(!e)return!1;if(this.length!=e.length)return!1;for(var r=0,t=this.length;t>r;r++)if(this[r]instanceof Array&&e[r]instanceof Array){if(!this[r].equals(e[r]))return!1}else if(this[r]!=e[r])return!1;return!0},Object.defineProperty(Array.prototype,"equals",{enumerable:!1});

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function copy(from, to)
{
    if (from == null || typeof from != "object") return from;
    if (from.constructor != Object && from.constructor != Array) return from;
    if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
        from.constructor == String || from.constructor == Number || from.constructor == Boolean)
        return new from.constructor(from);

    to = to || new from.constructor();

    for (var name in from)
    {
        to[name] = typeof to[name] == "undefined" ? copy(from[name], null) : to[name];
    }

    return to;
}

var BLANK_STATE = {
    panel : 0,
    widgets : [],
    LEDs : Array(9).fill(Array(26)),
    colors : []
}

function tint(c, n, k) {
  return Math.min(Math.max(0, Math.round(Math.pow((1 - 1 / k), n) * (c - 255) + 255)), 255);
  /* Explicit form of the following arithmetico-geometric sequence : Un+1 = Un + (255 - Un)/k
     Which is used to generate tints of a given color, one component (R,G,B) at a time
     Explicit form is used to avoid usage of a loop
     * */
}

function getColorIndex(state, color) {
  for(var i = 0; i < state.colors.length; i++) {
    if(state.colors[i].equals(color))
      return i;
  }
  state.colors.push(color);
  return state.colors.length-1;
}

module.exports = {
  output : [],
  colors : {
    WHITE : [255, 255, 255],
    RED : [255, 0, 0],
    GREEN : [0, 255, 0],
    BLUE : [0, 0, 255],
    YELLOW : [255,255,0],
    CYAN : [0, 255, 255],
    PINK : [255, 0, 255],
    GOLD : [253, 215, 0]
  },
  state : {
    panel : 0,
    widgets : [],
    LEDs : Array(9).fill(Array(26)),
    colors : []
  },

  destroy : function() {
    this.state = JSON.parse(JSON.stringify(BLANK_STATE));
  },

  export : function() {
    return copy(this.state);
  },

  load : function(state) {
    this.state = copy(state);
  },

  widget : {
    slider : function(pos, color, value, actionHandler) {
      var sliderWidget = {
        type : 'slider',
        pos : pos,
        color : color,
        value : value
      };
      this.parent.state.widgets.push(sliderWidget)
    },
    button : function(pos, color, actionHandler, Ypos) {
      var buttonWidget = {
        type : 'button',
        pos : pos,
        Ypos : Ypos === undefined ? "top" : Ypos,
        height : Ypos === undefined ? 1 : 0.5,
        color : color,
        colorPressed : color.map(function(c, index) { return tint(c, 4, 13); }),
        action : actionHandler
      };
      this.parent.state.widgets.push(buttonWidget)
    },
    line : function(dir, index) {
      var lineWidget = {
        type : 'line',
        dir : dir,
        index : index,
        color : [255,0,0]
      };
      this.parent.state.widgets.push(lineWidget)
    }
  },
  render : function(skip) {
   
    
    var LEDs = this.state.LEDs;
    var state = this.state;
    if(skip === undefined)
    {
      this.state.LEDs = Array(9).fill(Array(26));
      for(var i = 0; i < 9; i++) {
        LEDs[i] = new Array(26);
      }

      this.state.widgets.forEach(function(widget) {

        var posIndex = {left : 0, middle : 9, right : 18}[widget.pos];
        var width = 8;

        if(widget.type == 'slider') {
          var height = Math.floor(widget.value*8);

          for(var i = 8-height; i < 8; i++)
            for(var j = 0; j < width; j++)
              LEDs[i][j+posIndex] = widget.color;

        } else if (widget.type == 'button') {

          var YposIndex = {bottom : 4, top : 0}[widget.Ypos];
          var height = Math.floor(widget.height*8);

          for(var i = 0; i < height; i++)
            for(var j = 0; j < width; j++)
              LEDs[Math.min(7, i + YposIndex)][j + posIndex] = widget.color;

        } else if (widget.type == 'line') {

          if(widget.dir == 'hor')
            for(var i = 0; i < 26; i++)
              LEDs[widget.index][i] = widget.color;
          else
            for(var i = 0; i < 8; i++)
              LEDs[i][widget.index] = widget.color;

        }


      });
    } //skip
    //var commands = [];
    //var colorCommands = [];
    var buffer = [];
    this.state.LEDs.forEach(function(line, i) {
      line.forEach(function(px, j) {
        if(px !== undefined) {
          buffer.push([i,j, getColorIndex(state, px)]);
        }
      });
    });

    //console.log(buffer);

    var out = [0,0,this.state.colors.length];
    
    this.state.colors.forEach(function(color) {
      out = out.concat([].concat.apply([], color));
    });

    buffer.forEach(function(px) {
      out = out.concat([].concat.apply([], px));
    });


    //console.log(dec2bin(state.colors.length));
    out[0] = ("000000000000000" + dec2bin(buffer.length*3)).slice(-16);
    //console.log(out[0], out.length, buffer.length*3 + state.colors.length*3 + 3);
    out[1] = parseInt(out[0].substr(8),2); //bin to dec
    out[0] = parseInt(out[0].substr(0,8),2); //bin to dec
    //console.log(out[0],out[1]);
    //console.log(out[0]*256+out[1]);

    this.output = Buffer.from(out);
    return Buffer.from(out);
    /*for(var i = 0; i < this.state.colors.length; i++)
      commands.push('color ' + i + ' ' + this.state.colors[i][0] + ' ' + this.state.colors[i][1]+ ' ' + this.state.colors[i][2]);

    commands = commands.concat(colorCommands);

   //var out = [this.state.colors.length];

   /*this.state.colors.forEach(function(color) {
     out = out.concat(color);
   });

   buffer.forEach(function(px) {
     out = out.concat(px);
   });

   this.output = String.fromCharCode.apply(this, out);*/
   //this.output = commands;

  },
  touch : function(coords) {
    var x = coords[0];
    var y = coords[1];

    var touchedWidget = {};
    this.state.widgets.forEach(function(widget) {

      var YposIndex = 0, posIndex = {left : 0, middle : 9, right : 18}[widget.pos];

      var width = 8, height = 0;

      if(widget.type == 'slider')
        height = 8;
      else if (widget.type == 'button') {
        YposIndex = {bottom : 4, top : 0}[widget.Ypos];
        height = Math.floor(widget.height*8);
      }

      // TO FIX

      console.log(posIndex, posIndex + width, YposIndex, YposIndex + height);

      if(y >= posIndex  && y <= posIndex + width && x >= YposIndex && x <= YposIndex + height)
        touchedWidget = widget;

    });
    return touchedWidget;
  },
  init : function() {
    this.widget.parent = this;
    for(var i = 0; i < 9; i++) {
        this.state.LEDs[i] = new Array(26);
    }
    delete this.init;
    return this;
  }
}.init();

