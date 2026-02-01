import { Command } from 'commander';
const program = new Command();
let err = false;

program
  .option('-p, --port <number>', 'server port number', '8080')
  .requiredOption('--id <number>', 'vehicle id') //Param to delete later
  .requiredOption('--sc, --shortcode <string>', 'vehicle code')
  .requiredOption('-b, --battery <number>', 'vehicle battery')
  .requiredOption(
    '--lng, --longitude <number>',
    'specify the vehicle longitude'
  )
  .requiredOption('--lat, --latitude <number>', 'specify the vehicle latitude')
  .action((options) => {
    if (options.battery < 0 || options.battery > 100) {
      console.error('Could not create the vehicle');
      console.error('Battery level must be between 0 and 100');
      err = true;
    } else if (options.shortcode.length != 4) {
      console.error('Could not create the vehicle');
      console.error('Shortcode must be only 4 characters long');
      err = true;
    } else if (options.longitude < -90 || options.longitude > 90) {
      console.error('Could not create the vehicle');
      console.error('Longitude must be between -90 and 90');
      err = true;
    } else if (options.latitude < -90 || options.latitude > 90) {
      console.error('Could not create the vehicle');
      console.error('Latitude must be between -90 and 90');
      err = true;
    }
  });

program.parse();
const options = program.opts();

if (!err) {
  console.log(
    `Created vehicle ` + `${options.shortcode}` + ` with ID ` + `${options.id}`
  );
}

//Test
//node client/cli/commands/createVehicle.js -p 8080 --id 12 --sc 'abcd' -b 16 --lng 70.060316 --lat 49.432044
