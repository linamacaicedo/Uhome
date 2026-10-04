import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find({
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        isActive: true,
        roleId: true,
      },
    });
  }

  async setActive(id: number, isActive: boolean) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    user.isActive = isActive;
    await this.usersRepository.save(user);

    return { id: user.id, email: user.email, isActive: user.isActive };
  }
}
