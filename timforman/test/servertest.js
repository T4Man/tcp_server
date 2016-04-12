const net = require('net');
const fs = require('fs');
const expect = require('chai').expect;
require(__dirname + '/../lib/server.js');
var existingFiles;

describe('test for writing log files', () => {
  before(() => {
    fs.readdir('./', (err, allFiles) => {
      console.log(allFiles);
      if (err) return 'An error has occurred.';
    });
  });
  it('should write a new log file', (done) => {
    var host = net.connect({ port: 8080 }, () => {
      host.write('test');
      host.end();
      done();
    });
  });
  it('look for new log file', (done) => {
    fs.readdir('./', (err, allFiles) => {
      if (err) return 'An error has occurred.';
      console.log(allFiles);
      expect(allFiles === existingFiles + 1).to.eql(true);
    });
    done();
  });
});
