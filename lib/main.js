'use strict';

const neeoapi = require('neeo-sdk');
const controller = require('./controller');
const settings = require('./settings')();

console.log('Freebox SAS - Freebox Player V6 driver');
console.log('---------------------------------------------');

// first we set the device info, used to identify it on the Brain
const freeboxPlayerV6 = neeoapi.buildDevice('Freebox Player V6')
  .setManufacturer('Freebox SAS')
  .setType('DVB')
  // Register a discovery fonction for the device
  .enableDiscovery(
    {
      headerText: 'Paramétrage',
      description: 'Veuillez selectionner un Freebox Player à l\'étape suivante'
    },
    controller.discoverDevices
  )
  .addButtonGroup('Power')
  .addButtonGroup('Volume')
  .addButtonGroup('Controlpad')
  .addButtonGroup('Numpad')
  .addButtonGroup('Color Buttons')
  .addButtonGroup('Menu and Back')
  .addButtonGroup('Channel Zapper')
  .addButtonHander(controller.onButtonPressed);

function startFreeboxPlayerAdapter(brain) {
  console.log('- Start server');
  neeoapi.startServer({
    brain,
    port: settings.neeo.driverPort,
    name: 'freebox-player-adapter',
    devices: [freeboxPlayerV6]
  })
  .then(() => {
    controller.initialize().then(() => {
      console.log('# READY! use the NEEO app to search for "Freebox Player V6".');
    });    
  })
  .catch((error) => {
    //if there was any error, print message out to console
    console.error('ERROR!', error.message);
    process.exit(1);
  });
}

const brainIp = process.env.BRAINIP;
if (brainIp) {
  console.log('- use NEEO Brain IP from env variable', brainIp);
  startFreeboxPlayerAdapter(brainIp);
} else {
  if (settings.neeo.brainIp) {
    console.log('- use NEEO Brain IP from config variable', settings.neeo.brainIp);
    startFreeboxPlayerAdapter(settings.neeo.brainIp);
    return;
  }
  console.log('- discover one NEEO Brain...');
  neeoapi.discoverOneBrain()
    .then((brain) => {
      console.log('- Brain discovered:', brain.name);
      startFreeboxPlayerAdapter(brain);
    });
}
