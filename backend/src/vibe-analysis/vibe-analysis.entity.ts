import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
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

  @Column({ unique: true })
  propertyId: number;

  @OneToOne(() => Property)
  @JoinColumn({ name: 'propertyId' })
  property: Property;
}