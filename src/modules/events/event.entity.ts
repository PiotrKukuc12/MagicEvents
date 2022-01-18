import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  user: string;
  @Transform(() => Date, { toPlainOnly: true })
  @Column('text')
  startDate: Date;
  @Transform(() => Date, { toPlainOnly: true })
  @Column('text')
  endDate: Date;
  @Column()
  isClosed: boolean;
}
