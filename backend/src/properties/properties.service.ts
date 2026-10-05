import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, LessThanOrEqual, Repository } from 'typeorm';
import { Property } from './property.entity.js';
import { PropertyType } from '../property-types/property-type.entity.js';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    @InjectRepository(PropertyType)
    private propertyTypesRepository: Repository<PropertyType>,
  ) {}

  findAll(filters: { maxDistance?: number; maxPrice?: number } = {}) {
    const where: FindOptionsWhere<Property> = {};

    if (filters.maxDistance !== undefined) {
      where.distanceToCampus = LessThanOrEqual(filters.maxDistance);
    }

    if (filters.maxPrice !== undefined) {
      where.price = LessThanOrEqual(filters.maxPrice);
    }

    return this.propertiesRepository.find({
      where,
      relations: { amenities: true, propertyType: true },
    });
  }

  async create(data: Partial<Property>) {
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

    if (!data.propertyTypeId) {
      throw new BadRequestException('Debes enviar propertyTypeId');
    }

    const type = await this.propertyTypesRepository.findOneBy({
      id: data.propertyTypeId,
    });
    if (!type) {
      throw new NotFoundException('Tipo de propiedad no encontrado');
    }

    const property = this.propertiesRepository.create(data);
    return this.propertiesRepository.save(property);
  }
}
