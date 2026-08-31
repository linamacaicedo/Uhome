import { Module } from '@nestjs/common';
import { VibeAnalysisController } from './vibe-analysis.controller.js';
import { VibeAnalysisService } from './vibe-analysis.service.js';

@Module({
  controllers: [VibeAnalysisController],
  providers: [VibeAnalysisService],
})
export class VibeAnalysisModule {}