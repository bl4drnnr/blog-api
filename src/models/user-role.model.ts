import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { Role } from './role.model';

@Table({ createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole> {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique uuid of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID })
  roleId: string;
}
