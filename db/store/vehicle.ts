import { Pool } from 'pg';
import { Vehicle, Position } from '../model/vehicle.js';
import { AppError, ErrorCode } from '../../server/errors.js';

const findStatement = `
SELECT id, shortcode, battery, longitude, latitude
FROM vehicle_server.vehicles
ORDER BY 
  ABS(longitude - $1) + ABS(latitude - $2) ASC
LIMIT $3;
`

const createStatement = `
INSERT INTO vehicle_server.vehicles (shortcode, battery, longitude, latitude)
VALUES ($1, $2, $3, $4)
RETURNING id, shortcode, battery, longitude, latitude;
`

const deleteStatement = `
DELETE FROM vehicle_server.vehicles WHERE id = $1;
`

interface CreateVehicleRequest {
  shortcode: string;
  position: Position;
  battery: number;
}

interface FindVehiclesRequest {
  location: Position;
  limit: number;
}

interface DeleteVehicleRequest {
  id: number;
}

interface row {
  id: number;
  shortcode: string;
  battery: number;
  longitude: number;
  latitude: number;
}

export class VehicleStore {
  constructor(private readonly db: Pool) {}

  async createVehicle(req: CreateVehicleRequest): Promise<Vehicle> {
    const result = await this.db.query(
      createStatement,
      [req.shortcode, req.battery, req.position.longitude, req.position.latitude],
    );

    if (result.rows.length > 1) {
      throw new Error("unexpected amount of rows returned");
    }

     
    const vehicleRow :row = result.rows[0];

    return newVehicleFromRow(vehicleRow);
  }

  async deleteVehicle(req: DeleteVehicleRequest): Promise<void> {
    const result = await this.db.query(deleteStatement, [req.id]);
    if (result.rowCount == 0) {
      throw new AppError(
        ErrorCode.RecordNotFound,
        "Vehicle not found for deletion",
        { id: req.id },
      );
    }
  }

  async findVehicles(req: FindVehiclesRequest): Promise<Vehicle[]>  {
    const result = await this.db.query(findStatement, [req.location.longitude, req.location.latitude, req.limit])

    return result.rows.map((r: row): Vehicle => {
      return newVehicleFromRow(r);
    });
  }
}

function newVehicleFromRow(vehicleRow: row): Vehicle {
  return new Vehicle(
    vehicleRow.id,
    vehicleRow.shortcode,
    vehicleRow.battery,
    {
      longitude: vehicleRow.longitude,
      latitude: vehicleRow.latitude
    },
  )
}
