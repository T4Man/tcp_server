const net = require('net');
const fs = require('fs');
const uuid = require('uuid');

var port = 8080;

net.createServer((socket) => {
  console.log('TCP server connected on port ' + socket.remotePort);
  socket.on('data', (data) => {
    console.log('Data: ' + data);
    fs.writeFile(uuid.v4(), data, (err) => {
      if (err) return 'An error has occurred.';
      console.log('Log file created');
    });
  });
  socket.end();
}).listen(port);

process.stdout.write('Server connected on ' + port);

module.exports = exports;
