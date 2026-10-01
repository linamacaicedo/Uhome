import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VibeAnalysis } from './vibe-analysis.entity.js';
import { VibeAnalysisController } from './vibe-analysis.controller.js';
import { VibeAnalysisService } from './vibe-analysis.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([VibeAnalysis])],
  controllers: [VibeAnalysisController],
  providers: [VibeAnalysisService],
})
export class VibeAnalysisModule {}