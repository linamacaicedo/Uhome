import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity.js';
import { PropertyType } from '../property-types/property-type.entity.js';
import { PropertiesService } from './properties.service.js';
import { PropertiesController } from './properties.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Property, PropertyType])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
