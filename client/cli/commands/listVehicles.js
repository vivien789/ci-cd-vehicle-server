import { Command } from 'commander';
import { VehicleHttpClient } from '../http.js';

const listVehicleCommand = new Command('list-vehicles');
listVehicleCommand
  .option('-d, --debug', 'display some debugging')
  .action(async (options, command) => {
    try {
      const globalOptions = command.parent.opts();
      const address = globalOptions.address || 'localhost:8080';
      const baseUrl = `http://${address}`;

      const client = new VehicleHttpClient(baseUrl);

      const result = await client.listVehicles();

      console.log(`This is the vehicles list ${result.vehicle.shortcode}`);
    } catch (error) {
      console.error('Could not show the vehicles list');
      console.error(`- ${error.message}`);
    }
  });

export { listVehicleCommand };
