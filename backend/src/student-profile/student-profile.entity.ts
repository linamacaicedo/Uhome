import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../users/user.entity.js';

@Entity()
export class StudentProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  university: string;

  @Column()
  maxBudget: number;

  @Column({ default: 1000 })
  maxDistanceToCampus: number;

  @Column()
  safetyPriority: string;

  @Column()
  nightlifePriority: string;

  @Column({ unique: true })
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
