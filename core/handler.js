
handlers = {};

//Load every handler available
//Example : devices/RFID.js handles every data coming from the RFID device

var path = require("path").join(__dirname, "devices");
require("fs").readdirSync(path).filter(function(file) { return (file.indexOf(".js") > -1) && (file.indexOf("#") == -1); }).forEach(function(file) {
  process.stdout.write("Loading device handler " + file + "...");
  handlers[file.substr(0, file.length-3)] = require(path + '/' + file);
  console.log("done.");
});

console.log(handlers);


module.exports = function(device, data, devices) {

  device.tc++; //increase transmission count
  //console.log('H : ', device.id, data, device.tc);

  //init logic
  if(data == "init")
    console.log('got init maggle');
  device.sp.drain(function() {
    setTimeout(function() {
      device.sp.write('init id', function(err) {
        if (err) return console.log('Error on init write for ' + path + ' : ', err.message);
      });
    }, 1000);
  });

  //second transmission from device should be its identifier
  if(device.tc == 2)
    device.id = data;

  //if the device is identified, transmit data to its handler module
  if(device.id)
    setTimeout(function() {
      handlers[device.id](device.sp, data, devices)
    }, 50);

}
