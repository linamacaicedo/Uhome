import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentProfile } from './student-profile.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([StudentProfile])],
})
export class StudentProfileModule {}
