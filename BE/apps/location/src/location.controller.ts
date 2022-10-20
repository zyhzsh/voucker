import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AddLocationRequest } from './dto/add-location.dto';
import { DeleteLocationQuery } from './dto/delete-location-query.dto';
import { UpdateLocationRequest } from './dto/update-location.dto';
import { LocationService } from './location.service';

@Controller('api/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  getAllLocation() {
    return this.locationService.getAllLocation();
  }
  @Delete()
  deleteLocation(@Query() req: DeleteLocationQuery) {
    return this.locationService.deleteLocation(req.id);
  }
  @Post()
  addLocation(@Body() req: AddLocationRequest) {
    return this.locationService.addLocation(req);
  }
  @Put()
  updateLocation(@Body() req: UpdateLocationRequest) {
    return this.locationService.updateLocation(req);
  }
}
