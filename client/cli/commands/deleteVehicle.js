import { Command } from 'commander';
import { VehicleHttpClient } from '../http.js';

const deleteVehicleCommand = new Command('delete-vehicle');
deleteVehicleCommand
  .requiredOption('--id <number>', 'vehicle id to delete')
  .option('-d, --debug', 'display some debugging')
  .action(async (options, command) => {
    try {
      if (options.id < 0) {
        console.error('Could not delete the vehicle');
        console.error('ID must be up to 0.');
        return;
      }

      const globalOptions = command.parent.opts();
      const address = globalOptions.address || 'localhost:8080';
      const baseUrl = `http://${address}`;

      const client = new VehicleHttpClient(baseUrl);

      await client.deleteVehicle(options.id);

      console.log(`Deleted vehicle with ID ${options.id}`);
    } catch (error) {
      console.error('Could not delete the vehicle');
      console.error(`- ${error.message}`);
    }
  });

export { deleteVehicleCommand };
