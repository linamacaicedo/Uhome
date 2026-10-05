import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from '../properties/property.entity.js';

@Entity()
export class VibeAnalysis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentDensity: number;

  @Column()
  nightlife: number;

  @Column()
  studySpots: number;

  @Column()
  quietness: number;

  @Column()
  essentialSpots: number;

  @Column({ default: 'manual' })
  source: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  propertyId: number;

  @OneToOne(() => Property)
  @JoinColumn({ name: 'propertyId' })
  property: Property;
}
