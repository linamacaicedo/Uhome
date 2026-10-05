import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { VibeAnalysisService } from './vibe-analysis.service.js';
import { VibeAnalysis } from './vibe-analysis.entity.js';

@Controller('vibe-analysis')
export class VibeAnalysisController {
  constructor(private vibeAnalysisService: VibeAnalysisService) {}

  @Get()
  findAll() {
    return this.vibeAnalysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vibeAnalysisService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<VibeAnalysis>) {
    return this.vibeAnalysisService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<VibeAnalysis>,
  ) {
    return this.vibeAnalysisService.update(id, body);
  }
}
