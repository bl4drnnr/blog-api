import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';
import { User } from './user.model';
import { Role } from './role.model';

@Table({ createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID })
  roleId: string;
}
