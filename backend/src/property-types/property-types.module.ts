import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyType } from './property-type.entity.js';
import { PropertyTypesService } from './property-types.service.js';
import { PropertyTypesController } from './property-types.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyType])],
  controllers: [PropertyTypesController],
  providers: [PropertyTypesService],
})
export class PropertyTypesModule {}
