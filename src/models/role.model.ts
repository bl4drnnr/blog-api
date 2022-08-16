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
import { ApiProperty } from '@nestjs/swagger';

interface IRoleAttributes {
  value: string;
  description: string;
}

@Table
export class Role extends Model<Role, IRoleAttributes> {
  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ApiProperty({ example: 'ADMIN', description: 'Role name' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
