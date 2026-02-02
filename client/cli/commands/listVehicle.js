import { Command } from 'commander';

const listVehicleCommand = new Command('list-vehicles');
listVehicleCommand
  .option('-p, --port <number>', 'server port number', '8080')
  .option('-d, --debug', 'display some debugging');

listVehicleCommand.parse();
const options = listVehicleCommand.opts();
console.log(options);

//Test
//node client/cli/commands/listVehicle.js -p 8080
export { listVehicleCommand };
