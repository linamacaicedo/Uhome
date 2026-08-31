import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VibeAnalysis } from './vibe-analysis.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([VibeAnalysis])],
})
export class VibeAnalysisModule {}
