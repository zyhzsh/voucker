import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller()
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  getHello(): string {
    return this.locationService.getHello();
  }
}
