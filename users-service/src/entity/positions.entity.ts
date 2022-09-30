import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.positions)
  user: string;

  @Column()
  jobTitle: string;

  @Column()
  organisation: string;

  @Column()
  description: string;

  @Column()
  photoUrl: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
