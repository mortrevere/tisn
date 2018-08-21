module.exports = function(serial, data, devices) {

  console.log("got RFID :", data);
  devices['capaled'].sp.write('[[1,1,255,255,255,255]]', function(err) {
    if (err) return console.log('Error on write for capaled : ', err.message);
  });
}
