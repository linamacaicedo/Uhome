import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity.js';
import { User } from '../users/user.entity.js';
import { Property } from '../properties/property.entity.js';
import { FavoritesService } from './favorites.service.js';
import { FavoritesController } from './favorites.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Property])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
