import { Injectable } from '@nestjs/common';

@Injectable()
export class VibeAnalysisService {
  findAll() {
    return {
      message: 'Get all vibe analyses',
    };
  }

  findOne(id: number) {
    return {
      message: `Get vibe analysis ${id}`,
    };
  }

  create(data: any) {
    return {
      message: 'Vibe analysis created',
      data,
    };
  }
}