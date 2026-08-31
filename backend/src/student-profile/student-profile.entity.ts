import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  university: string;

  @Column()
  maxBudget: number;

  @Column()
  distancePriority: string;

  @Column()
  safetyPriority: string;

  @Column()
  nightlifePriority: string;

  @Column({ unique: true })
  userId: number;
}
