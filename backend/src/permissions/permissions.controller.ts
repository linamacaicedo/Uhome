import { Controller, Get } from '@nestjs/common';
import { PermissionsService } from './permissions.service.js';

@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }
}