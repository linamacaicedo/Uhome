import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { StudentProfileModule } from './student-profile/student-profile.module.js';
import { PropertiesModule } from './properties/properties.module.js';
import { AmenitiesModule } from './amenities/amenities.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { VibeAnalysisModule } from './vibe-analysis/vibe-analysis.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'uhome',
      password: 'uhome',
      database: 'uhome',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    StudentProfileModule,
    PropertiesModule,
    AmenitiesModule,
    ReviewsModule,
    VibeAnalysisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
