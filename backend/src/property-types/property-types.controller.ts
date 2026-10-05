import { Controller, Get } from '@nestjs/common';
import { PropertyTypesService } from './property-types.service.js';

@Controller('property-types')
export class PropertyTypesController {
  constructor(private propertyTypesService: PropertyTypesService) {}

  @Get()
  findAll() {
    return this.propertyTypesService.findAll();
  }
}
