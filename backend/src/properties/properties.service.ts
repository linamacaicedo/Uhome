import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity.js';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  findAll() {
    return this.propertiesRepository.find({
      relations: { amenities: true },
    });
  }

  create(data: Partial<Property>) {
    // Revisamos que las coordenadas sean válidas
    if (data.latitude !== undefined && data.latitude !== null) {
      if (data.latitude < -90 || data.latitude > 90) {
        throw new BadRequestException('La latitud debe estar entre -90 y 90');
      }
    }

    if (data.longitude !== undefined && data.longitude !== null) {
      if (data.longitude < -180 || data.longitude > 180) {
        throw new BadRequestException(
          'La longitud debe estar entre -180 y 180',
        );
      }
    }

    const property = this.propertiesRepository.create(data);
    return this.propertiesRepository.save(property);
  }
}
