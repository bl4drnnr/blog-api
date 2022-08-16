import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { User } from './user.model';
import { UserRole } from './user-role.model';

interface IRoleAttributes {
  value: string;
  description: string;
}

@Table
export class Role extends Model<Role, IRoleAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  value: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
