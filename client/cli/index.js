#!/usr/bin/env node

import { Command } from 'commander';
import { createVehicleCommand } from './commands/createVehicle.js';

const program = new Command();

program
  .name('vehicle-cli')
  .description('CLI for managing vehicles')
  .option(
    '-a, --address <address>',
    'server address (host:port)',
    'localhost:8080'
  );

// Add subcommands
program.addCommand(createVehicleCommand);

program.parse();
