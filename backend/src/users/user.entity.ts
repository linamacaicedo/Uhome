import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { StudentProfile } from '../student-profile/student-profile.entity.js';
import { Role } from '../roles/role.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  username: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  roleId: number;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @OneToOne(
    'StudentProfile',
    (studentProfile: StudentProfile) => studentProfile.user,
  )
  studentProfile: StudentProfile;
}
