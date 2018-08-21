function chunkify(a, n) {
    if (n < 2)
        return [a];

    var len = a.length,
            out = [],
            i = 0,
            size;

    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }

    else {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }
    return out;
}

var UI = require("./other/UI.js");
var SerialPort = require("serialport");

var options = {
  parser: SerialPort.parsers.readline('\r\n'), //to comply with arduino Serial.println() CRLF
  baudRate: 115200
};


d = { tc : 0 }; //transmission count
mLED = { tc : 0 }; //transmission count
mLED.sp = new SerialPort('/dev/ttyUSB1', options); //SerialPort object

mLED.sp.on("open", function(err) {
  if (err) {
    return console.log('Error opening ' + path + ' : ', err.message);
  }

  //transmit incoming data to the main dispatcher
  if(mLED.sp.isOpen())
    mLED.sp.on('data', function(data) {
      console.log("////////", data);
      if(data ==  'init')
        setTimeout(function() {
          mLED.sp.write('init id');

          d.sp = new SerialPort('/dev/ttyACM0', options); //SerialPort object

          d.sp.on("open", function(err) {
            if (err) {
              return console.log('Error opening ' + path + ' : ', err.message);
            }

            //transmit incoming data to the main dispatcher
            if(d.sp.isOpen())
              d.sp.on('data', function(data) {
                console.log("////////", data);
                setTimeout(function() { handle(data); }, 10);
                //handle(data);
              });

          });


        },500);
      //setTimeout(function() { handle(data); }, 10);
      //handle(data);
    });

});






function chunkify2(arr) {
  var bounds = [0, 1, 2, 4, 7, 10, 12, 16, 22, 25, 32, 44, 56, 80, 100, 128];
  var out = [];
  for(var i = 0; i < bounds.length-1; i++)
    out.push(arr.slice(bounds[i], bounds[i+1]));
  return out;
}


function handle(data) {
  device = d;
  var args = data.split(' ');
  if(data ==  'init')
    setTimeout(function() {
      device.sp.write('init id');
    },500);
  /*if(data == 'reqFrame')
  {
    
  }*/
  else {
    module.exports(null, data, null);
  }
}


module.exports = function(serial, data, devices) {

  if(Buffer.from(data).length != 128 )
  {
    console.log("INVALID FFT DATA", Buffer.from(data).length);
    //return;
  }
  //console.log("got FFT :", data);
  //var bin = Buffer.from(data, "binary");
  //console.log(bin);
  var value = 0;
  var avg = 0, min = 1000, max = 0;
  var bars = chunkify2([...data], 14).map(function(subset) {
    console.log(subset);
    return subset.reduce(function(a,b) {
      return a + b.charCodeAt(0);
    }, 0);
  });


 console.log(bars);

  bars.forEach(function(value) {
      if(value > max) max = value;
      if(value < min) min = value;
  });

  if(max > 300)
    max = 300;
  //console.log(min, max);

  bars = bars.map(function(value) {
    if(value > 300) value = 300;
    return Math.round((value-min)/(max-min)*8);
  });
  console.log(bars);

  //console.log(bars, min, max);
  //console.log(UI.state.LEDs.length);
  for(var i = 0; i < 9; i++) {
        UI.state.LEDs[i] = new Array(26);
  }
  bars.forEach(function(value, index) {
    for(var i = 0; i < value; i++) {
      UI.state.LEDs[8-i][index*2] = colorMap(i);
    }
    //console.log(value, index);
    //UI.state.LEDs[8-value][index*2] = colorMap(value);
  });
  //console.log(UI.state.LEDs);
  var frame = UI.render('skip');
  
  //console.log(frame);

  mLED.sp.drain(function() {
    mLED.sp.write(Buffer.concat([Buffer.from("frame|"), frame]), function(err) {
      if(err) console.log("ERROR SENDING FRAME");
    });
  });

}

module.exports(null, "abcdefghijklmnopqrstuvwwyz", null);

function colorMap(level) {
  if(level <= 4)
    return UI.colors.GREEN;
  else if(level <= 6)
    return UI.colors.GOLD;
  else if(level == 7)
    return UI.colors.RED;
}
