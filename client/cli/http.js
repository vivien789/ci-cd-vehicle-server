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
    console.log('Response status:', response.status);
    console.log('Response text:', responseText.substring(0, 200));

    if (!response.ok) {
      throw new Error(responseText || 'Failed to create vehicle');
    }

    return JSON.parse(responseText);
  }

  async listVehicles(params = {}) {
    const url = new URL(`${this.baseUrl}/vehicles`);
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });

    const response = await fetch(url);

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
      throw new Error('Failed to delete vehicle');
    }

    return response;
  }
}

export { VehicleHttpClient };
