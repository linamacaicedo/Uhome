import { Body, Controller, Get, Post } from '@nestjs/common';
import { PropertiesService } from './properties.service.js';
import { Property } from './property.entity.js';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Post()
  create(@Body() body: Partial<Property>) {
    return this.propertiesService.create(body);
  }
}
