import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { StudentProfile } from '../student-profile/student-profile.entity.js';

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

  @OneToOne(() => StudentProfile, (studentProfile) => studentProfile.user)
  studentProfile: StudentProfile;
}