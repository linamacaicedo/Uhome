import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VibeAnalysis } from './vibe-analysis.entity.js';
import { Property } from '../properties/property.entity.js';

const SCORE_FIELDS = [
  'studentDensity',
  'nightlife',
  'studySpots',
  'quietness',
  'essentialSpots',
] as const;

@Injectable()
export class VibeAnalysisService {
  constructor(
    @InjectRepository(VibeAnalysis)
    private vibeRepository: Repository<VibeAnalysis>,
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  findAll() {
    return this.vibeRepository.find();
  }

  async findOne(id: number) {
    const vibe = await this.vibeRepository.findOneBy({ id });
    if (!vibe) {
      throw new NotFoundException('Análisis no encontrado');
    }
    return vibe;
  }
  private validateScores(data: Partial<VibeAnalysis>) {
    for (const field of SCORE_FIELDS) {
      const value = data[field];

      if (value !== undefined) {
        if (!Number.isInteger(value) || value < 1 || value > 5) {
          throw new BadRequestException(
            `${field} debe ser un número entero entre 1 y 5`,
          );
        }
      }
    }
  }

  async create(data: Partial<VibeAnalysis>) {
    if (!data.propertyId) {
      throw new BadRequestException('Debes enviar propertyId');
    }

    for (const field of SCORE_FIELDS) {
      if (data[field] === undefined) {
        throw new BadRequestException(`Debes enviar ${field}`);
      }
    }

    this.validateScores(data);

    const property = await this.propertiesRepository.findOneBy({
      id: data.propertyId,
    });
    if (!property) {
      throw new NotFoundException('Propiedad no encontrada');
    }

    const exists = await this.vibeRepository.findOneBy({
      propertyId: data.propertyId,
    });
    if (exists) {
      throw new ConflictException('Esta propiedad ya tiene un análisis');
    }

    const vibe = this.vibeRepository.create({
      studentDensity: data.studentDensity,
      nightlife: data.nightlife,
      studySpots: data.studySpots,
      quietness: data.quietness,
      essentialSpots: data.essentialSpots,
      propertyId: data.propertyId,
      source: 'manual',
    });

    return this.vibeRepository.save(vibe);
  }

  async update(id: number, data: Partial<VibeAnalysis>) {
    this.validateScores(data);

    const vibe = await this.findOne(id);

    for (const field of SCORE_FIELDS) {
      if (data[field] !== undefined) {
        vibe[field] = data[field];
      }
    }

    return this.vibeRepository.save(vibe);
  }
}
