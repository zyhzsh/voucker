import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddLocationRequest } from './dto/add-location.dto';
import { UpdateLocationRequest } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepostiry: Repository<Location>,
  ) {}
  async getAllLocation() {
    return await this.locationRepostiry.find({
      order: {
        name: 'ASC',
      },
    });
  }
  async deleteLocation(id: number): Promise<boolean> {
    try {
      await this.locationRepostiry.delete(id);
    } catch {
      return false;
    }
    return true;
  }
  async addLocation(req: AddLocationRequest): Promise<boolean> {
    try {
      const isDuplicate = await this.isLocationNameDuplicate(req.name);
      if (isDuplicate)
        console.log('User is trying to create a duplicate location');
      if (!isDuplicate) {
        const newLocation = await this.locationRepostiry.create(req);
        await this.locationRepostiry.save(newLocation);
      }
    } catch (err) {
      return false;
    }
    return true;
  }
  async isLocationNameDuplicate(name: string): Promise<boolean> {
    const result = await this.locationRepostiry.findOne({ where: { name } });
    if (result) return true;
    return false;
  }
  async getLocation(id: number): Promise<Location> {
    return this.locationRepostiry.findOne({ where: { id } });
  }
  async updateLocation(req: UpdateLocationRequest): Promise<boolean> {
    const { id, name } = req;
    const isDuplicate = await this.isLocationNameDuplicate(name);
    if (isDuplicate) {
      console.log('User is trying to update a duplicate location');
      return false;
    }
    const location = await this.getLocation(id);
    location.name = name;
    await this.locationRepostiry.save(location);
    return true;
  }
}
