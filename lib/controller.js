'use strict';

const http = require('http');
const keys = require('./keys');
const settings = require('./settings')();

let lastVolumeUpCmd = Date.now();
let lastVolumeDnCmd = Date.now();
let lastCursorUpCmd = Date.now();
let lastCursorDownCmd = Date.now();


let playersList = [];

const httpRequest = function(url, callbackSuccess, callbackError)
{
  console.log(url);

  var req = http.get(url);

  req.callbackSuccess = callbackSuccess || function() {};
  req.callbackError = callbackError || function() {};

  req.on('error', req.callbackError).on('response', function(res) {

    res.on('end', () => {
      console.log('response end');
      req.callbackSuccess();
    });

    const { statusCode } = res;
    let error;
    
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
    }
    if (error) {
      console.log('[HTTP REQUEST]\tProblem with request: ' + error.message);
      res.resume();
      return;
    }
    req.callbackSuccess();  
  });

};

const sendKey = function(deviceId, key, long, repeat) {
  if (playersList[deviceId]) {
    var ts = Math.floor(Date.now() / 1000);
    var url = `http://${playersList[deviceId].host}/pub/remote_control?code=${playersList[deviceId].code}&key=${key}&long=${long||false}&repeat=${repeat||1}&ts=${ts}`;
    httpRequest(url);
  }
};

const powerOn = function(deviceId) {
  if (playersList[deviceId]) {
    httpRequest(`http://${playersList[deviceId].host}:54243/device.xml`, function() {
      console.log('POWER STATE IS ALREADY ON');
    }, function() {
      console.log('POWER STATE IS OFF');
      sendKey(deviceId, keys['POWER ON']);
    });
  }
};

const powerOff = function(deviceId) {
  if (playersList[deviceId]) {
    httpRequest(`http://${playersList[deviceId].host}:54243/device.xml`, function() {
      console.log('POWER STATE IS ON');
      sendKey(deviceId, keys['POWER OFF']);
    }, function() {
      console.log('POWER STATE IS ALREADY OFF');
    });
  }
};

const repeat = function(deviceId, key) {
    return setTimeout(function () {
      sendKey(deviceId, key);
      setTimeout(function () {
        sendKey(deviceId, key);
        setTimeout(function () {
          sendKey(deviceId, key);
          setTimeout(function () {
            sendKey(deviceId, key);
            setTimeout(function () {
              sendKey(deviceId, key);
            }, 33);
          }, 33);
        }, 33);
      }, 33);
    }, 33);
};

module.exports.onButtonPressed = function (name, deviceId) {
    console.log(`[CONTROLLER] ${name} button pressed on device ${deviceId}`);
    if (keys.hasOwnProperty(name)) {

      if (name === 'POWER ON') {
        powerOn(deviceId);
        return;
      }

      if (name === 'POWER OFF') {
        powerOff(deviceId);
        return;
      }

      if (name === 'VOLUME UP') {
        if (Date.now() <= (lastVolumeUpCmd + 200)) {
          console.log('increase level rapidly');
          sendKey(deviceId, keys['VOLUME UP']);
          repeat(deviceId, keys['VOLUME UP']);
          return;
        }
        lastVolumeUpCmd = Date.now();
      }

      if (name === 'VOLUME DOWN') {
        if (Date.now() <= (lastVolumeDnCmd + 200)) {
          console.log('decrease level rapidly');
          sendKey(deviceId, keys['VOLUME DOWN']);
          repeat(deviceId, keys['VOLUME DOWN']);
          return;
        }
        lastVolumeDnCmd = Date.now();
      }

      if (name === 'CURSOR UP') {
        if (Date.now() <= (lastCursorUpCmd + 200)) {
          console.log('increase up rapidly');
          sendKey(deviceId, keys['CURSOR UP']);
          repeat(deviceId, keys['CURSOR UP']);
          return;
        }
        lastCursorUpCmd = Date.now();
      }

      if (name === 'CURSOR DOWN') {
        if (Date.now() <= (lastCursorDownCmd + 200)) {
          console.log('decrease down rapidly');
          sendKey(deviceId, keys['CURSOR DOWN']);
          repeat(deviceId, keys['CURSOR DOWN']);
          return;
        }
        lastCursorDownCmd = Date.now();
      }

      sendKey(deviceId, keys[name]); 
    }  
};

module.exports.initialize = function() {
    console.log('[CONTROLLER] Initialising device in progress...');
    return new Promise((resolve, reject) => {
      try {
          if (!settings.hasOwnProperty('players')) {
              reject('[CONTROLLER] Error', 'Missing players property in settings file');
          }
          const players = settings.players;
          for (var i = 0, len = players.length; i < len; i++) {
            var nid = 'hd'+(i+1)+'.freebox.fr';
            var data = {
                id: nid,
                name: players[i].name,
                host: players[i].host,
                code: players[i].code
            };
            playersList[nid] = data;
            console.log(`[CONTROLLER] Adapter for ${players[i].name} with id ${players[i].id} successfully configured`);
          }
          resolve(playersList);
      }
      catch (err) {
          reject(err);
      }
  });
};

module.exports.discoverDevices = function () {
    console.log(`[CONTROLLER] Trying to discover devices`);
    const players = settings.players;
    var devices = [];    
    for (var i = 0, len = players.length; i < len; i++) {
      var data = {
          id: 'hd'+(i+1)+'.freebox.fr',
          name: players[i].name,
          host: players[i].host,
          code: players[i].code
      };
      devices.push(data);
      console.log(`[CONTROLLER] Adapter for ${players[i].name} with id ${players[i].id} successfully added`);
    }
    return devices;
};