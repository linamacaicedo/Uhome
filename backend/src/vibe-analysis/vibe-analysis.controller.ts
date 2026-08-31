import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { VibeAnalysisService } from './vibe-analysis.service.js';

@Controller('vibe-analysis')
export class VibeAnalysisController {
  constructor(
    private readonly vibeAnalysisService: VibeAnalysisService,
  ) {}

  @Get()
  findAll() {
    return this.vibeAnalysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vibeAnalysisService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: any) {
    return this.vibeAnalysisService.create(body);
  }
}