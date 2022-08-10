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
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';

interface ISessionAttributes {
  userId: string;
  tokenId: string;
}

@Table
export class Session extends Model<Session, ISessionAttributes> {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique uuid of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.UUID })
  tokenId: string;
}
