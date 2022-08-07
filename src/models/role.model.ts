import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { UserRole } from './user-role.model';

interface RoleAttributes {
  value: string;
  description: string;
}

@Table
export class Role extends Model<Role, RoleAttributes> {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique uuid of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Describes user role and restrict access to endpoints'
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  value: string;

  @ApiProperty({
    example: 'Administrator',
    description: 'Description of the role'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
