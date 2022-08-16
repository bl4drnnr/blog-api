import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { User } from './user.model';
import { ApiProperty } from '@nestjs/swagger';

interface IBanAttributes {
  userId: string;
  reason: string;
}

@Table
export class Ban extends Model<Ban, IBanAttributes> {
  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Id of banned user'
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @ApiProperty({ example: 'Hacker', description: 'Reason for ban' })
  @Column({ type: DataType.STRING })
  reason: string;
}
