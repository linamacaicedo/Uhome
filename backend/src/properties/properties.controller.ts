import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { PropertiesService } from './properties.service.js';
import { Property } from './property.entity.js';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get()
  findAll(
    @Query('maxDistance') maxDistance?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    const filters: { maxDistance?: number; maxPrice?: number } = {};

    if (maxDistance !== undefined) {
      const distance = Number(maxDistance);
      if (isNaN(distance)) {
        throw new BadRequestException('maxDistance debe ser un número');
      }
      filters.maxDistance = distance;
    }

    if (maxPrice !== undefined) {
      const price = Number(maxPrice);
      if (isNaN(price)) {
        throw new BadRequestException('maxPrice debe ser un número');
      }
      filters.maxPrice = price;
    }

    return this.propertiesService.findAll(filters);
  }

  @Post()
  create(@Body() body: Partial<Property>) {
    return this.propertiesService.create(body);
  }
}
