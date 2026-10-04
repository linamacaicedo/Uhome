import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Amenity } from '../amenities/amenity.entity.js';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column({ type: 'double precision', nullable: true })
  latitude: number;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @Column()
  price: number;

  @Column()
  propertyType: string;

  @Column()
  distanceToCampus: number;

  @Column()
  available: boolean;

  @ManyToMany(() => Amenity)
  @JoinTable()
  amenities: Amenity[];
}