import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  propertyId: number;
}