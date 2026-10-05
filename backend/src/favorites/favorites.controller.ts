import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service.js';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post()
  add(@Body() body: { userId: number; propertyId: number }) {
    return this.favoritesService.add(body.userId, body.propertyId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.favoritesService.findByUser(userId);
  }

  @Delete('user/:userId/property/:propertyId')
  remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('propertyId', ParseIntPipe) propertyId: number,
  ) {
    return this.favoritesService.remove(userId, propertyId);
  }
}
