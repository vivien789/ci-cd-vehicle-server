import express, { Express } from 'express';
import { Pool } from 'pg';
import { VehicleStore } from '../db/store/vehicle.js';
import { FindVehiclesController } from '../client/controller/find.js'
import { CreateVehicleController } from '../client/controller/create.js'
import { DeleteVehicleController } from '../client/controller/delete.js'
import { errorHandler } from './errors.js';

export function setupApp(db: Pool): Express {
  const app =  express();
  const vehicleStore = new VehicleStore(db);
  const findVehicleController = new FindVehiclesController(vehicleStore);
  const createVehicleController = new CreateVehicleController(vehicleStore);
  const deleteVehicleController = new DeleteVehicleController(vehicleStore);

  app.use(express.json());

  app.get('/vehicles', findVehicleController.handle.bind(findVehicleController));
  app.post('/vehicles', createVehicleController.handle.bind(createVehicleController));
  app.delete('/vehicles/:id', deleteVehicleController.handle.bind(deleteVehicleController));

  app.use(errorHandler);

  return app;
}
