import { VehicleStore } from '../../db/store/vehicle.js';
import { Request, Response } from 'express';

interface Parameters {
  id: string;
}

export class DeleteVehicleController {
  constructor(private readonly vehicleStore: VehicleStore) {}

  public async handle(req: Request<Parameters>, res: Response): Promise<void> {
    const id = parseInt(req.params.id)

    await this.vehicleStore.deleteVehicle({id});
    
    res.status(204).send();
  }
}


