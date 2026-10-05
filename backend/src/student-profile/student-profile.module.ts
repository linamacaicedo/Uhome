import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentProfile } from './student-profile.entity.js';
import { StudentProfileService } from './student-profile.service.js';
import { StudentProfileController } from './student-profile.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([StudentProfile])],
  controllers: [StudentProfileController],
  providers: [StudentProfileService],
  exports: [StudentProfileService],
})
export class StudentProfileModule {}
