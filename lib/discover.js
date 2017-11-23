'use strict';

const mdns = require('mdns-js');

module.exports.findFreeboxPlayers = function() {
    return new Promise((resolve, reject) => {
        var browser = mdns.createBrowser(mdns.udp('_hid'));
        var devices = [];

        browser.on('ready', function () {
            browser.discover(); 
        });
        
        browser.on('update', function (data) {
            if (data.host === 'Freebox-Player.local') {
                if(devices[data.host]) { return; }
                devices[data.host] = {
                    'ip': data.addresses[0],
                    'port': data.port,
                    'host' : data.host
                };
            }
            browser.stop();
            resolve(devices);
        });
    
        //stop after timeout
        setTimeout(function onTimeout() {
            browser.stop();
            reject(new Error('SERVICE NOT FOUND'));
        }, 5000);

    });
};