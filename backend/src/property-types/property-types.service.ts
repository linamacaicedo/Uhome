import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyType } from './property-type.entity.js';

@Injectable()
export class PropertyTypesService implements OnModuleInit {
  constructor(
    @InjectRepository(PropertyType)
    private propertyTypesRepository: Repository<PropertyType>,
  ) {}

  async onModuleInit() {
    const defaultTypes = ['apartamento', 'casa', 'habitación', 'apartaestudio'];

    for (const name of defaultTypes) {
      const exists = await this.propertyTypesRepository.findOneBy({ name });

      if (!exists) {
        await this.propertyTypesRepository.save({ name });
      }
    }
  }

  findAll() {
    return this.propertyTypesRepository.find();
  }
}
