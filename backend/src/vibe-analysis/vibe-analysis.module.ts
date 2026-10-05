import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VibeAnalysis } from './vibe-analysis.entity.js';
import { Property } from '../properties/property.entity.js';
import { VibeAnalysisService } from './vibe-analysis.service.js';
import { VibeAnalysisController } from './vibe-analysis.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([VibeAnalysis, Property])],
  controllers: [VibeAnalysisController],
  providers: [VibeAnalysisService],
  exports: [VibeAnalysisService],
})
export class VibeAnalysisModule {}
