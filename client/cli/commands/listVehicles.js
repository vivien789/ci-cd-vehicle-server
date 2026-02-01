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

      console.log('Vehicles list:');
      if (result.vehicles && result.vehicles.length > 0) {
        result.vehicles.forEach((vehicle) => {
          console.log(
            `- ID: ${vehicle.id}, Shortcode: ${vehicle.shortcode}, Battery: ${vehicle.battery}`
          );
        });
      } else {
        console.log('No vehicles found');
      }
    } catch (error) {
      console.error('Could not show the vehicles list');
      console.error(`- ${error.message}`);
    }
  });

export { listVehicleCommand };
