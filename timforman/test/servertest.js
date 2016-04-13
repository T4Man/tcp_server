const net = require('net');
const fs = require('fs');
const expect = require('chai').expect;
require(__dirname + '/../lib/server.js');
var previousFiles;

describe('test for writing log files', () => {
  before(() => {
    fs.readdir('./', (err, existingFiles) => {
      previousFiles = existingFiles.length;
      console.log('Number of previous files: ' + previousFiles);
      if (err) return 'An error has occurred.';
    });
  });
  it('should write a new log file', (done) => {
    var host = net.connect({ port: 3000 }, () => {
      host.write('test');
      host.end();
      done();
    });
  });
  it('check for a new log file', (done) => {
    after(() => {
      fs.readdir('./', (err, existingFiles) => {
        if (err) return 'An error has occurred.';
        console.log('Number of existing files: ' + existingFiles.length);
        expect(existingFiles.length).to.eql(previousFiles + 1);
      });
    });
    done();
  });
});
