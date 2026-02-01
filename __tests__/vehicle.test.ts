import { Vehicle } from '../db/model/vehicle.js';
import { describe, expect,test } from '@jest/globals';

describe('Vehicle', () => {
  test('should create a vehicle with valid properties', () => {
    const position = { latitude: 48.8566, longitude: 2.3522 };
    const vehicle = new Vehicle(1, 'abcd', 85, position);
    
    expect(vehicle.id).toBe(1);
    expect(vehicle.shortcode).toBe('abcd');
    expect(vehicle.battery).toBe(85);
    expect(vehicle.position).toEqual(position);
  });

  test('should create a vehicle with minimum battery level', () => {
    const position = { latitude: 0, longitude: 0 };
    const vehicle = new Vehicle(2, 'xyzt', 0, position);
    
    expect(vehicle.battery).toBe(0);
  });

  test('should create a vehicle with maximum battery level', () => {
    const position = { latitude: 90, longitude: -90 };
    const vehicle = new Vehicle(3, 'test', 100, position);
    
    expect(vehicle.battery).toBe(100);
  });

  test('should handle edge case coordinates', () => {
    const position = { latitude: -90, longitude: 180 };
    const vehicle = new Vehicle(4, 'edge', 50, position);
    
    expect(vehicle.position.latitude).toBe(-90);
    expect(vehicle.position.longitude).toBe(180);
  });

  test('should create vehicle with 4-character shortcode', () => {
    const position = { latitude: 45.7640, longitude: 4.8357 };
    const vehicle = new Vehicle(5, 'Lyon', 75, position);
    
    expect(vehicle.shortcode).toHaveLength(4);
    expect(vehicle.shortcode).toBe('Lyon');
  });
});
