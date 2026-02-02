class VehicleHttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async createVehicle(vehicleData) {
    const response = await fetch(`${this.baseUrl}/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(responseText || 'Failed to create vehicle');
    }

    return JSON.parse(responseText);
  }

  async listVehicles() {
    const response = await fetch(`${this.baseUrl}/vehicles`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to list vehicles');
    }

    return response.json();
  }

  async deleteVehicle(id) {
    const response = await fetch(`${this.baseUrl}/vehicles/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete vehicle: ${errorText}`);
    }
  }
}

export { VehicleHttpClient };
