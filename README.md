# Freebox V6 Player driver for NEEO Remote

To find out more about Free SAS (French ISP) checkout http://www.free.fr

To find out more about NEEO, the Brain and "The Thinking Remote" checkout https://neeo.com/.

## Prerequisite

* You must have [node.js](http://nodejs.org) v8 installed, see http://nodejs.org

## Getting started

* Install via [npm](https://www.npmjs.org)

```
$ npm install fibaro-scenes-neeo -g
```

Platform-specific install note available from [`INSTALL.md`](https://github.com/krikroff77/neeo-freeplayer-adapter/blob/master/INSTALL.md)


Example usage
-------------

Edit settings.json and update settings

### NEEO:

-   brainIp: You can fix here the ip of brain
-   driverPort: This is port used to establish communication between sdk server and the brain.
                Warning: the port cannot be shared between multiple device.

### PLAYERS:

__You can add as many player you want here.__

-   name is the name you want to associate with the freebox player
-   code is the remote code
-   host is the ip address of the freebox player

Example "settings.json"

```json
{
    "neeo": {
        "brainIp" : "192.168.1.50",
        "driverPort" : 6336
    },
    "players": [
        {
            "name": "Player salon",
            "code": "HC2-008080",
            "host": "192.168.1.110"
        },
        {
            "name": "player chambre",
            "code": "HC2-008080",
            "host": "192.168.1.111"
        }
      ]
}
```

2. Start up the device via `npm run server:freeplayer`
3. Connect to your NEEO Brain in the NEEO app
4. Go to add device
5. You should be able to find the adapter by searching for "freebox player"

Changelog
---------

See [`CHANGELOG.md`](https://github.com/krikroff77/neeo-freeplayer-adapter/blob/master/CHANGELOG.md)

## Known Issues
For a list of known issues, please see the [issues page](https://github.com/krikroff77/neeo-freeplayer-adapter/issues "GitHub issues page")