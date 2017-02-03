var glob = require("glob");
var SerialPort = require('serialport');
var handle = require('./handler.js');

var devices = {};

//list all serial over USB device
glob("/dev/ttyUSB*", function (err, files) {
  console.log("Found devices : ", files);
  var options = {
    parser: SerialPort.parsers.readline('\r\n') //to comply with arduino Serial.println() CRLF
  };


  files.forEach(function(path) {
    devices[path] = { tc : 0 }; //transmission count
    devices[path].sp = new SerialPort(path, options); //SerialPort object

    devices[path].sp.on("open", function(err) {
      console.log("opened ", path);
      if (err) {
        return console.log('Error opening ' + path + ' : ', err.message);
      }

      //transmit incoming data to the main dispatcher
      if(devices[path].sp.isOpen())
        devices[path].sp.on('data', function(data) {
          handle(devices[path], data.toString());
        });

    });
  });
})

