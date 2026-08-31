import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenity } from './amenity.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Amenity])],
})
export class AmenitiesModule {}
