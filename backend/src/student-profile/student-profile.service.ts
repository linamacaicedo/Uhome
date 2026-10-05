import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentProfile } from './student-profile.entity.js';

@Injectable()
export class StudentProfileService {
  constructor(
    @InjectRepository(StudentProfile)
    private studentProfileRepository: Repository<StudentProfile>,
  ) {}

  findAll() {
    return this.studentProfileRepository.find();
  }

  create(data: Partial<StudentProfile>) {
    if (
      data.maxDistanceToCampus !== undefined &&
      data.maxDistanceToCampus <= 0
    ) {
      throw new BadRequestException(
        'La distancia máxima debe ser mayor que 0 (en metros)',
      );
    }

    const profile = this.studentProfileRepository.create(data);
    return this.studentProfileRepository.save(profile);
  }
}
