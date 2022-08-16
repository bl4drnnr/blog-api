import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';
import { User } from './user.model';
import { Role } from './role.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole> {
  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of user'
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of role'
  })
  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID })
  roleId: string;
}
