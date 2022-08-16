import {
  BelongsTo,
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

interface ISessionAttributes {
  userId: string;
  tokenId: string;
}

@Table
export class Session extends Model<Session, ISessionAttributes> {
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
    description: 'Unique id of user'
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of refresh token'
  })
  @Column({ type: DataType.UUID })
  tokenId: string;
}
