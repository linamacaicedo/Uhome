import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity.js';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  // Esto se ejecuta solo cuando arranca el backend
  // y crea los roles si todavía no existen
  async onModuleInit() {
    const defaultRoles = [
      { name: 'student', description: 'Estudiante que busca vivienda' },
      { name: 'landlord', description: 'Arrendador que publica propiedades' },
      { name: 'admin', description: 'Administrador de la plataforma' },
    ];

    for (const roleData of defaultRoles) {
      const exists = await this.rolesRepository.findOneBy({
        name: roleData.name,
      });

      if (!exists) {
        await this.rolesRepository.save(roleData);
      }
    }
  }

  findAll() {
    return this.rolesRepository.find();
  }
}
