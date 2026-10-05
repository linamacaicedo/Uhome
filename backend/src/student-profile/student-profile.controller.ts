import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentProfileService } from './student-profile.service.js';
import { StudentProfile } from './student-profile.entity.js';

@Controller('student-profile')
export class StudentProfileController {
  constructor(private studentProfileService: StudentProfileService) {}

  @Get()
  findAll() {
    return this.studentProfileService.findAll();
  }

  @Post()
  create(@Body() body: Partial<StudentProfile>) {
    return this.studentProfileService.create(body);
  }
}
