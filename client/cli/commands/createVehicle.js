import { Command } from 'commander';
import { VehicleHttpClient } from '../http.js';

const createVehicleCommand = new Command('create-vehicle')
  .description('Create a new vehicle')
  .requiredOption('--shortcode <string>', 'vehicle shortcode (4 characters)')
  .requiredOption('-b, --battery <number>', 'vehicle battery level (0-100)')
  .requiredOption(
    '--lng, --longitude <number>',
    'vehicle longitude (-90 to 90)'
  )
  .requiredOption('--lat, --latitude <number>', 'vehicle latitude (-90 to 90)')
  .action(async (options, command) => {
    try {
      if (options.battery < 0 || options.battery > 100) {
        console.error('Could not create the vehicle');
        console.error('Battery level must be between 0 and 100');
        return;
      }

      if (options.shortcode.length !== 4) {
        console.error('Could not create the vehicle');
        console.error('Shortcode must be only 4 characters long');
        return;
      }

      if (options.longitude < -90 || options.longitude > 90) {
        console.error('Could not create the vehicle');
        console.error('Longitude must be between -90 and 90');
        return;
      }

      if (options.latitude < -90 || options.latitude > 90) {
        console.error('Could not create the vehicle');
        console.error('Latitude must be between -90 and 90');
        return;
      }

      const globalOptions = command.parent.opts();
      const address = globalOptions.address || 'localhost:8080';
      const baseUrl = `http://${address}`;

      const client = new VehicleHttpClient(baseUrl);

      const vehicleData = {
        shortcode: options.shortcode,
        battery: parseInt(options.battery),
        longitude: parseFloat(options.longitude),
        latitude: parseFloat(options.latitude),
      };

      const result = await client.createVehicle(vehicleData);

      console.log(
        `Created vehicle ${result.vehicle.shortcode}, with ID ${result.vehicle.id}`
      );
    } catch (error) {
      console.error('Could not create the vehicle');
      console.error(`- ${error.message}`);
    }
  });

export { createVehicleCommand };
