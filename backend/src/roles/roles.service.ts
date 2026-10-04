import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './role.entity.js';
import { Permission } from '../permissions/permission.entity.js';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async onModuleInit() {
    const defaultPermissions = [
      { name: 'view_properties', description: 'Ver propiedades' },
      { name: 'create_property', description: 'Crear propiedades' },
      { name: 'edit_property', description: 'Editar propiedades' },
      { name: 'delete_property', description: 'Eliminar propiedades' },
      { name: 'write_review', description: 'Escribir reviews' },
      {
        name: 'manage_favorites',
        description: 'Guardar propiedades favoritas',
      },
      { name: 'manage_users', description: 'Activar y desactivar usuarios' },
    ];

    for (const permissionData of defaultPermissions) {
      const exists = await this.permissionsRepository.findOneBy({
        name: permissionData.name,
      });

      if (!exists) {
        await this.permissionsRepository.save(permissionData);
      }
    }
    const defaultRoles = [
      {
        name: 'student',
        description: 'Estudiante que busca vivienda',
        permissions: ['view_properties', 'write_review', 'manage_favorites'],
      },
      {
        name: 'landlord',
        description: 'Arrendador que publica propiedades',
        permissions: [
          'view_properties',
          'create_property',
          'edit_property',
          'delete_property',
        ],
      },
      {
        name: 'admin',
        description: 'Administrador de la plataforma',
        permissions: [
          'view_properties',
          'create_property',
          'edit_property',
          'delete_property',
          'write_review',
          'manage_favorites',
          'manage_users',
        ],
      },
    ];

    for (const roleData of defaultRoles) {
      let role = await this.rolesRepository.findOne({
        where: { name: roleData.name },
        relations: { permissions: true },
      });

      if (!role) {
        role = this.rolesRepository.create({
          name: roleData.name,
          description: roleData.description,
        });
        role.permissions = [];
      }

      if (role.permissions.length === 0) {
        role.permissions = await this.permissionsRepository.findBy({
          name: In(roleData.permissions),
        });
        await this.rolesRepository.save(role);
      }
    }
  }

  findAll() {
    return this.rolesRepository.find({
      relations: { permissions: true },
    });
  }
}
