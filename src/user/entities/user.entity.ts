import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserStatus } from '../enum/user.enum';
import { UserRole } from '../enum/user.role.enum';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  @Column()
  status: UserStatus;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    onUpdate: 'current_timestamp',
  })
  updatedAt: Date;
}
